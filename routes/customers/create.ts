import express, {Request, Response} from 'express'
import { requireAdminAuth,
         validateRequest,
         currentUser} from '@hok/common';
import {body} from 'express-validator';

import { Customer } from '../../models/customer';
import cors from 'cors';

const router =express.Router();
router.use(cors());

router.post('/api/customers/create',
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

  const {id,firstName, lastName, communication, organizationId} =req.body;


  const customer =Customer.build({id,firstName, lastName, communication,organizationId}) ;
  
  await customer.save();

  res.status(201).send(Customer);
  
  }
);

export {router as createCustomerRouter}
