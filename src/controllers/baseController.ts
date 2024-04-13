import { redisClient } from '@libs';

export class BaseController<T> {
    async handleCache(key: string, data: T) {
        await redisClient.set(key.replace('refresh', '').replace('&', ''), JSON.stringify(data), {
            EX: 600,
        });
    }
}
