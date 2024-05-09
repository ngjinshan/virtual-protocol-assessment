import { getAllUsersController } from "../controller/user";
const express = require("express");

const userRouter = express.Router();

userRouter.get("/all-users", getAllUsersController);

export { userRouter };
