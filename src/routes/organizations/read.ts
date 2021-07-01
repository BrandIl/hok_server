
import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { currentUser, requireAuth } from '../../middlewares';
import { Organization } from '../../models/organization';
import { queryString } from '../../services/queryString';

const router = express.Router();


router.get('/api/organizations/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {

    let { sort, filter, skip, limit, start, end } = queryString(req.query);

    if (!req.currentUser!.isAdmin) {
      filter._id = { $in: req.currentUser!.organizations }
    }
    try {

      const organizations = await Organization.find(filter).sort(sort).skip(skip).limit(limit);

      const total = await Organization.find(filter).countDocuments();

      res.setHeader('Content-Range', `organizations ${start + 1}-${end + 1}/${total}`);


      res.send(organizations);
    } catch (error) {

      throw new BadRequestError(error);

    }
  });


export { router as readOrganizationsRouter };

