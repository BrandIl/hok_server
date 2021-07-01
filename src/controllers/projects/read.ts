import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '../../middlewares';
import { Project } from '../../models';




const router = express.Router();


router.get('/api/projects/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {

    let { sort, filter } = req.query;
    sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
    filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);


    const projects = await Project
      .find(filter as Object)
      .sort(sort as object);

    res.setHeader('Content-Range', `projects 0-5/${projects.length}`);
    res.send(projects);

  });

export { router as readProjectsRouter };
