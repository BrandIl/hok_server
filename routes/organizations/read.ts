import express, {Request, Response} from 'express'

import {currentUser, requireAdminAuth} from '@hok/common';
import { Organization } from '../../models/organization';
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/organizations/',

async (req:Request, res:Response)=> {

  const organizations = await Organization.find({});

  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', 'users 0-5/5');

  res.send(organizations);
  
  });

export {router as readOrganizationsRouter}