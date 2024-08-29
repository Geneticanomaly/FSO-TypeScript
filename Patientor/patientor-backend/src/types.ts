import { z } from 'zod';
import { NewPatientSchema } from './utils';

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
};

export type newPatientEntry = z.infer<typeof NewPatientSchema>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
