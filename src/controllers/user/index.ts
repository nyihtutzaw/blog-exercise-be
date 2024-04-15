import { Response, Request } from 'express';
import { ResponseType } from '@types';
import { signUserToken } from '@helpers';
import { User } from '@prisma/client';
import { BaseController } from '@controllers/baseController';
import { createUser, getAllUsers, getUserByEmail, getUserById } from '@services';
import * as bcrypt from 'bcryptjs';
import { logger } from '@libs';
import { userResponse } from 'src/responses';
import { revalidateCache } from '@middlewares';

class UserController extends BaseController<User[] | User> {
    async get(req: Request, res: Response<ResponseType<User>>) {
        const { id = '0' } = req.params;

        try {
            const data = await getUserById(parseInt(id), true);

            if (data) {
                super.handleCache(req.originalUrl, data);
            }

            return res.send({ message: 'User', data: userResponse(data) });
        } catch (err) {
            logger.info(err);
            return res.send({ message: 'Not Found' }).status(404);
        }
    }

    async profile(req: Request, res: Response<ResponseType<User>>) {
        try {
            const data = await getUserById(req.user.id);
            return res.send({ message: 'User Profile', data: userResponse(data) });
        } catch (err) {
            logger.info(err);
            return res.send({ message: 'z Not Found ' }).status(404);
        }
    }

    async getAll(req: Request, res: Response<ResponseType<User[]>>) {
        const data = await getAllUsers();

        if (data.length > 0) {
            super.handleCache(req.originalUrl, data);
        }

        return res.send({ message: 'All Users', data: data.map((eachData) => userResponse(eachData)) });
    }

    async register(req: Request, res: Response<ResponseType<User>>) {
        try {
            const userByEmail = await getUserByEmail(req.body.email);

            if (userByEmail) {
                res.statusMessage = 'Email already exist';
                return res.status(403).send();
            }

            const user = await createUser(req.body);

            revalidateCache('*users*');

            return res.json({ message: 'Success', data: userResponse(user) });
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response<ResponseType<{ user: User; token: string }>>) {
        try {
            const userByEmail = await getUserByEmail(req.body.email);

            if (!userByEmail) {
                return res.status(401).json({ message: 'Email not found' });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, userByEmail.password);

            if (!passwordMatch) return res.status(401).json({ message: "Password doesn't match" });

            const token = signUserToken(userByEmail);

            return res.json({
                message: 'Success',
                data: {
                    user: userResponse(userByEmail),
                    token,
                },
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

export default new UserController();
