import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import {validateRequest,BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import {User} from '../../models/user'
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.put('/api/users/:id',
[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .isLength({min:4, max:20})
  .withMessage('Password must be between 4 and 20 characters'),
  body('isAdmin')
  .isBoolean()
  .withMessage('isAdmin nust be boolean'),

],
validateRequest,
 async (req:Request, res:Response)=> {
 
  const userToUpdate = await User.findById(req.params.id);
  const {name,email,password ,isAdmin} = req.body;
  const userWithSameEmail  = await User.findOne({email: email});

  if(!userToUpdate){
    throw new NotFoundError();
  }

  if(userToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
   throw new NotAuthorizedError();
 }

 
 if(userWithSameEmail.id !=userToUpdate.id ){
  throw new BadRequestError('Email in use');
}

 try {
   await userToUpdate.set({
    name, email, password,isAdmin
    });

    await userToUpdate.save();
 } catch (error) {
   console.error(error);
 }
 
 res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
res.setHeader('Content-Range', 'users 0-5/5');

  res.send(userToUpdate);
});

export {router as updateUserRouter}