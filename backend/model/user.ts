export interface User {
    id?: number;
    name: string;
    gender: "male" | "female";
    location: string;
    university: string;
    interests: string;
    shown?: number;
}
