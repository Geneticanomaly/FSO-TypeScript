import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);

    if (!req.query || isNaN(Number(weight)) || isNaN(Number(height))) {
        return res.status(400).send({
            error: 'malformatted parameters',
        });
    }

    return res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight),
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    const allNumbers = daily_exercises.map(Number).every((exercise: number) => !isNaN(exercise));
    if (!allNumbers || isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(daily_exercises, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
