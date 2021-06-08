import express, { Request, Response } from 'express'
import { Program } from '../../models';
import { NotAuthorizedError, NotFoundError } from '../../errors';
import { currentUser, requireAuth } from '../../middlewares';


const router = express.Router();

router.get('/api/programs/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.currentUser!.organizations.includes(req.params.id) && !req.currentUser!.isAdmin) {
      return new NotAuthorizedError();
    }

    const existingProgram = await Program.findById(req.params.id);

    if (!existingProgram) {
      throw new NotFoundError();
    }
    res.send(existingProgram);

  });

export { router as showProgramRouter }