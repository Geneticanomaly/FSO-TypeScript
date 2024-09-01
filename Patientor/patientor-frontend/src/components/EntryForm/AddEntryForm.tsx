import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import Notification from '../Notification';
import { Patient } from '../../types';

type AddEntryFormProps = {
    showEntryForm: boolean;
    setShowEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
};

const AddEntryForm = ({ showEntryForm, setShowEntryForm, setPatient }: AddEntryFormProps) => {
    const [type, setType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: '',
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
        dischargeDate: '',
        dischargeCriteria: '',
        diagnosisCodes: '',
    });

    const [sickLeaveStart, setSickLeaveStart] = React.useState<Dayjs | null>(dayjs(null));
    const [sickLeaveEnd, setSickLeaveEnd] = React.useState<Dayjs | null>(dayjs(null));
    const [dischargeStart, setDischargeStart] = React.useState<Dayjs | null>(dayjs(null));

    const id = useParams().id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(formData);
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    useEffect(() => {
        setSickLeaveStart(null);
        setSickLeaveEnd(null);
        setDischargeStart(null);
        setFormData((prevState) => ({
            ...prevState,
            sickLeaveStartDate: '',
        }));
        setFormData((prevState) => ({
            ...prevState,
            sickLeaveEndDate: '',
        }));
        setFormData((prevState) => ({
            ...prevState,
            dischargeDate: '',
        }));
    }, [type]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newEntry = await patientService.addEntry(id, type, formData);
            if (newEntry.error) {
                console.log(newEntry.error);
                setErrorMessage(newEntry.error[0].message);

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
                throw new Error(newEntry.error);
            }
            setPatient((prevState) => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    entries: [...(prevState?.entries || []), newEntry],
                };
            });
        } catch (e) {
            console.log(e);
        }

        setType('');
        setFormData({
            description: '',
            date: '',
            specialist: '',
            healthCheckRating: '',
            employerName: '',
            sickLeaveStartDate: '',
            sickLeaveEndDate: '',
            dischargeDate: '',
            dischargeCriteria: '',
            diagnosisCodes: '',
        });
        setSickLeaveStart(null);
        setSickLeaveEnd(null);
        setDischargeStart(null);
    };

    return (
        <div>
            {errorMessage && <Notification message={errorMessage} />}
            <Box
                sx={{
                    padding: 2,
                    border: '1px solid grey',
                    borderRadius: '15px',
                    marginBottom: 2,
                }}
            >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={type}
                            label="Type *"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="HealthCheck">Health check</MenuItem>
                            <MenuItem value="Hospital">Hospital check</MenuItem>
                            <MenuItem value="OccupationalHealthcare">Occupational check</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                    {type !== '' && (
                        <div>
                            <TextField
                                name="description"
                                id="standard-basic"
                                label="Description"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="date"
                                id="standard-basic"
                                label="Date"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="specialist"
                                id="standard-basic"
                                label="Specialist"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="diagnosisCodes"
                                id="standard-basic"
                                label="Diagnosis codes"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />
                            {type === 'HealthCheck' && (
                                <TextField
                                    name="healthCheckRating"
                                    id="standard-basic"
                                    label="Healthcheck rating"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2 }}
                                />
                            )}
                            {type === 'Hospital' && (
                                <>
                                    <p style={{ color: 'grey' }}>Discharge</p>
                                    <div style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DatePicker']}
                                                sx={{ marginBottom: 2 }}
                                            >
                                                <DatePicker
                                                    label="Start date"
                                                    value={dischargeStart}
                                                    onChange={(newValue) => {
                                                        setDischargeStart(newValue);
                                                        setFormData((prevState) => ({
                                                            ...prevState,
                                                            dischargeDate: newValue
                                                                ? newValue.toISOString()
                                                                : '',
                                                        }));
                                                    }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <TextField
                                            name="dischargeCriteria"
                                            id="standard-basic"
                                            label="Discharge criteria"
                                            variant="standard"
                                            fullWidth
                                            onChange={handleChange}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </div>
                                </>
                            )}
                            {type === 'OccupationalHealthcare' && (
                                <>
                                    <TextField
                                        name="employerName"
                                        id="standard-basic"
                                        label="Employer name"
                                        variant="standard"
                                        fullWidth
                                        onChange={handleChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <p style={{ color: 'grey' }}>Sick Leave</p>
                                    <div style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                <DatePicker
                                                    label="Start date"
                                                    value={sickLeaveStart}
                                                    onChange={(newValue) => {
                                                        setSickLeaveStart(newValue);
                                                        setFormData((prevState) => ({
                                                            ...prevState,
                                                            sickLeaveStartDate: newValue
                                                                ? newValue.toISOString()
                                                                : '',
                                                        }));
                                                    }}
                                                />
                                                <DatePicker
                                                    label="End date"
                                                    value={sickLeaveEnd}
                                                    onChange={(newValue) => {
                                                        setSickLeaveEnd(newValue);
                                                        setFormData((prevState) => ({
                                                            ...prevState,
                                                            sickLeaveEndDate: newValue
                                                                ? newValue.toISOString()
                                                                : '',
                                                        }));
                                                    }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="error"
                                    onClick={() => setShowEntryForm(!showEntryForm)}
                                >
                                    Cancel
                                </Button>
                                <Button variant={'contained'} size="medium" type="submit">
                                    Add
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </Box>
        </div>
    );
};

export default AddEntryForm;
