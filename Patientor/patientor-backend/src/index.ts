import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('Pong!');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`application is running on port ${PORT}`);
});
