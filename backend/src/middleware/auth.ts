import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '@/utils/jwt';
import PrismaService from '@/services/prisma.service';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        phone?: string;
      };
    }
  }
}

const prisma = PrismaService.getInstance();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);

    // Verify user exists
    const user = await prisma.findUserById(payload.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email || undefined,
      phone: user.phone || undefined,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export const optionalAuthenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      next();
      return;
    }

    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);

    // Verify user exists
    const user = await prisma.findUserById(payload.userId);
    if (user) {
      req.user = {
        id: user.id,
        email: user.email || undefined,
        phone: user.phone || undefined,
      };
    }

    next();
  } catch (error) {
    // Don't fail if token is invalid for optional auth
    next();
  }
};