import express from 'express';
import register from '../controller/index.js';
const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({ status: 'Ok', message: 'Welcome' });
});

router.post('/api/v1/register', register);

export default router;
