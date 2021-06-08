
import express from 'express'
import cors from 'cors';

const router = express.Router();
router.use(cors({ credentials: true }));

router.post('/api/auth/signout', (req, res) => {
    req.headers.authorization = undefined;
    res.send({});
});

export { router as signoutRouter }