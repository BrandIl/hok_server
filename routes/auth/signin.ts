import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError, currentUser } from '@hok/common';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import cors from 'cors';


const router = express.Router();
router.use(cors());


router.post('/api/auth/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')

  ],
  validateRequest,

  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log('existingUser');
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }


    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin

    },
      process.env.JWT_KEY!
    );

    req.headers.authorization = userJwt;

    req.session = {
      jwt: userJwt
    };

    req.headers.authorization = JSON.stringify({ jwt: userJwt });

    res.status(200).send({
      jwt: userJwt
    });
  });

export { router as signinRouter }