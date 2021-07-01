import cors from 'cors';
import express, { Request, Response } from 'express';
import { body, ValidationError } from 'express-validator';
import { Organization } from '../../models';
import { currentUser, requireAuth, validateRequest } from '../../middlewares';
import { BadRequestError, NotAuthorizedError, NotFoundError, RequestValidationError } from '../../errors';
import { ValidationHalt } from 'express-validator/src/base';

const router = express.Router();
router.put('/api/organizations/:id',
  currentUser,
  requireAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must be between 4 and 50 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const organizationToUpdate = await Organization.findById(req.params.id);

    if (!organizationToUpdate) {
      throw new NotFoundError();
    }


    if (!req.currentUser!.organizations.includes(organizationToUpdate.id) && !req.currentUser!.isAdmin) {
      throw new NotAuthorizedError();
    }
    debugger;
    const { name, communication, masavData, paymentAgreement } = req.body;
    const isExists = await Organization.findOne({ name, _id: { $ne: req.params.id } });
    if (isExists)
      throw new RequestValidationError([{
        param: '_error',
        msg: "Organization with this name is already exists You have to use in a uniqe name",
        nestedErrors: [],
      }]);

    try {
      await organizationToUpdate.set({
        name, communication, masavData, paymentAgreement
      });

      await organizationToUpdate.save();
    } catch (error) {
      console.error(error);
    }
    ;
    res.send(organizationToUpdate);
  });

export { router as updateOrganizationRouter };
