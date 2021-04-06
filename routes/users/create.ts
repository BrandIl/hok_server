import express, {Request, Response} from 'express'
import { requireAdminAuth,
         validateRequest,
         BadRequestError, 
         currentUser} from '@hok/common';
import {body} from 'express-validator';

import  {User} from '../../models/user';
import cors from 'cors';



const router =express.Router();
router.use(cors());

router.post('/api/users/',

[
    body('name')
    .trim()
    .isLength({min:4, max:50})
    .withMessage('Name must be between 4 and 50 characters'),
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .notEmpty()
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Password must be between 4 and 20 characters'),
    body('isAdmin')
    .isBoolean()
    .withMessage('isAdmin nust be boolean'),
],
validateRequest,

async (req:Request, res:Response)=> {

  console.log(req.body);


  const {name,email, password,isAdmin} =req.body;

  const existingUser =await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Email in use');
  }

  try {
    const user =User.build({name,email,password, isAdmin});

    await user.save();
  
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
    
    res.status(201).send(user);
    
  } catch (error) {
    console.log(error);
    res.send(error);
  }
 
  
  }
);

export {router as createUserRouter}
