import express from 'express';
import {
  getPatients,
  addPatient,
  getPatientByID,
} from '../services/patientService';
import { toNewPatientEntry, isString } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  try {
    const id = isString(req.params.id);
    res.json(getPatientByID(id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else res.status(400).send('Some error appeared');
  }
});

router.get('/', (_req, res) => {
  res.json(getPatients());
});

router.post('/', (req, res) => {
  try {
    const entry = toNewPatientEntry(req.body);
    const newPatient = addPatient(entry);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else res.status(400).send('Some error appeared');
  }
});

export default router;
