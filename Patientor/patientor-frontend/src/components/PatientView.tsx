import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import diagnoseService from '../services/diagnosis';
import { Diagnosis, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryList from './EntryList';

const PatientView = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

    return (
        <div>
            <h3>
                {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
            </h3>
            <p style={{ marginBottom: 0 }}>ssh: {patient.ssn}</p>
            <p style={{ marginTop: 0 }}>occupation: {patient.occupation}</p>
            <EntryList entries={patient.entries} diagnoses={diagnoses} />
        </div>
    );
};

export default PatientView;
