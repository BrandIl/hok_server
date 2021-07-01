import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { User } from '../../models'
import cors from 'cors';
import { currentUser, requireAdminAuth, validateRequest } from '../../middlewares';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../errors';


const router = express.Router();


router.put('/api/payments/:id',
  currentUser,
  requireAdminAuth,
  [


  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const userToUpdate = await User.findById(req.params.id);
    const { name, email, password, isAdmin } = req.body;
    const userWithSameEmail = await User.findOne({ email: email });

    if (!userToUpdate) {
      throw new NotFoundError();
    }

    if (userToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true) {
      throw new NotAuthorizedError();
    }


    if (userWithSameEmail.id != userToUpdate.id) {
      throw new BadRequestError('Email in use');
    }

    try {
      await userToUpdate.set({
        name, email, password, isAdmin
      });

      await userToUpdate.save();
    } catch (error) {
      console.error(error);
    }


    res.setHeader('Content-Range', 'payments 0-5/5');

    res.send(userToUpdate);
  });

export { router as updatePaymentRouter }