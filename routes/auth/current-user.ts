import express from 'express'
import { currentUser } from '@hok/common';
import cors from 'cors';

const router = express.Router();
router.use(cors({ credentials: true }));


router.get('/api/auth/currentuser',
   currentUser,
   (req, res) => {
      console.log(req.currentUser);
      res.send({ currentUser: req.currentUser || null });
   });

export { router as currentUserRouter }