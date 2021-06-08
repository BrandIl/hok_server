import { Request, Response, NextFunction } from 'express';
import { NotAdminAuthorizedError } from '../errors/not-admin-authorized-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  if (!req.currentUser?.isAdmin) {
    throw new NotAdminAuthorizedError();
  }
  next();
};
