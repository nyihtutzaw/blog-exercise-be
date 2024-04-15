import { verifyUserToken } from '@helpers/userToken';
import { logger } from '@libs';
import { getUserById } from '@services';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.slice(7);
            const user = verifyUserToken(token);
            const userInDB = await getUserById(user.id);

            logger.info(token);
            logger.info(user);

            if (user && userInDB) {
                req.user = user;
                next();
                return;
            }
        }

        return res.status(401).json({ message: 'Unauthenicated' });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
