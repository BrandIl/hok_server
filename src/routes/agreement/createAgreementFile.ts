import express from 'express'
import { currentUser } from '../../middlewares';
import cors from 'cors';
import fs from 'fs';

import { isConditionalExpression } from 'typescript';
import { Organization, Program } from '../../models';
import { Agreement } from '../../services';
import { collection } from '../../services/collection';
import { collectionFile } from '../../services/collectionFile';
import { sendCollectionFile } from '../../services/sendCollectionFileByMail';

const router = express.Router();
router.use(cors({ credentials: true }));



router.get('/api/agreement/:launchDate', async (req, res) => {
   const date = new Date(req.params.launchDate);
   const file = await collectionFile((new Date(req.params.launchDate)));
   const filename = (date).toISOString().substr(0, 10);


   await sendCollectionFile(date);
   await collection(date);


   res.set('Content-disposition', 'attachment; filename=' + `${filename}.txt`);
   res.set('Content-type: application/txt');

   res.send(file.content);
});

export { router as createArrgFileRouter }
