import { currentUser, requireAdminAuth } from '../../middlewares';
import cors from 'cors';
import express, { Request, Response } from 'express'
import mongo from 'mongodb'
import { Program } from '../../models';

const router = express.Router();


router.delete('/api/programs/:id',

  async (req: Request, res: Response) => {
    const programToDelete =
      await Program.deleteOne({ _id: new mongo.ObjectId(req.params.id) });

    res.status(204).send(programToDelete);

  });

export { router as deleteProgramRouter }