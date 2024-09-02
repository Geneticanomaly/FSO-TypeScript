import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Patient, HealthCheckRating } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(code: string, diagnosisCodes: readonly string[], theme: Theme) {
    return {
        fontWeight:
            diagnosisCodes.indexOf(code) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type AddEntryFormProps = {
    showEntryForm: boolean;
    setShowEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    diagnoses: Diagnosis[];
};

const AddEntryForm = ({
    showEntryForm,
    setShowEntryForm,
    setPatient,
    setErrorMessage,
    diagnoses,
}: AddEntryFormProps) => {
    const [type, setType] = useState('');
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
        diagnosisCodes: [''],
    });

    const [sickLeaveStart, setSickLeaveStart] = React.useState<Dayjs | null>(dayjs(null));
    const [sickLeaveEnd, setSickLeaveEnd] = React.useState<Dayjs | null>(dayjs(null));
    const [dischargeStart, setDischargeStart] = React.useState<Dayjs | null>(dayjs(null));
    const [visitDate, setVisitDate] = React.useState<Dayjs | null>(dayjs(null));
    const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);

    const id = useParams().id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
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
                setErrorMessage(newEntry.error[0].message);

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
                throw new Error(JSON.stringify(newEntry.error));
            }
            setPatient((prevState) => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    entries: [...(prevState?.entries || []), newEntry],
                };
            });
        } catch (e) {
            if (e instanceof Error) {
                setShowEntryForm(!showEntryForm);
            }
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
            diagnosisCodes: [''],
        });
        setSickLeaveStart(null);
        setSickLeaveEnd(null);
        setDischargeStart(null);
        setShowEntryForm(!showEntryForm);
    };

    const theme = useTheme();

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;

        const selectedDiagnosisCodes = typeof value === 'string' ? value.split(',') : value;

        setDiagnosisCodes(selectedDiagnosisCodes);

        setFormData((prevState) => ({
            ...prevState,
            diagnosisCodes: selectedDiagnosisCodes,
        }));
    };

    return (
        <div>
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
                            <p style={{ color: 'grey' }}>Visit date</p>
                            <div style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Date"
                                            value={visitDate}
                                            onChange={(newValue) => {
                                                setVisitDate(newValue);
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    date: newValue ? newValue.toISOString() : '',
                                                }));
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <TextField
                                name="specialist"
                                id="standard-basic"
                                label="Specialist"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-chip-label">Diagnosis codes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={diagnosisCodes}
                                        onChange={handleDiagnosisChange}
                                        input={
                                            <OutlinedInput
                                                id="select-multiple-chip"
                                                label="Diagnosis codes"
                                            />
                                        }
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {diagnoses.map((diagnose) => (
                                            <MenuItem
                                                key={diagnose.code}
                                                value={diagnose.code}
                                                style={getStyles(diagnose.code, diagnosisCodes, theme)}
                                            >
                                                {diagnose.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            {type === 'HealthCheck' && (
                                <div>
                                    <FormControl required sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="health-check-rating-label">
                                            Health check rating
                                        </InputLabel>
                                        <Select
                                            labelId="health-check-rating-label"
                                            id="health-check-rating"
                                            value={formData.healthCheckRating}
                                            label="Health check rating"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    healthCheckRating: e.target.value.toString(),
                                                })
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Object.entries(HealthCheckRating)
                                                .filter(([_key, value]) => typeof value === 'number')
                                                .map(([key, value]) => (
                                                    <MenuItem key={value} value={value}>
                                                        {key}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                </div>
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
