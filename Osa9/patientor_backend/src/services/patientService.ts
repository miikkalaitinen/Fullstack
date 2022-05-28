import patientData from '../../data/patiens';
import { Patient, safePatient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';

let patiens: Patient[] = patientData;

export const getPatients = (): safePatient[] => {
  return patiens.map(({ ssn, ...rest }) => ({
    ...rest,
  }));
};

export const getPatientByID = (id: string): Patient => {
  const patient = patiens.find((patient) => patient.id === id);
  if (patient) return patient;
  else throw Error(`No patient with an id ${id}`);
};

export const addPatient = (patient: newPatient): Patient => {
  const patientToAdd = { ...patient, id: uuid() };
  patiens.push(patientToAdd);

  return patientToAdd;
};
