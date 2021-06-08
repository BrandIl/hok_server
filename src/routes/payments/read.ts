import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '../../middlewares';
import { User } from '../../models';
import cors from 'cors';
import { JsonWebTokenError } from 'jsonwebtoken';

const router = express.Router();


router.get('/api/users/',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = sort == undefined ? {} : JSON.parse(req.query.filter as string);

    const users = await User.find(filter as object).sort({});

    res.setHeader('Content-Range', `users 0-5/${users.length}`);

    res.send(users);
  });

export { router as readUsersRouter }