import { redisClient, logger } from '@libs';

const revalidateCache = (pattern: string) => async (_req, res, next) => {
    try {
        const keys = await redisClient.keys(pattern);

        if (keys.length > 0) {
            for (const key of keys) {
                await redisClient.del(key);
            }
        } else {
            logger.info('No cache entries found for posts');
        }
        next();
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default revalidateCache;
