import express from 'express'
import { currentUser } from '../../middlewares';
import cors from 'cors';
import fs from 'fs';

import { isConditionalExpression } from 'typescript';
import { Organization, Program } from '../../models';
import { Agreement } from '../../services';
import { collection } from '../../services/collection';

const router = express.Router();
router.use(cors({ credentials: true }));


router.get('/api/agreement/:launchDate', async (req, res) => {
   const file = fs.createWriteStream("file.jpg");
   const filename = new Date().toISOString().substr(0, 10);
   const launchDay = req.params.launchDate.substr(0, 2);

   const organizations = await Organization.find({});
   fs.appendFileSync(`./files/${filename}.idk`, Agreement.end1Record());
   for (const organization of organizations) {
      fs.appendFileSync(`./files/${filename}.idk`, Agreement.titleRecord(organization));
      const programs = await Program.find({ organizationId: organization.id, launchDay: launchDay });
      let sumOfMoves = 0, sumOfPayments = 0;
      for (const program of programs) {
         fs.appendFileSync(`./files/${filename}.idk`, Agreement.moveRecord(program, organization));
         sumOfMoves++;
         sumOfPayments += program.sum;
      }
      fs.appendFileSync(`./files/${filename}.idk`, Agreement.totalRecord(organization, sumOfMoves, sumOfPayments));
   }
   fs.appendFileSync(`./files/${filename}.idk`, Agreement.endRecord());

   collection(15);
   //file.pipe(res);
});

export { router as createArrgFileRouter }
