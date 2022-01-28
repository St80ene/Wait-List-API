import express from 'express';
import register from '../controller/index.js';
import registerValidation from '../middleware/index.js';
const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({ status: 'Ok', message: 'Welcome' });
});

router.post('/api/v1/register', registerValidation, register);

export default router;
