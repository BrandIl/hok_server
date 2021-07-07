import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotAdminAuthorizedError, NotAuthorizedError } from '../../errors';
import {
  currentUser,
  requireAuth,
  validateRequest
} from '../../middlewares';
import { Project } from '../../models';

const router = express.Router();
router.post('/api/projects/',
  currentUser,
  requireAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,


  async (req: Request, res: Response) => {
    const { name, organizationId } = req.body;
    if (!req.currentUser!.organizations.includes(organizationId) && !req.currentUser!.isAdmin) {
      throw new NotAuthorizedError();
    }

    const isExists = await Project.find({ name, organizationId }).countDocuments();
    if (isExists !== 0)
      throw new BadRequestError("Project with this name is already exists. You have to use in a uniqe name");

    try {
      const project = Project.build({ name, organizationId });
      await project.save();
      res.status(201).send(project);
    }
    catch (error) {
      throw new BadRequestError(error);
    }
  }
);

export { router as createProjectRouter };

