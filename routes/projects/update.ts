import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import {validateRequest,BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import { Project } from '../../models/project';

import cors from 'cors';



const router =express.Router();
router.use(cors());

router.put('/api/projects/:id',
[
  body('name')
  .trim()
  .isLength({min:4, max:50})
  .withMessage('Name must be between 4 and 50 characters'),
],
validateRequest,
 async (req:Request, res:Response)=> {
 
  const projectToUpdate = await Project.findById(req.params.id);
  const {name, organizationId} =req.body;



  if(!projectToUpdate){
    throw new NotFoundError();
  }

//   if(projectToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
//    throw new NotAuthorizedError();
//  }

 try {
   await projectToUpdate.set({
    name, organizationId
    });

    await projectToUpdate.save();
 } catch (error) {
   console.error(error);
 }
  res.send(projectToUpdate);
});

export {router as updateProjectRouter}