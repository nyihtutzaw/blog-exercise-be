import { createServer } from './app';
import { logger, redisClient } from '@libs';

const port = 5001;

createServer().then((result) => {
    result.listen(port, () => {
        logger.info(`api running on ${port}`);
    });

    (async () => {
        await redisClient.connect();
    })();

    redisClient.on('connect', () => logger.info('Redis Client Connected'));

    redisClient.on('error', (err) => logger.info('Redis Client Connection Error', err));
});
