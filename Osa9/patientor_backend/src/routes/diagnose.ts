import express from 'express';
import { getDiagnoses } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.json(getDiagnoses());
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else res.status(400).send('Some error appeared');
  }
});

export default router;
