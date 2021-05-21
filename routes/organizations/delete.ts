import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, {Request, Response} from 'express'
import mongo from 'mongodb'
import { Organization } from '../../models/organization';

const router =express.Router();
router.use(cors());

router.delete('/api/organizations/:id',

async (req:Request, res:Response)=> {
  const userToDelete = 
  await Organization.deleteOne({ _id: new mongo.ObjectId(req.params.id)});

  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.status(204).send(userToDelete);
  
  });

export {router as deleteOrganizationRouter}