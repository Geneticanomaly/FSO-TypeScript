export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type BaseEntry = {
    id: string;
    description: string;
    date: string;
    specialist: string;
    type: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
};

export type OccupationalHealthcareEntry = BaseEntry & {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
};

export type HospitalEntry = BaseEntry & {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
};

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export type HealthCheckEntry = BaseEntry & {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
};

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
