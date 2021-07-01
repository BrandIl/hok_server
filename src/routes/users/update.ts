import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { User } from '../../models'
import cors from 'cors';
import { currentUser, requireAdminAuth, requireAuth, validateRequest } from '../../middlewares';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../errors';


const router = express.Router();


router.put('/api/users/:id',
  currentUser,
  requireAdminAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('isAdmin')
      .isBoolean()
      .withMessage('isAdmin nust be boolean'),

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const userToUpdate = await User.findById(req.params.id);
    const { name, email, isAdmin, organizations } = req.body;
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
        name, email, isAdmin, organizations
      });

      await userToUpdate.save();
    } catch (error) {
      console.error(error);
    }


    res.send(userToUpdate);
  });

export { router as updateUserRouter }