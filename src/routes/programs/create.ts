import express, { Request, Response } from 'express'
import { NotAuthorizedError } from '../../errors';
import {
  currentUser,
  requireAuth,
  validateRequest
} from '../../middlewares';
import { Program } from '../../models';



const router = express.Router();


router.post('/api/programs/',
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

    const { customerId, sum, startDate, endDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId } = req.body;


    const program = Program.build({ sum, startDate, endDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId, customerId });


    await program.save();
    console.log(program);

    res.status(201).send(program);

  }
);

export { router as createProgramRouter }
