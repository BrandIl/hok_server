import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '../../middlewares';
import { User } from '../../models';
import { queryString } from '../../services/queryString';


const router = express.Router();


router.get('/api/users/',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {

    let { sort, filter, skip, limit, start, end } = queryString(req.query);


    const users = await User.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await User.find(filter).countDocuments();

    res.setHeader('Content-Range', `users ${start + 1}-${end + 1}/${total}`);

    res.send(users);
  });

export { router as readUsersRouter }