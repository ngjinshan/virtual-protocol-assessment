import { Request, Response } from "express";
import { getAllUsers } from "../service/user";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        throw err;
    }
};
