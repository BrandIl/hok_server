import express, {Request, Response} from 'express'

import { NotFoundError, requireAdminAuth} from '@hok/common';
import { Project } from '../../models/project';

import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/projects/:id',


async (req:Request, res:Response)=> {

const existingProject = await Project.findById(req.params.id);

 if(!existingProject){
   throw new NotFoundError();
 }

 console.log(existingProject);
 res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
 res.setHeader('Content-Range', 'users 0-5/5');
  res.send(existingProject);
  
  });

export {router as showProjectRouter}