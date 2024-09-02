import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Box from '@mui/material/Box';
import { Entry } from '../../types';

type HealthCheckEntryProps = {
    entry: Entry;
    getCodeName: (code: string) => string | undefined;
};

const HealthCheckEntry = ({ entry, getCodeName }: HealthCheckEntryProps) => {
    return (
        <Box sx={{ paddingLeft: 2, border: '1px solid grey', borderRadius: '15px', marginBottom: 2 }}>
            <div>
                <p>
                    {entry.date} <MedicalServicesIcon />
                </p>
                <p>{entry.description}</p>
                <p>diagnose by {entry.specialist}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code) => (
                        <li key={code}>
                            {code} {getCodeName(code)}
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
};

export default HealthCheckEntry;
