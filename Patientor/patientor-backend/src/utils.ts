import { EntryWithoutId, Gender, HealthCheckRating, newPatientEntry } from './types';
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

export const HealthCheckEntrySchema = z.object({
    type: z.literal('HealthCheck'),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const HospitalEntrySchema = z.object({
    type: z.literal('Hospital'),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    }),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const OccupationalHealthcareEntrySchema = z.object({
    type: z.literal('OccupationalHealthcare'),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    employerName: z.string(),
    sickLeave: z
        .object({
            startDate: z.string().date(),
            endDate: z.string().date(),
        })
        .optional(),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const NewEntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);

export const toNewEntry = (object: unknown): EntryWithoutId => {
    return NewEntrySchema.parse(object);
};
