import { Request, Response } from "express";
import { createRecommendation, getRecommendations, swipeRecommendation } from "../service/recommendation";

const getRecommendationsController = async (req: Request, res: Response) => {
    try {
        await createRecommendation(req.user);
        const users = await getRecommendations(1);
        // const users = await getRandomUsers();
        res.json(users);
    } catch (err) {
        console.log("Error fetching", err);
        throw err;
    }
};

const patchRecommendationController = async (req: Request, res: Response) => {
    try {
        const { recommendationId, swipeAction } = req.body;
        await swipeRecommendation(recommendationId, swipeAction, req.user.id);

        res.json({ success: "success" });
    } catch (err) {
        throw err;
    }
};

export { getRecommendationsController, patchRecommendationController };
