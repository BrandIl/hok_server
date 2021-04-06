import express, {Request, Response} from 'express'

import {currentUser, requireAdminAuth} from '@hok/common';
import{ User} from '../../models/user';
import cors from 'cors';
import { JsonWebTokenError } from 'jsonwebtoken';

const router =express.Router();
router.use(cors());

router.get('/api/users/',

async (req:Request, res:Response)=> {
 
  const sort = [JSON.parse(req.query.sort as string)||{}];
  const filter = [JSON.parse(req.query.filter as string)];
  
  
  const users = await User.find({})
  .sort(sort)
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', 'users 0-5/200');

  res.send(users);

  

 

 
  
  });

export {router as readUsersRouter}