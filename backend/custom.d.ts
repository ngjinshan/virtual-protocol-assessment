import { User } from "./model/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
