import { User } from "../model/user";
import { pool } from "../database/db";

const getRandomUsers = async (count = 10) => {
    //randomize and get 10, then sort by how matchmade the users are based on the algorithm
    const currentUser: User = {
        name: "Jin Shan",
        gender: "male",
        interests: "boxing, music",
        location: "Box Hill",
        university: "Monash",
    };

    //order by shown ASC and then randomize to first get results based on least shown, and then randomize
    const query = `SELECT * FROM user_profile WHERE name = 'Jin Shan';`;
    try {
        const [results]: any = await pool.query(query, [currentUser.gender]); //force type for now to make results iterable
        const userIds = results.map((res) => res.id);
        await updateUsersShown(userIds);
        return results;
    } catch (err) {
        console.error("Error fetching users", err);
        throw err;
    }
};

const getUser = async (id: number) => {
    const query = `SELECT * FROM user_profile WHERE id = ?;`;
    try {
        const [result]: any = await pool.query(query, [id]); //force type for now to make results iterable
        return result;
    } catch (err) {
        console.error("Error fetching users", err);
        throw err;
    }
};

const updateUsersShown = async (userIds: number[]) => {
    try {
        const query = `UPDATE user_profile SET shown = shown + 1 WHERE id = ?;`;
        await Promise.all(userIds.map((id) => pool.query(query, [id])));
    } catch (err) {
        throw err;
    }
};

const getAllUsers = async () => {
    const query = `SELECT * FROM user_profile;`;
    try {
        const [result]: any = await pool.query(query); //force type for now to make results iterable
        return result;
    } catch (err) {
        console.error("Error fetching users", err);
        throw err;
    }
};

export { getRandomUsers, getUser, getAllUsers };
