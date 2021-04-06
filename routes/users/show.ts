import express, {Request, Response} from 'express'

import { NotFoundError, requireAdminAuth} from '@hok/common';
import{ User} from '../../models/user';
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/users/:id',

async (req:Request, res:Response)=> {
const existingUser = await User.findById(req.params.id);

 if(!existingUser){
   throw new NotFoundError();
 }

 res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
 res.setHeader('Content-Range', 'users 0-5/5');

  res.send(existingUser);
  
  });

export {router as showUserRouter}