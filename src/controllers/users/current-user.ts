import express from 'express'
import { currentUser } from '../../middlewares';
import cors from 'cors';

const router = express.Router();
router.use(cors({ credentials: true }));


router.get('/api/auth/currentuser',
   currentUser,
   (req, res) => {
      res.send({ currentUser: req.currentUser || null });
   });

export { router as currentUserRouter }