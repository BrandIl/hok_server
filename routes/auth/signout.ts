
import express from 'express'
import cors from 'cors';

const router =express.Router();
router.use(cors( {credentials: true}));

router.post('/api/auth/signout', (req, res)=> {
 req.session =null;
 res.send({});
});

export {router as signoutRouter}