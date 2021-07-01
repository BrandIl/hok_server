import express, { Request, Response } from 'express'
import { currentUser, requireAuth } from '../../middlewares';

import { Program } from '../../models';
import { queryString } from '../../services/queryString';



const router = express.Router();


router.get('/api/programs/',
  currentUser,
  requireAuth,

  async (req: Request, res: Response) => {

    let { sort, filter, skip, limit, start, end } = queryString(req.query);

    if (!req.currentUser!.isAdmin && !filter.organizationId) {
      filter.organizationId = { $in: req.currentUser!.organizations }
    }

    const programs = await Program.find(filter as object).sort(sort as object).skip(skip).limit(limit);


    const total = await Program.find(filter as object).sort(sort as object).countDocuments();

    res.setHeader('Content-Range', `programs ${start + 1}-${end + 1}/${total}`);

    res.send(programs);

  });

export { router as readProgramsRouter }