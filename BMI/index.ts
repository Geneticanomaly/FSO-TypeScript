import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query || isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
        return res.send({
            error: 'malformatted parameters',
        });
    }

    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);

    return res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight),
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
