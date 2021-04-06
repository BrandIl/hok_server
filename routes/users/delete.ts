import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, {Request, Response} from 'express'
import mongo from 'mongodb'
import { User } from '../../models/user';

const router =express.Router();
router.use(cors());

router.delete('/api/users/:id',

async (req:Request, res:Response)=> {
  const userToDelete = 
  await User.deleteOne({ _id: new mongo.ObjectId(req.params.id)});

  res.status(204).send(userToDelete);
  
  });

export {router as deleteUserRouter}