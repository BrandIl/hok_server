import express, { Request, Response } from 'express';
import { currentUser, requireAdminAuth, requireAuth } from '../../middlewares';
import { Project } from '../../models';
import { queryString } from '../../services/queryString';


const router = express.Router();


router.get('/api/projects/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let { sort, filter, limit, skip, start, end } = queryString(req.query);



    if (!req.currentUser!.isAdmin && !filter.organizationId) {
      filter.organizationId = { $in: req.currentUser!.organizations }
    }

    const projects = await Project.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Project.find(filter).countDocuments();

    res.setHeader('Content-Range', `projects ${start + 1}-${end + 1}/${total}`);
    res.send(projects);

  });

export { router as readProjectsRouter };

