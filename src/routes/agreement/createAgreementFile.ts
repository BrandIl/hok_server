import express from 'express'
import { currentUser } from '../../middlewares';
import cors from 'cors';
import fs from 'fs';

import { isConditionalExpression } from 'typescript';
import { Organization, Program } from '../../models';
import { Agreement } from '../../services';
import fileDownload from 'js-file-download';
import { collection } from '../../services/collection';

const router = express.Router();
router.use(cors({ credentials: true }));


router.get('/api/agreement/:launchDate', async (req, res) => {
   const filename = new Date().toISOString().substr(0, 10);
   const launchDay = req.params.launchDate.substr(0, 2);

   // console.log(launchDay);
   // const organizations = await Organization.find({});
   // for (const organization of organizations) {
   //    fs.appendFileSync(`./files/${filename}.idk`, Agreement.titleRecord(organization));
   //    const programs = await Program.find({ organizationId: organization.id, launchDay: launchDay });
   //    let sumOfMoves = 0;
   //    for (const program of programs) {
   //       fs.appendFileSync(`./files/${filename}.idk`, Agreement.moveRecord(program, organization.masavData.charge.codeNosse));
   //       sumOfMoves++;
   //    }
   //    fs.appendFileSync(`./files/${filename}.idk`, Agreement.totalRecord(organization, sumOfMoves));
   // }
   // fs.appendFileSync(`./files/${filename}.idk`, Agreement.endRecord());
   const abc = collection(Number.parseInt(launchDay));
   console.log("abc:abc", abc);
   fileDownload(filename, 'filename.csv');
   res.download(`./files/${filename}.idk`);
});

export { router as createArrgFileRouter }
