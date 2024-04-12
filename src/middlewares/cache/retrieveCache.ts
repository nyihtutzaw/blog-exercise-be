import { redisClient, logger } from '@libs';

const retrieveCache = async (req, res, next) => {
    try {
        if (req.query.refresh) next();

        const cacheKey = req.originalUrl;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            res.json({ data });
        } else {
            next();
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default retrieveCache;
