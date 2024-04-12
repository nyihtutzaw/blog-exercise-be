import { redisClient } from '@libs';

export class BaseController<T> {
    async handleCache(key: string, data: T) {
        await redisClient.set(key, JSON.stringify(data), {
            EX: 1000,
            NX: true,
        });
    }
}
