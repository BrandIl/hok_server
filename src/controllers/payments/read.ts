import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth, requireAuth } from '../../middlewares';
import { Payment, User } from '../../models';
import cors from 'cors';
import { JsonWebTokenError } from 'jsonwebtoken';

const router = express.Router();


router.get('/api/payments/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = sort == undefined ? {} : JSON.parse(req.query.filter as string);

    const payments = await Payment.find(filter as object).sort({});

    res.setHeader('Content-Range', `payments 0-${payments.length}/${payments.length}`);
    res.send(payments);
  });

export { router as readPaymentsRouter }