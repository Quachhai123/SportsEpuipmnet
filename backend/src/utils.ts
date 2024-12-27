import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from './models/user';

export const fetchUser: RequestHandler = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    const token = req.header('auth-token');
    if (!token) {
        console.log('No token provided');
        res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'default_secret';
        const data = jwt.verify(token as string, secret) as any;
        // @ts-ignore
        req.user = data.user;
        next();
    } catch (error: any) {
        console.log('Invalid token:', error.message);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
