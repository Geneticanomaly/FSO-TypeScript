import { assertNever } from '../../helper';
import { Diagnosis, Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalCheckEntry from './HospitalCheckEntry';
import OccupationalCheckEntry from './OccupationalCheckEntry';

type EntryDetailsProps = {
    entry: Entry;
    diagnoses: Diagnosis[];
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
    const getCodeName = (code: string): string | undefined => {
        const diagnosis = diagnoses?.find((d) => d.code === code);
        return diagnosis ? diagnosis?.name : 'This diagnosis has no name';
    };

    switch (entry.type) {
        case 'Hospital':
            return <HospitalCheckEntry entry={entry} getCodeName={getCodeName} />;
        case 'OccupationalHealthcare':
            return <OccupationalCheckEntry entry={entry} getCodeName={getCodeName} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} getCodeName={getCodeName} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
