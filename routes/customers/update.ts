import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import {validateRequest,BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import { Customer } from '../../models/customer';
import cors from 'cors';



const router =express.Router();
router.use(cors());

router.put('/api/customer/update:id',
currentUser,
requireAdminAuth,
[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
],
validateRequest,
 async (req:Request, res:Response)=> {
 
  const customerToUpdate = await Customer.findById(req.params.id);
  const {firstName, lastName, communication} =req.body;

 
  if(!customerToUpdate){
    throw new NotFoundError();
  }

  if(customerToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
   throw new NotAuthorizedError();
 }

 try {
   await customerToUpdate.set({
    firstName, lastName, communication
    });

    await customerToUpdate.save();
 } catch (error) {
   console.error(error);
 }
  res.send(customerToUpdate);
});

export {router as updateCustomerRouter}