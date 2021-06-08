import { currentUser, requireAdminAuth } from '../../middlewares';
import express, { Request, Response } from 'express'
import mongo from 'mongodb'
import { User } from '../../models';

const router = express.Router();

router.delete('/api/users/:id',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const userToDelete =
      await User.findByIdAndDelete(req.params.id);

    res.status(204).send(userToDelete);

  });

export { router as deleteUserRouter }