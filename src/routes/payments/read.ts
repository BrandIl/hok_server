import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '../../middlewares';
import { Payment } from '../../models';
import { queryString } from '../../services/queryString';


const router = express.Router();


router.get('/api/payments/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {

    let { sort, filter, limit, skip, start, end } = queryString(req.query);

    if (!req.currentUser!.isAdmin && !filter.organizationId) {
      filter.organizationId = { $in: req.currentUser!.organizations }
    }

    const payments = await Payment.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Payment.find(filter).countDocuments();


    const totalSum = payments.length === 0 ? 0
      : payments.map((payment: any) => parseInt(payment.sum)).reduce((prev, next) => prev + next);


    res.setHeader('Content-Range', `payments ${start + 1}-${end + 1}/${total}`);
    res.send(payments);
  });

export { router as readPaymentsRouter };
