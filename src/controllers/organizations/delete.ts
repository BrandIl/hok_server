import express, { Request, Response } from 'express';
import mongo from 'mongodb';
import { BadRequestError } from '../../errors';
import { currentUser, requireAdminAuth } from '../../middlewares';
import { Customer, Organization, Program, Project } from '../../models';

const router = express.Router();


router.delete('/api/organizations/:id',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {
    try {
      const organizationToDelete =
        await Organization.findByIdAndDelete(req.params.id);

      const customers =
        await Customer.deleteMany({ organizationId: req.params.id });

      const programs =
        await Program.deleteMany({ organizationId: req.params.id });

      const projects =
        await Project.deleteMany({ organizationId: req.params.id });

      res.status(204).send({});
    } catch (error) {
      throw new BadRequestError(error);
    }
  });

export { router as deleteOrganizationRouter };
