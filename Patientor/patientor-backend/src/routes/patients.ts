import express from 'express';
import patientData from '../../data/patients';
import { Patient } from '../types';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientData);
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient: Patient = patientService.addPatient(newPatientEntry);

        return res.status(200).json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

export default router;
