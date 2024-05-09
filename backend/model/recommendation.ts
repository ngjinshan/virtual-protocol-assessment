import { User } from "./user";

export interface Recommendation {
    user_id: number;
    recommended_user: User;
    recommended_date: Date;
    swipe_action: "like" | "dislike" | "none";
}
