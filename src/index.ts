import { createServer } from './app';

const port = process.env.PORT || 8000;

createServer().then((result) => {
    result.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`api running on ${port}`);
    });
});
