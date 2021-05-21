import express, { Request, Response } from 'express'

import { currentUser, requireAdminAuth } from '@hok/common';
import { Project } from '../../models/project';

import cors from 'cors';


const router = express.Router();
router.use(cors());

router.get('/api/projects/',

  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);

    const projects = await Project.find(filter as object).sort(sort as object).populate('organizationId');


    res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
    res.setHeader('Content-Range', 'projects 0-5/5');
    res.send(projects);

  });

export { router as readProjectsRouter }