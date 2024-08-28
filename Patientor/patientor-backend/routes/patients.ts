import express from 'express';
import patientData from '../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientData);
});

export default router;
