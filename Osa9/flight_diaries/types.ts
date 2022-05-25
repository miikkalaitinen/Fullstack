export type Diagnose = {
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
};

export type safePatient = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
