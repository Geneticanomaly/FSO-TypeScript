import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails/EntryDetails';

type EntryListProps = {
    entries: Entry[] | undefined;
    diagnoses: Diagnosis[];
};

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
    if (!entries) return <div>No previous entries</div>;

    return (
        <div>
            <h3>Entries</h3>
            {entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
    );
};

export default EntryList;
