import { z } from 'zod';
import { NewPatientSchema } from './utils';

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry = {};

export type Patient = {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = z.infer<typeof NewPatientSchema>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
