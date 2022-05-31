import patientData from '../../data/patiens';
import { Patient, safePatient, newPatient, newEntry } from '../types';
import { v1 as uuid } from 'uuid';

let patients: Patient[] = patientData;

export const getPatients = (): safePatient[] => {
  return patients.map(({ ssn, ...rest }) => ({
    ...rest,
  }));
};

export const getPatientByID = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) return patient;
  else throw Error(`No patient with an id ${id}`);
};

export const addPatient = (patient: newPatient): Patient => {
  const patientToAdd = { ...patient, id: uuid() };
  patients.push(patientToAdd);

  return patientToAdd;
};

export const addEntry = (id: string, entry: newEntry): Patient => {
  patients = patients.map((patient) =>
    patient.id === id
      ? { ...patient, entries: [...patient.entries, { ...entry, id: uuid() }] }
      : patient
  );
  const newPatient = patients.find((p) => p.id === id);
  if (!newPatient) throw new Error('No such patient');
  else return newPatient;
};
