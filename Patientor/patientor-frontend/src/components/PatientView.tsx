import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import diagnoseService from '../services/diagnosis';
import { Diagnosis, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryList from './EntryList';
import AddEntryForm from './EntryForm/AddEntryForm';
import { Button } from '@mui/material';
import Notification from './Notification';

const PatientView = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPatientData = async () => {
            const diagnosisData = await diagnoseService.getAll();
            setDiagnoses(diagnosisData);
            const patient = await patientService.getPatient(id);
            setPatient(patient);
        };
        fetchPatientData();
    }, [id]);

    if (!patient) {
        return <div>No such patient exists...</div>;
    }

    const handleEntryClick = () => {
        setShowEntryForm(!showEntryForm);
    };

    return (
        <div>
            <h3>
                {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
            </h3>
            <p style={{ marginBottom: 0 }}>ssh: {patient.ssn}</p>
            <p style={{ marginTop: 0 }}>occupation: {patient.occupation}</p>
            {!showEntryForm && (
                <Button variant="contained" onClick={handleEntryClick} sx={{ marginBottom: 2 }}>
                    Add entry
                </Button>
            )}
            {errorMessage && <Notification message={errorMessage} />}
            {showEntryForm && (
                <AddEntryForm
                    showEntryForm={showEntryForm}
                    setShowEntryForm={setShowEntryForm}
                    setPatient={setPatient}
                    setErrorMessage={setErrorMessage}
                    diagnoses={diagnoses}
                />
            )}
            <EntryList entries={patient.entries} diagnoses={diagnoses} />
        </div>
    );
};

export default PatientView;
