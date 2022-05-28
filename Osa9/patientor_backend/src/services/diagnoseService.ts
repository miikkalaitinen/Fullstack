import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData;

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
