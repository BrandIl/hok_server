import express, { Request, Response } from 'express'
import {
  requireAdminAuth,
  validateRequest,
  currentUser
} from '../../middlewares';
import { body } from 'express-validator';
import { Organization } from '../../models';
import { BadRequestError } from '../../errors';

const router = express.Router();
router.post('/api/organizations/',
  currentUser,
  requireAdminAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { name, communication, masavData, paymentAgreement } = req.body;
    try {
      const isExists = await Organization.findOne({ name });
      if (isExists)
        throw new BadRequestError("Organization with this name is already exists You have to use in a uniqe name");
      const organization = Organization.build({ name, communication, masavData, paymentAgreement });
      await organization.save();
      res.status(201).send(organization);
    } catch (error) {
      throw new BadRequestError(error);
    }
  }
);
export { router as createOrganizationRouter }
