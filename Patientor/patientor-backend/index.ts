import express from 'express';
import cors from 'cors';
import { Diagnosis } from './types';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('Pong!');
});

app.get('/api/diagnoses', (_req, res) => {
    const diagnoses: Diagnosis[] = [
        {
            code: 'something',
            name: 'testname',
            latin: 'latin',
        },
        { code: 'what', name: 'testWhat' },
    ];
    res.json(diagnoses);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`application is running on port ${PORT}`);
});
