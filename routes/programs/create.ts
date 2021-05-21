import express, { Request, Response } from 'express'
import {
  requireAdminAuth,
  validateRequest,
  currentUser
} from '@hok/common';
import { body } from 'express-validator';
import axios from 'axios';
import { Program } from '../../models/program';
import cors from 'cors';



const router = express.Router();
router.use(cors());

router.post('/api/programs/',

  // [
  //   body('customerName')
  //     .trim()
  //     .isLength({ min: 4, max: 50 })
  //     .withMessage('Name must be between 4 and 50 characters'),
  // ],
  validateRequest,

  async (req: Request, res: Response) => {


    const { customerId, sum, startDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId } = req.body;
    // await axios.get(`http://${process.env.BASE_URL}:${process.env.PORT}/api/users/id?=${userId}`)

    console.log(req.body);
    const program = Program.build({ sum, startDate, numOfPayments, launchDay, paymentMethod, organizationId, projectId, customerId });
    console.log(program);

    await program.save();

    res.status(201).send(program);

  }
);

export { router as createProgramRouter }
