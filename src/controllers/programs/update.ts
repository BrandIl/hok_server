import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { Program } from '../../models/program';
import { currentUser, requireAuth, validateRequest } from '../../middlewares';
import { NotAuthorizedError, NotFoundError } from '../../errors';



const router = express.Router();


router.put('/api/programs/:id',
  currentUser,
  requireAuth,
  // [
  //   body('customerName')
  //     .trim()
  //     .isLength({ min: 4, max: 50 })
  //     .withMessage('Name must be between 4 and 50 characters'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {

    if (!req.currentUser!.organizations.includes(req.params.id) && !req.currentUser!.isAdmin) {
      return new NotAuthorizedError();
    }
    const programToUpdate = await Program.findById(req.params.id);
    const { customerId, sum, startDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId } = req.body;


    if (!programToUpdate) {
      throw new NotFoundError();
    }

    try {
      await programToUpdate.set({
        customerId, sum, startDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId
      });

      await programToUpdate.save();
    } catch (error) {
      console.error(error);
    }
    res.send(programToUpdate);
  });

export { router as updateProgramRouter }