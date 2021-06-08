import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '../../middlewares';
import { NotFoundError } from '../../errors';

import { Customer } from '../../models/customer';
import cors from 'cors';


const router = express.Router();


router.get('/api/customers/:id',
  //currentUser,
  //requireAdminAuth,
  async (req: Request, res: Response) => {

    const existingCustomer = await Customer.findById(req.params.id);

    if (!existingCustomer) {
      throw new NotFoundError();
    }
    ;

    res.send(existingCustomer);

  });

export { router as showCustomerRouter }