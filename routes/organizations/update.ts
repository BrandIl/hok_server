import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, BadRequestError, NotFoundError, NotAuthorizedError, requireAdminAuth, requireAuth, currentUser } from '@hok/common';

import { Organization } from '../../models/organization';
import cors from 'cors';



const router = express.Router();
router.use(cors());

router.put('/api/organizations/:id',

  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const organizationToUpdate = await Organization.findById(req.params.id);
    const { name, communication, masavData, paymentAgreement } = req.body;

    if (!organizationToUpdate) {
      throw new NotFoundError();
    }

    //   if(organizationToUpdate.userId !== req.currentUser!.id && req.currentUser!.isAdmin != true){
    //    throw new NotAuthorizedError();
    //  }

    try {
      await organizationToUpdate.set({
        name, communication, masavData, paymentAgreement
      });

      await organizationToUpdate.save();
    } catch (error) {
      console.error(error);
    }
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.send(organizationToUpdate);
  });

export { router as updateOrganizationRouter }