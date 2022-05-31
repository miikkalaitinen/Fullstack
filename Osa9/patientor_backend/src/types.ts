export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

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

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcare extends BaseEntry {
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

export type safePatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatient = Omit<Patient, 'id'>;

export type Entry = HealthCheckEntry | OccupationalHealthcare | HospitalEntry;

export type newEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcare, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
