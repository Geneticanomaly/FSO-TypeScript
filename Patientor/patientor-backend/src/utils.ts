import { Gender, newPatientEntry } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
    ssn: z.string().optional(),
    dateOfBirth: z.string().date().optional(),
    entries: z.array(z.any()).optional(),
});

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
    return NewPatientSchema.parse(object);
};
