import express, { Request, Response } from 'express'
import { currentUser, requireAdminAuth } from '../../middlewares';
import { NotFoundError } from '../../errors';
import { User } from '../../models';

const router = express.Router();


router.get('/api/users/:id',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      throw new NotFoundError();
    }

    res.send(existingUser);

  });

export { router as showUserRouter }