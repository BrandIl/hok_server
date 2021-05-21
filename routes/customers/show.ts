import express, { Request, Response } from 'express'

import { currentUser, NotFoundError, requireAdminAuth } from '@hok/common';
import { Customer } from '../../models/customer';
import cors from 'cors';


const router = express.Router();
router.use(cors());

router.get('/api/customers/:id',
  //currentUser,
  //requireAdminAuth,
  async (req: Request, res: Response) => {

    const existingCustomer = await Customer.findById(req.params.id);

    if (!existingCustomer) {
      throw new NotFoundError();
    }
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

    res.send(existingCustomer);

  });

export { router as showCustomerRouter }