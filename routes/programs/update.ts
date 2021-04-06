import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import {validateRequest,BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import { Program } from '../../models/program';
import cors from 'cors';



const router =express.Router();
router.use(cors());

router.put('/api/programs/update/:id',
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
 
  const programToUpdate = await Program.findById(req.params.id);
  const {sum,startDate,numOfPayments,launchDay, paymentMethod,customerId} =req.body;

 
  if(!programToUpdate){
    throw new NotFoundError();
  }

  if(programToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
   throw new NotAuthorizedError();
 }

 try {
   await programToUpdate.set({
    sum,startDate,numOfPayments,launchDay, paymentMethod,customerId
    });

    await programToUpdate.save();
 } catch (error) {
   console.error(error);
 }
  res.send(programToUpdate);
});

export {router as updateProgramRouter}