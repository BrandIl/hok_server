import express, {Request, Response} from 'express'

import {currentUser, requireAdminAuth} from '@hok/common';
import { Customer } from '../../models/customer';
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/customers/',
currentUser,
requireAdminAuth,
async (req:Request, res:Response)=> {

  const users = await Customer.find({});


  res.send(users);
  
  });

export {router as readCustomersRouter}