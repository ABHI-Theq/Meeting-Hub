import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Model/User.Model';

const JWT_SECRET = process.env.JWT_SECRET;

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Try to get token from cookie or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : undefined);

    if (!token) {
      res.status(401).json({ error: 'Unauthorized access: No token provided' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as {
      user: { id: string };
    };

    const user = await User.findById(decoded.user.id);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized access: User not found' });
      return;
    }

    // Attach user to request
    (req as any).user = user;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
