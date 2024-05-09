import { User } from "../model/user";
import { faker } from "@faker-js/faker";

export function generateRandomUsers(count: number): User[] {
    const users: User[] = [];

    //mock current user
    users.push({
        name: "Jin Shan",
        gender: "male",
        interests: "boxing, music",
        location: "Box Hill",
        university: "Monash",
    });

    for (let i = 0; i < count; i++) {
        const user: User = {
            name: faker.person.fullName(),
            gender: faker.helpers.arrayElement(["male", "female"]),
            location: faker.helpers.arrayElement(["Box Hill", "CBD", "Hawthorn", "Richmond", "Caulfield", "South Yarra"]),
            university: faker.helpers.arrayElement(["Monash", "Deakin", "UniMelb", "RMIT", "Swinburne", "VU", "la trobe"]),
            interests: faker.helpers.arrayElement([
                "boxing, gym, music",
                "boxing",
                "gym",
                "music",
                "reading, travelling, hiking, photography",
                "reading, hiking",
                "movies, reading",
                "DIY, gym",
                "gaming, drinking, travelling, music",
                "drinking, music",
                "music, movies",
                "gaming, gym",
                "gaming",
                "travelling",
            ]),
        };

        users.push(user);
    }

    return users;
}
