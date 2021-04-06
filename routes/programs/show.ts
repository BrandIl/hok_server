import express, {Request, Response} from 'express'

import { currentUser, NotFoundError, requireAdminAuth} from '@hok/common';
import { Program } from '../../models/program';
import cors from 'cors';


const router =express.Router();
router.use(cors());


router.get('/api/programs/:id',
async (req:Request, res:Response)=> {

const existingProgram = await Program.findById(req.params.id);

 if(!existingProgram){
   throw new NotFoundError();
 }

 console.log(existingProgram);
 res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
 res.setHeader('Content-Range', 'users 0-5/5');
  res.send(existingProgram);
  
  });

export {router as showProgramRouter}