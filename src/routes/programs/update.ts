import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { Program } from '../../models/program';
import { currentUser, requireAuth, validateRequest } from '../../middlewares';
import { NotAuthorizedError, NotFoundError } from '../../errors';



const router = express.Router();


router.put('/api/programs/:id',
  currentUser,
  requireAuth,

  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser!.organizations.includes(req.params.id) && !req.currentUser!.isAdmin) {
      return new NotAuthorizedError();
    }
    const programToUpdate = await Program.findById(req.params.id);

    if (!programToUpdate) {
      throw new NotFoundError();
    }

    try {
      await programToUpdate.set(req.body);

      await programToUpdate.save();
    } catch (error) {
      console.error(error);
    }
    res.send(programToUpdate);
  });

export { router as updateProgramRouter }