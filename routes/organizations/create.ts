import express, {Request, Response} from 'express'
import { requireAdminAuth,
         validateRequest,
         currentUser} from '@hok/common';
import {body} from 'express-validator';
import axios from 'axios';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';

import cors from 'cors';

const router =express.Router();
router.use(cors());

router.post('/api/organizations',

[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
],
validateRequest,

async (req:Request, res:Response)=> {

  const {name,communication,concats,masavData,paymentAgreement} =req.body;

  const organization =Organization.build({name,communication,concats,masavData,paymentAgreement}) ;
  
  await organization.save();

  res.status(201).send(organization);
  
  }
);

export {router as createOrganizationRouter}
