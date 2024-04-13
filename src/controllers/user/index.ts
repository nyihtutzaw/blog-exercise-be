import { Response, Request } from 'express';
import { PaginatedResponse, ResponseType } from '@types';
import { signUserToken } from '@helpers';
import { User } from '@prisma/client';
import { BaseController } from '@controllers/baseController';
import { createUser, getUserByEmail, getUserById } from '@services';
import * as bcrypt from 'bcryptjs';
import { logger } from '@libs';
import { userResponse } from 'src/responses';

class UserController extends BaseController<PaginatedResponse<User> | User> {
    async get(req: Request, res: Response<ResponseType<User>>) {
        const { id = '0' } = req.params;

        try {
            const data = await getUserById(parseInt(id));

            if (data) {
                super.handleCache(req.originalUrl, data);
            }

            return res.send({ message: 'User', data: userResponse(data) });
        } catch (err) {
            logger.info(err);
            return res.send({ message: 'Not Found' }).status(404);
        }
    }

    async register(req: Request, res: Response<ResponseType<User>>) {
        try {
            const userByEmail = await getUserByEmail(req.body.email);

            if (userByEmail) {
                return res.status(403).json({ message: 'Email already exist' });
            }

            const user = await createUser(req.body);

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
