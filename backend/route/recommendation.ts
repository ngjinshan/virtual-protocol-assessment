import { getRecommendationsController, patchRecommendationController } from "../controller/recommendation";
import { authenticateJWT } from "../middleware/auth";

const express = require("express");

const recommendationRouter = express.Router();

//GET
recommendationRouter.get("/get-recommendation", authenticateJWT, getRecommendationsController);

recommendationRouter.patch("/swipe-recommendation", authenticateJWT, patchRecommendationController);

export { recommendationRouter };
