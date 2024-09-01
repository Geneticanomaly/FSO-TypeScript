import { assertNever } from '../../helper';
import { Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalCheckEntry from './HospitalCheckEntry';
import OccupationalCheckEntry from './OccupationalCheckEntry';

type EntryDetailsProps = {
    entry: Entry;
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
    // const getCodeName = (code: string): string | undefined => {
    //     const diagnosis = diagnoses?.find((d) => d.code === code);
    //     return diagnosis ? diagnosis?.name : 'This diagnosis has no name';
    // };

    switch (entry.type) {
        case 'Hospital':
            return <HospitalCheckEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalCheckEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
