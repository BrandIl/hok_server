import express, { Request, Response } from 'express'
import {
  requireAdminAuth,
  validateRequest,
  currentUser,
} from '../../middlewares';
import { body } from 'express-validator';

import { User } from '../../models';
import cors from 'cors';
import { BadRequestError } from '../../errors';



const router = express.Router();


router.post('/api/users/',
  currentUser,
  requireAdminAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .notEmpty()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('isAdmin')
      .isBoolean()
      .withMessage('isAdmin nust be boolean'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {

    const { name, email, password, isAdmin, organizations } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    try {
      const user = User.build({ name, email, password, isAdmin, organizations });
      await user.save();
      res.status(201).send(user);

    } catch (error) {
      console.log(error);
      res.send(error);
    }


  }
);

export { router as createUserRouter }
