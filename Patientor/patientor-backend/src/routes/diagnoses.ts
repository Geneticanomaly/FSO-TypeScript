import express from 'express';
import diagnosisData from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(diagnosisData);
});

export default router;
