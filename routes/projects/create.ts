import express, {Request, Response} from 'express'
import { requireAdminAuth,
         validateRequest,
         currentUser} from '@hok/common';
import {body} from 'express-validator';
import axios from 'axios';
import { Project } from '../../models/project';
import cors from 'cors';




const router =express.Router();
router.use(cors());

router.post('/api/projects/create',
currentUser,
requireAdminAuth,
[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
],
validateRequest,

async (req:Request, res:Response)=> {

  const {name, organizationId} =req.body;

  const project =Project.build({name, organizationId}) ;
  
  await project.save();

  res.status(201).send(project);
  
  }
);

export {router as createProjectRouter}
