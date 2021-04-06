import express, {Request, Response} from 'express'
import {body} from 'express-validator';
import jwt from 'jsonwebtoken'

import {validateRequest,BadRequestError} from '@hok/common';
import  {User} from '../../models/user';
import cors from 'cors';

const router =express.Router();

var corsOptions = {
  credentials: true
}

router.use(cors(corsOptions));

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

async (req:Request, res:Response)=> {

  const {name,email, password,isAdmin} = await req.body;

  const existingUser =await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Email in use');
  }
  const user =User.build({name,email,password, isAdmin});
  
  await user.save();


  const userJwt = jwt.sign({
    id:user.id,
    email: user.email,
    isAdmin:user.isAdmin
 },
    process.env.JWT_KEY!
 );


 req.headers.authorization =userJwt;

 req.session = {
   jwt:userJwt
 };


 res.status(201).send(user);
  }

  
);

export {router as signupRouter}