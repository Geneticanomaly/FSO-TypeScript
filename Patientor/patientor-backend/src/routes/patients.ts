import express, { Request, Response, NextFunction } from 'express';
import patientData from '../../data/patients';
import { Diagnosis, Entry, EntryWithoutId, newPatientEntry, Patient } from '../types';
import patientService from '../services/patientService';
import { NewEntrySchema, NewPatientSchema } from '../utils';
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

router.post(
    '/:id/entries',
    newEntryParser,
    (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
        const diagnosisCodes = parseDiagnosisCodes(req.body);
        const newEntry = patientService.addEntry(req.params.id, { ...req.body, diagnosisCodes });
        return res.json(newEntry);
    }
);

router.use(errorMiddleware);

export default router;
