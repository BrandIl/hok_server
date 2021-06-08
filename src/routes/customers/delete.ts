import { currentUser, requireAdminAuth } from '../../middlewares';
import cors from 'cors';
import express, { Request, Response } from 'express'
import mongo from 'mongodb'
import { Customer } from '../../models';

const router = express.Router();


router.put('/api/customers/delete:id',
  currentUser,
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const userToDelete =
      await Customer.deleteOne({ _id: new mongo.ObjectId(req.params.id) });

    ;

    res.status(204).send(userToDelete);

  });

export { router as deleteCustomerRouter }