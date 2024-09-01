import { Entry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Box from '@mui/material/Box';

type HealthCheckEntryProps = {
    entry: Entry;
};

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
    console.log('HealthEntry', entry);
    return (
        <Box sx={{ paddingLeft: 2, border: '1px solid grey', borderRadius: '15px', marginBottom: 2 }}>
            <div>
                <p>
                    {entry.date} <MedicalServicesIcon />
                </p>
                <p>{entry.description}</p>
                <p>diagnose by {entry.specialist}</p>
            </div>
        </Box>
    );
};

export default HealthCheckEntry;
