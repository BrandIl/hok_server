
import express from 'express'
import { Request, Response } from 'express'
import { BadRequestError } from '../../errors';
import { currentUser, requireAuth } from '../../middlewares';
import { Organization } from '../../models/organization';

const router = express.Router();


router.get('/api/organizations/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      let { sort, filter } = req.query;
      sort = sort === undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
      filter = filter === undefined ? {} : JSON.parse(req.query.filter as string) || {};
      console.log(req.query.filter);
      let organizations;
      if (req.currentUser!.isAdmin) {
        organizations = await Organization.find(filter as Object).sort(sort);
      }
      else {
        organizations = await Organization.find({ _id: { $in: req.currentUser!.organizations } }).sort(sort);
      }

      res.setHeader('Content-Range', `organizations 0-5/${organizations.length}`);

      res.send(organizations);
    } catch (error) {
      console.log(req.query.filter);

      throw new BadRequestError(error);
    }


  });

export { router as readOrganizationsRouter }