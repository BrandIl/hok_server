

import express from 'express'
import { Request, Response } from 'express'
import { currentUser, requireAdminAuth, requireAuth } from '../../../hok_common/src/index';
import { Organization } from '../../models/organization';
import cors from 'cors';


const router = express.Router();


router.get('/api/organizations/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);

    const organizations = await Organization.find(filter as object).sort(sort);

    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', 'organizations 0-5/5');

    res.send(organizations);

  });

export { router as readOrganizationsRouter }