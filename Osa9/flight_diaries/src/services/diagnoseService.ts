import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../../types';

const diagnoses: Diagnose[] = diagnoseData;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
