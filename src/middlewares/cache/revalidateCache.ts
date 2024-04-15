import { redisClient, logger } from '@libs';

const revalidateCache = async (patterns: string[]) => {
    try {
        const allKeys = [];

        for (const pattern of patterns) {
            const keys = await redisClient.keys(pattern);
            allKeys.push(...keys);
        }

        if (allKeys.length > 0) {
            for (const key of allKeys) {
                await redisClient.del(key);
            }
            logger.info(`Deleted ${allKeys.length} cache entries matching patterns`);
        } else {
            logger.info('No cache entries found for provided patterns');
        }
    } catch (err) {
        logger.error(err);
    }
};

export default revalidateCache;
