import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user";
import { getUser } from "../service/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; //suposed to be from .env but just mocking

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    //mock JWT authentication
    //no time to code the entire signup/signin module, so will just mock it
    //the token is supposed to be retrieved and stored as cookie/localstorage upon sign in, and passed in header

    const token = jwt.sign(
        {
            id: 1,
            name: "Jin Shan",
        },
        JWT_SECRET,
        { expiresIn: "1h" },
    );

    const falseToken = "random_stuff"; //use this to mock false token

    jwt.verify(token, JWT_SECRET, async (err, user: User) => {
        if (err) return res.sendStatus(403);
        const currentUser = await getUser(user.id);
        req.user = currentUser[0];
        next();
    });
};

export { authenticateJWT };
