import { Gender, newPatient, newEntry, HealthCheckRating } from './types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown[];
  type: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
  healthCheckRating?: unknown;
};

export const isString = (text: any): string => {
  if (typeof text === 'string') {
    return text;
  } else {
    throw Error(`Invalid parameters ${text}`);
  }
};

export const toNewPatientEntry = (object: PatientFields): newPatient => {
  const isGender = (text: any): text is Gender => {
    return Object.values(Gender).includes(text);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Invalid gender: ' + gender);
    }
    return gender;
  };

  const toNewDiaryEntry: newPatient = {
    name: isString(object.name),
    dateOfBirth: isString(object.dateOfBirth),
    ssn: isString(object.ssn),
    gender: parseGender(object.gender),
    occupation: isString(object.occupation),
    entries: [],
  };

  return toNewDiaryEntry;
};

export const toNewDiagnoseEntry = (object: EntryFields): newEntry => {
  const isValidType = (text: any): string => {
    const type = isString(text);

    if (
      type !== 'Hospital' &&
      type !== 'OccupationalHealthcare' &&
      type !== 'HealthCheck'
    ) {
      throw new Error('Invalid entry type');
    }
    return type;
  };

  const isHealthRating = (text: any): text is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(text);
  };

  const parseRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthRating(rating)) {
      throw new Error('Invalid Health Rating: ' + rating);
    }
    return rating;
  };

  switch (isValidType(object.type)) {
    case 'Hospital':
      return {
        description: isString(object.description),
        date: isString(object.date),
        specialist: isString(object.specialist),
        diagnosisCodes: object.diagnosisCodes.map((code) => isString(code)),
        type: 'Hospital',
        discharge: {
          date: isString(object.discharge?.date),
          criteria: isString(object.discharge?.criteria),
        },
      };
    case 'OccupationalHealthcare':
      return {
        description: isString(object.description),
        date: isString(object.date),
        specialist: isString(object.specialist),
        diagnosisCodes: object.diagnosisCodes.map((code) => isString(code)),
        type: 'OccupationalHealthcare',
        employerName: isString(object.employerName),
        sickLeave: {
          startDate: isString(object.sickLeave?.startDate),
          endDate: isString(object.sickLeave?.endDate),
        },
      };
    case 'HealthCheck':
      return {
        description: isString(object.description),
        date: isString(object.date),
        specialist: isString(object.specialist),
        diagnosisCodes: object.diagnosisCodes.map((code) => isString(code)),
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating),
      };
  }

  throw Error('Should not get here');
};
