import patientData from '../../data/patiens.json';
import { Patient, safePatient } from '../../types';

const patiens: Patient[] = patientData;

export const getPatients = (): safePatient[] => {
  return patiens;
};
