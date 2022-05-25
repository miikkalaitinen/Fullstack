import express from 'express';
import { getPatients, addPatient } from '../services/patientService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getPatients());
});

router.post('/', (req, res) => {
  try {
    const entry = toNewDiaryEntry(req.body);
    const newPatient = addPatient(entry);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else res.status(400).send('Some error appeared');
  }
});

export default router;
