import { redisClient, logger } from '@libs';

const retrieveCache = async (req, res, next) => {
    try {
        const cacheKey = req.originalUrl;
        logger.info(req.originalUrl);
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const users = JSON.parse(cachedData);
            res.json({ data: users });
        } else {
            next();
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default retrieveCache;
