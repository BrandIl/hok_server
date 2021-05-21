import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '@hok/common';
import { Customer } from '../../models/customer';
import cors from 'cors';


const router = express.Router();
router.use(cors());

router.get('/api/customers/',
  currentUser,
  // requireAdminAuth,
  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);

    const customers = await Customer.find(filter as object)
      .sort(sort as object).populate('organizationId');

    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', 'customers 0-5/5');
    res.send(customers);

  });

export { router as readCustomersRouter }