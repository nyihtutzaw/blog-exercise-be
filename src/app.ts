import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import router from '@routes';
import { User } from '@prisma/client';
import rateLimit from 'express-rate-limit';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export async function createServer(): Promise<Application> {
    const app = express();
    app.use(express.json());
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

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        legacyHeaders: false,
    });

    app.use(limiter);

    app.use('/', router);

    return app;
}
