import { createClient } from "redis";

const redisClient = createClient({
    url: `redis://redis:6379`,
});

//today's cache key
const cacheKeyToday = (userId: number) => `recommendations-${userId}-${new Date().toISOString().slice(0, 10)}`;

export { redisClient, cacheKeyToday };
