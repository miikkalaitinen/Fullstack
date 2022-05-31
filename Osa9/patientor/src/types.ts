export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface NewHospitalEntry extends Omit<BaseEntry, 'id'> {
  type: 'Hospital';
  disdate: string;
  discriteria: string;
}

export interface NewHealthCheckEntry extends Omit<BaseEntry, 'id'> {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface NewOccupationalHealthcareEntry extends Omit<BaseEntry, 'id'> {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickstartDate?: string;
  sickendDate: string;
}

export interface someEntry extends Omit<BaseEntry, 'id'> {
  type: '';
  employerName: string;
  sickstartDate: string;
  sickendDate: string;
  healthCheckRating: HealthCheckRating;
  disdate: string;
  discriteria: string;
}

export type NewEntry =
  | NewHealthCheckEntry
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | someEntry;

export type Entry = HealthCheckEntry | OccupationalHealthcare | HospitalEntry;

export type EntryProp = { entry: Entry };

export type DiagnosisProp = { code: string };
