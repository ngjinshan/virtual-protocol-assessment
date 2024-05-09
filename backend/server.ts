import express from "express";
import { databaseInit } from "./database/db";
import { redisClient } from "./utils/redis";
import { userRouter } from "./route/user";
import { recommendationRouter } from "./route/recommendation";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

//redis
redisClient.connect();

app.use("/user", userRouter);
app.use("/recommendation", recommendationRouter);

// Start the server
const port = 3000;
app.listen(port, async () => {
    await databaseInit();
    console.log(`Server running on http://localhost:${port}`);
});
