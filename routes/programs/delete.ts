import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, {Request, Response} from 'express'
import mongo from 'mongodb'
import { Program } from '../../models/program';

const router =express.Router();
router.use(cors());

router.put('/api/programs/delete/:id',
currentUser,
requireAdminAuth,
async (req:Request, res:Response)=> {
  const programToDelete = 
  await Program.deleteOne({ _id: new mongo.ObjectId(req.params.id)});

  res.status(204).send(programToDelete);
  
  });

export {router as deleteProgramRouter}