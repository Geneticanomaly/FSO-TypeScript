import { Entry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';

type OccupationalCheckEntryProps = {
    entry: Entry;
};

const OccupationalCheckEntry = ({ entry }: OccupationalCheckEntryProps) => {
    console.log('OccupationalEntry', entry);
    return (
        <Box sx={{ paddingLeft: 2, border: '1px solid grey', borderRadius: '15px', marginBottom: 2 }}>
            <div>
                <p>
                    {entry.date} <WorkIcon />
                </p>
            </div>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </Box>
    );
};

export default OccupationalCheckEntry;
