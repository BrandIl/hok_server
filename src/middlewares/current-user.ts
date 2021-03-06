import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  organizations: string[];
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}


export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.headers.authorization || !JSON.parse(req.headers.authorization!)?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      JSON.parse(req.headers.authorization!).jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) { }

  next();
};
