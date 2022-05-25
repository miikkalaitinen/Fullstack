import { Gender, newPatient } from '../types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewDiaryEntry = (object: Fields): newPatient => {
  const isString = (text: any): string => {
    if (typeof text === 'string') {
      return text;
    } else {
      throw Error('Invalid parameters');
    }
  };

  const isGender = (text: any): text is Gender => {
    return Object.values(Gender).includes(text);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
  };

  const toNewDiaryEntry: newPatient = {
    name: isString(object.name),
    dateOfBirth: isString(object.dateOfBirth),
    ssn: isString(object.ssn),
    gender: parseGender(object.gender),
    occupation: isString(object.occupation),
  };

  return toNewDiaryEntry;
};
