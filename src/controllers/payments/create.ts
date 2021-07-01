import express, { Request, Response } from 'express'
import {
  requireAdminAuth,
  validateRequest,
  currentUser,
} from '../../middlewares';
import { body } from 'express-validator';

import { Payment, User } from '../../models';
import cors from 'cors';
import { BadRequestError } from '../../errors';



const router = express.Router();


router.post('/api/payments/',
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

    const existingPayment = await Payment.findOne({ email });

    if (existingPayment) {
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

export { router as createPaymentRouter }
