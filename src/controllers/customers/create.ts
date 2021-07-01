import cors from 'cors';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError } from '../../errors';
import {
  currentUser,
  requireAuth,
  validateRequest
} from '../../middlewares';
import { Customer } from '../../models';


const router = express.Router();


router.post('/api/customers',
  currentUser,
  requireAuth,
  [
    body('firstName')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { identity, firstName, lastName, communication, organizationId } = req.body;

    if (!req.currentUser!.organizations.includes(organizationId) && !req.currentUser!.isAdmin) {
      throw new NotAuthorizedError();
    }
    try {
      const customer = Customer.build({ identity, firstName, lastName, communication, organizationId });

      await customer.save();


      res.status(201).send(customer);
    } catch (error) {
      console.log(console.log(error));
      res.send(error());

    }


  }
);

export { router as createCustomerRouter };

