import express, { Request, Response } from 'express';
import mongo from 'mongodb';
import { BadRequestError } from '../../errors';
import { currentUser, requireAdminAuth } from '../../middlewares';
import { Customer, Organization, Program, Project } from '../../models';

const router = express.Router();


router.delete('/api/organizations',
    currentUser,
    requireAdminAuth,
    async (req: Request, res: Response) => {
        debugger;
        try {
            const ids = JSON.parse(req.query.filter as string).id;
            const organizationToDelete =
                await Organization.deleteMany({ "_id": { $in: ids } });

            const customers =
                await Customer.deleteMany({ "organizationId": { $in: ids } });

            const programs =
                await Program.deleteMany({ "organizationId": { $in: ids } });

            const projects =
                await Project.deleteMany({ "organizationId": { $in: ids } });

            res.status(204).send({});
        } catch (error) {
            throw new BadRequestError(error);
        }
    });

export { router as deleteManyOrganizationRouter };
