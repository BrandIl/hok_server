import express, {Request, Response} from 'express'

import {currentUser, requireAdminAuth} from '@hok/common';
import { Project } from '../../models/project';

import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/projects/',
currentUser,
requireAdminAuth,
async (req:Request, res:Response)=> {

  const users = await Project.find({});


  res.send(users);
  
  });

export {router as readProjectsRouter}