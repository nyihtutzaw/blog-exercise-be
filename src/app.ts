import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import router from '@routes';

export async function createServer(): Promise<Application> {
    const app = express();

    app.use(urlencoded({ extended: true }));
    app.use(cors());
    app.use(
        cors({
            origin: '*',
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            methods: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
        })
    );
    app.use(json());

    app.use('/', router);

    return app;
}
