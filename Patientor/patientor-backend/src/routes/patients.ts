import express, { Request, Response, NextFunction } from 'express';
import patientData from '../../data/patients';
import { newPatientEntry, Patient } from '../types';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientData);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post(
    '/',
    newPatientParser,
    (req: Request<unknown, unknown, newPatientEntry>, res: Response<Patient>) => {
        const addedPatient: Patient = patientService.addPatient(req.body);
        res.json(addedPatient);
    }
);

router.get('/:id', (req: Request, res: Response) => {
    const patient = patientService.getPatientById(req.params.id);

    if (!patient) {
        res.status(404);
    }

    res.json(patient);
});

router.use(errorMiddleware);

export default router;
