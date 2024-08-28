import express from 'express';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientData);
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, occupation, gender, dateOfBirth } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id: string = uuid();

    const patient: Patient = {
        id: id,
        name: name as string,
        occupation: occupation as string,
        gender: gender as string,
        dateOfBirth: dateOfBirth as string,
    };
    return res.status(200).json(patient);
});

export default router;
