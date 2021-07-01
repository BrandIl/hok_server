import cors from 'cors';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { User } from '../../models/user';

const router = express.Router();


router.post('/api/auth/signup',
  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Name must be between 4 and 20 characters'),

    body('email')
      .isEmail()
      .withMessage('Email must be valid'),

    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),

    body('isAdmin')
      .isBoolean()
      .withMessage('isAdmin nust be boolean'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {

    const { name, email, password, isAdmin, organizations } = await req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ name, email, password, isAdmin, organizations });

    await user.save();


    const userJwt = jwt.sign({
      id: user.id,
      name: existingUser.name,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      organizations: existingUser.organizations
    },
      process.env.JWT_KEY!
    );


    req.headers.authorization = userJwt;

    req.session = {
      jwt: userJwt
    };


    res.status(201).send(user);
  }


);

export { router as signupRouter };
