import { newPatientEntry, Patient } from '../types';
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

export default {
    addPatient,
    getPatientById,
};
