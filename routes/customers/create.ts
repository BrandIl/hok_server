import express, { Request, Response } from 'express'
import {
  requireAdminAuth,
  validateRequest,
  currentUser
} from '@hok/common';
import { body } from 'express-validator';

import { Customer } from '../../models/customer';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.post('/api/customers',
  //currentUser,
  //requireAdminAuth,
  [
    body('firstName')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    const { identity, firstName, lastName, communication, organizationId } = req.body;

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

export { router as createCustomerRouter }
