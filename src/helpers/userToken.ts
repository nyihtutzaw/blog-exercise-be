import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';

export const signUserToken = (user: User): string => {
    return jwt.sign({ ...user }, SECRET_KEY);
};

export const verifyUserToken = (token: string): User | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as User;
    } catch {
        return null;
    }
};

export const decodeUserToken = (token: string): jwt.JwtPayload | null => {
    try {
        return jwt.decode(token) as jwt.JwtPayload;
    } catch {
        return null;
    }
};
