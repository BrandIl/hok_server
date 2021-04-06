import express, {Request, Response} from 'express'

import {currentUser, requireAdminAuth} from '@hok/common';
import { Program } from '../../models/program';
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/programs/',

async (req:Request, res:Response)=> {

  const users = await Program.find({});

  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
  res.setHeader('Content-Range', 'users 0-5/5');

  res.send(users);
  
  });

export {router as readProgramsRouter}