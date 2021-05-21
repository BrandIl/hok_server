import { currentUser, requireAdminAuth } from '@hok/common';
import cors from 'cors';
import express, { Request, Response } from 'express'
import mongo from 'mongodb'
import { Customer } from '../../models/customer';

const router = express.Router();
router.use(cors());

router.put('/api/customers/delete:id',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const userToDelete =
      await Customer.deleteOne({ _id: new mongo.ObjectId(req.params.id) });

    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

    res.status(204).send(userToDelete);

  });

export { router as deleteCustomerRouter }