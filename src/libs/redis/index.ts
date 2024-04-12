import { createClient } from 'redis';

export const redisClient = createClient({
    url: `redis://${process.env.REDIS_URL || 'redis'}:${process.env.REDIS_PORT || 6379}`,
});
