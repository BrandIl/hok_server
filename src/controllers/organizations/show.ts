import express, { Request, Response } from 'express'

import { currentUser, requireAuth } from '../../middlewares';

import { Organization } from '../../models';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../errors';


const router = express.Router();
router.get('/api/organizations/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.currentUser!.organizations.includes(req.params.id) && !req.currentUser!.isAdmin) {
      throw new NotAuthorizedError();
    }
    try {
      const existingOrganization = await Organization.findById(req.params.id);

      if (!existingOrganization) {
        throw new NotFoundError();
      }
      req.headers.organization = req.params.id;
      res.setHeader("organization", req.params.id);
      res.send(existingOrganization);
    } catch (error) {
      throw new BadRequestError(error);
    }


  });

export { router as showOrganizationRouter }