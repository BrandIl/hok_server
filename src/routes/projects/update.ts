import express, { Request, Response } from 'express'
import { body } from 'express-validator'


import { Project } from '../../models';

import cors from 'cors';
import { currentUser, requireAuth, validateRequest } from '../../middlewares';
import { NotAuthorizedError, NotFoundError } from '../../errors';



const router = express.Router();


router.put('/api/projects/:id',
  currentUser,
  requireAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    if (!req.currentUser!.organizations.includes(req.params.id) && !req.currentUser!.isAdmin) {
      throw new NotAuthorizedError();
    }
    const projectToUpdate = await Project.findById(req.params.id);
    const { name, organizationId } = req.body;



    if (!projectToUpdate) {
      throw new NotFoundError();
    }


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

export { router as updateProjectRouter }