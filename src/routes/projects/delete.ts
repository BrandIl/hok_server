import express, { Request, Response } from 'express';
import { BadRequestError, NotAuthorizedError } from '../../errors';
import { currentUser, requireAuth } from '../../middlewares';
import { Program, Project } from '../../models';

const router = express.Router();
router.delete('/api/projects/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const projectToDelete = await Project.findById(req.params.id);
      if (!req.currentUser!.organizations.includes(projectToDelete.organizationId) && !req.currentUser!.isAdmin) {
        throw new NotAuthorizedError();
      }
      await Project.findByIdAndDelete(req.params.id);
      const programs =
        await Program.deleteMany({ organizationId: req.params.id });

      res.status(204).send({
        "project was deleted": projectToDelete,
        "with the programs associated with it": programs,
      });
    } catch (error) {
      throw new BadRequestError(error);
    }
  });

export { router as deleteProjectRouter };

