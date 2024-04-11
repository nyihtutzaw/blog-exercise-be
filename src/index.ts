import { createServer } from './app';
import { logger } from './libs';

const port = process.env.PORT || 8000;

createServer().then((result) => {
    result.listen(port, () => {
        logger.info(`api running on ${port}`);
    });
});
