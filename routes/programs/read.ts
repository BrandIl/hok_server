import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '@hok/common';
import { Program } from '../../models/program';
import cors from 'cors';


const router = express.Router();
router.use(cors());

router.get('/api/programs/',

  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);

    const programs = await Program.find(filter as object).populate('organizationId').populate('projectId').populate('customerId').sort(sort as object);

    res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
    res.setHeader('Content-Range', 'users 0-5/5');
    res.send(programs);

  });

export { router as readProgramsRouter }