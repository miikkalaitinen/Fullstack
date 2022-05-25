import patientData from '../../data/patiens.json';
import { Patient, safePatient, newPatient } from '../../types';
import { v1 as uuid } from 'uuid';

let patiens: Patient[] = patientData;

export const getPatients = (): safePatient[] => {
  return patiens.map(({ ssn, ...rest }) => ({
    ...rest,
  }));
};

export const addPatient = (patient: newPatient): Patient => {
  const patientToAdd = { ...patient, id: uuid() };
  patiens.push(patientToAdd);

  return patientToAdd;
};
