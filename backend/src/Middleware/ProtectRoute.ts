import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Model/User.Model';

const JWT_SECRET = process.env.JWT_SECRET;
export const protectedRoute=async (req: Request, res: Response, next: () => void) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);
        const user=await User.findById((decoded as any).user.id);
        req.user = user; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}