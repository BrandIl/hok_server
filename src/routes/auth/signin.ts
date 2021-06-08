import cors from 'cors';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { User } from '../../models';
import { Password } from '../../services';


const router = express.Router();

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

    req.headers.authorization = JSON.stringify({ jwt: userJwt });

    res.status(200).send({
      jwt: userJwt
    });
  });

export { router as signinRouter };
