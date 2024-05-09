import { User } from "../model/user";
import { pool } from "../database/db";
import { cacheKeyToday, redisClient } from "../utils/redis";
import { calculateInterestSimilarity } from "../utils/matchmaker";

const RECOMMENDATION_POOL_SIZE = 50;

const createRecommendation = async (user: User) => {
    const key = cacheKeyToday(user.id);
    const cached = await redisClient.get(key);
    if (cached) {
        console.log("using cached recommendations");
        return;
    }

    //give 10 new recommendations
    const findNewQuery = `
    SELECT
    u.id,
    u.name,
    u.gender,
    u.location,
    u.university,
    u.interests
    FROM
    user_profile u
    LEFT JOIN
    recommendation r ON u.id = r.recommended_user_id AND r.user_id = ?
    WHERE
    r.recommended_user_id IS NULL AND u.gender != ? AND u.id != ?
    ORDER BY RAND()
    LIMIT ${RECOMMENDATION_POOL_SIZE};
  `;

    console.log("recommending...");

    const [results]: any = await pool.query(findNewQuery, [user.id, user.gender, user.id]);

    const randomMatchmaking = selectUsersWithSimilarity(user, results as User[]);

    const currentDate = new Date();

    const values = randomMatchmaking.map((recommendedUser: any) => [user.id, recommendedUser.id, currentDate, "none"]);

    //create the 10 new recommendations
    const createNewQuery = `INSERT INTO recommendation  (user_id, recommended_user_id, recommended_date, swipe_action) VALUES ?;`;

    if (values.length) await pool.query(createNewQuery, [values]);
};

const getRecommendations = async (userId: number) => {
    const key = cacheKeyToday(userId);
    const cached = await redisClient.get(key);

    if (cached) {
        console.log("Using cached recommedations");
        //because of caching we will always send the same 10 regardless of swipe action, so filter out the ones that have been swiped
        return JSON.parse(cached);
    }

    const query = `
    SELECT
    r.id AS recommended_id,
    r.user_id,
    r.recommended_user_id,
    r.recommended_date,
    r.swipe_action,
    u.id AS recommended_user_profiile_id,
    u.name AS recommended_user_name,
    u.gender AS recommended_user_gender,
    u.location AS recommended_user_location,
    u.university AS recommended_user_university,
    u.interests AS recommended_user_interests

    FROM recommendation r JOIN user_profile u ON r.recommended_user_id = u.id
    WHERE r.swipe_action = 'none' AND r.user_id = ?
    ORDER BY r.recommended_date DESC LIMIT 10;
    `;

    const [results]: any = await pool.query(query, [userId]);

    await redisClient.setEx(key, 86400, JSON.stringify(results));

    return results;
};

const swipeRecommendation = async (recommendationId: number, swipeAction: string, userId: number) => {
    const query = `UPDATE recommendation SET swipe_action = ? WHERE id = ?;`;

    await pool.query(query, [swipeAction, recommendationId]);

    const key = cacheKeyToday(userId);
    const cached = await redisClient.get(key);

    if (cached) {
        console.log("Updating cached recommedations");
        //because of caching we will always send the same 10 regardless of swipe action, so filter out the ones that have been swiped
        const newCache = JSON.parse(cached).filter((rec) => rec.recommended_id != recommendationId);

        // console.log(newCache);

        await redisClient.setEx(key, 86400, JSON.stringify(newCache));

        return;
    }
};

const selectUsersWithSimilarity = (currentUser: User, recommendedUsers: User[]) => {
    const usersWithSimilarity = recommendedUsers.map((recommended) => {
        const similarityScore = calculateInterestSimilarity(currentUser.interests, recommended.interests);
        return { ...recommended, similarityScore };
    });

    usersWithSimilarity.sort((a, b) => b.similarityScore - a.similarityScore);

    const selectedUsers = [];

    for (const number in generateIncreasingRandomWithoutSorting(10, RECOMMENDATION_POOL_SIZE)) {
        selectedUsers.push(usersWithSimilarity[number]);
    }

    return selectedUsers;
};

function generateIncreasingRandomWithoutSorting(amount, max) {
    const randomNumbers = [];
    const delta = max / amount;
    for (let i = 0; i < amount; i++) {
        randomNumbers.push(Math.round(i * delta + Math.random() * delta));
    }
    return randomNumbers;
}

export { createRecommendation, getRecommendations, swipeRecommendation };
