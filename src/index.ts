import { createServer } from './app';

const port = process.env.PORT || 8000;

createServer().then((result) => {
  result.listen(port, () => {
    console.log(`api running on ${port}`);
  });
});
