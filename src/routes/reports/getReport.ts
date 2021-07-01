import express, { Request, Response } from 'express';
import { currentUser, requireAdminAuth, requireAuth } from '../../middlewares';
import { Project } from '../../models';
import { getReportFile } from '../../services/getReportFileService';
import { queryString } from '../../services/queryString';
import stream from 'stream';


const router = express.Router();


router.get('/api/reports',
  // currentUser,
  // requireAdminAuth,
  async (req: Request, res: Response) => {
    let { sort, filter } = queryString(req.query), { date } = req.query;


    // if (!req.currentUser!.isAdmin && !filter.organizationId) {
    //   filter.organizationId = { $in: req.currentUser!.organizations }
    // }


    const report = await getReportFile(req.query, date)

    res.set('Content-disposition', 'attachment; filename=' + `reportFile.pdf`);
    res.set('Content-type: application/pdf');

    res.send(report.content);


  });

export { router as getPdfReportRouter };

