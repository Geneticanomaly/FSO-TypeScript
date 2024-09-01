import { Entry } from '../../types';
import Box from '@mui/material/Box';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

type HospitalCheckEntryProps = {
    entry: Entry;
};

const HospitalCheckEntry = ({ entry }: HospitalCheckEntryProps) => {
    console.log('HOSPITALENTRY', entry);
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

export default HospitalCheckEntry;
