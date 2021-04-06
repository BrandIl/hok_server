import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import {validateRequest,BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import { Organization } from '../../models/organization';
import cors from 'cors';



const router =express.Router();
router.use(cors());

router.put('/api/organization/update:id',

[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
],
validateRequest,
 async (req:Request, res:Response)=> {
 
  const organizationToUpdate = await Organization.findById(req.params.id);

 const {userId,name,communication,concats,masavData,paymentAgreement} =req.body;

  if(!organizationToUpdate){
    throw new NotFoundError();
  }

  if(organizationToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
   throw new NotAuthorizedError();
 }

 try {
   await organizationToUpdate.set({
    name,communication,concats,masavData,paymentAgreement
    });

    await organizationToUpdate.save();
 } catch (error) {
   console.error(error);
 }
  res.send(organizationToUpdate);
});

export {router as updateOrganizationRouter}