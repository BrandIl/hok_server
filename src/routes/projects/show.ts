import express, { Request, Response } from 'express'

import { requireAdminAuth } from '../../middlewares';
import { NotFoundError } from '../../errors';

import { Project } from '../../models';

import cors from 'cors';


const router = express.Router();


router.get('/api/projects/:id',


  async (req: Request, res: Response) => {

    const existingProject = await Project.findById(req.params.id);

    if (!existingProject) {
      throw new NotFoundError();
    }

    console.log(existingProject);

    res.setHeader('Content-Range', 'users 0-5/5');
    res.send(existingProject);

  });

export { router as showProjectRouter }