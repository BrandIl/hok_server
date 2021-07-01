import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth, requireAuth } from '../../middlewares';
import { Customer } from '../../models/customer';
import { queryString } from '../../services/queryString';



const router = express.Router();


router.get('/api/customers/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let { sort, filter, skip, limit, start, end } = queryString(req.query);

    if (!req.currentUser!.isAdmin && !filter.organizationId) {
      filter.organizationId = { $in: req.currentUser!.organizations }
    }


    const customers = await Customer.find(filter).sort(sort).sort(sort).skip(skip).limit(limit);

    const total = await Customer.find(filter).countDocuments();

    res.setHeader('Content-Range', `customers ${start + 1}-${end + 1}/${total}`);

    res.send(customers);

  });

export { router as readCustomersRouter }