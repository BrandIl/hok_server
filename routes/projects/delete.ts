import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, {Request, Response} from 'express'
import mongo from 'mongodb';
import { Project } from '../../models/project';

const router =express.Router();
router.use(cors());

router.delete('/api/projects/:id',

async (req:Request, res:Response)=> {
  const projectToDelete = 
  await Project.deleteOne({ _id: new mongo.ObjectId(req.params.id)});

  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')

  res.status(204).send(projectToDelete);
  
  });

export {router as deleteProjectRouter}