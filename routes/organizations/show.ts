import express, {Request, Response} from 'express'

import { currentUser, NotFoundError, requireAdminAuth} from '@hok/common';
import { Organization } from '../../models/organization';
import cors from 'cors';


const router =express.Router();
router.use(cors());

router.get('/api/organizations/:id',

async (req:Request, res:Response)=> {
const existingOrganization = await Organization.findById(req.params.id);

 if(!existingOrganization){
   throw new NotFoundError();
 }
 res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.send(existingOrganization);
  
  });

export {router as showOrganizationRouter}