import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, {Request, Response} from 'express'
import mongo from 'mongodb';
import { Project } from '../../models/project';

const router =express.Router();
router.use(cors());

router.put('/api/projects/delete:id',
currentUser,
requireAdminAuth,
async (req:Request, res:Response)=> {
  const projectToDelete = 
  await Project.deleteOne({ _id: new mongo.ObjectId(req.params.id)});

  res.status(204).send(projectToDelete);
  
  });

export {router as deleteProjectRouter}