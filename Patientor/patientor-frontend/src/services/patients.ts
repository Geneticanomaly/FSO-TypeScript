import axios from 'axios';
import { EntryFormData, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';
import { convertDate } from '../helper';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

    return data;
};

const getPatient = async (id: string | undefined) => {
    const res = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return res.data;
};

const addEntry = async (id: string | undefined, type: string, formData: EntryFormData) => {
    console.log('FORMDATA', formData);

    const entryData = {
        type,
        description: formData.description,
        date: formData.date,
        specialist: formData.specialist,
        diagnosisCodes: formData.diagnosisCodes.split(',').map((code) => code.trim()),

        ...(type === 'HealthCheck' &&
            formData.healthCheckRating && {
                healthCheckRating: Number(formData.healthCheckRating),
            }),

        ...(type === 'OccupationalHealthcare' && {
            employerName: formData.employerName,
            sickLeave:
                formData.sickLeaveStartDate || formData.sickLeaveEndDate
                    ? {
                          startDate: convertDate(formData.sickLeaveStartDate),
                          endDate: convertDate(formData.sickLeaveEndDate),
                      }
                    : undefined,
        }),

        ...(type === 'Hospital' && {
            discharge:
                formData.dischargeDate || formData.dischargeCriteria
                    ? {
                          date: convertDate(formData.dischargeDate),
                          criteria: formData.dischargeCriteria,
                      }
                    : undefined,
        }),
    };

    const res = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, entryData);
    return res.data;
};

export default {
    getAll,
    create,
    getPatient,
    addEntry,
};
