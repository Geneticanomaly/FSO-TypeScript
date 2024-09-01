import { EntryWithoutId, newPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

const patients: Patient[] = patientData;

const addPatient = (entry: newPatientEntry) => {
    const newPatient = {
        id: uuid(),
        ...entry,
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find((patient) => patient.id === id);
    return patient;
};

const addEntry = (id: string, entry: EntryWithoutId) => {
    const newEntry = {
        id: uuid(),
        ...entry,
    };
    const patient = patients.find((patient) => patient.id === id);
    patient?.entries?.push(newEntry);

    return newEntry;
};

export default {
    addPatient,
    getPatientById,
    addEntry,
};
