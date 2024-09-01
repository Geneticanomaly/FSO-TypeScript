import { Entry } from '../types';
import EntryDetails from './EntryDetails/EntryDetails';

type EntryListProps = {
    entries: Entry[] | undefined;
};

const EntryList = ({ entries }: EntryListProps) => {
    if (!entries) return <div>Loading...</div>;

    return (
        <div>
            <h3>Entries</h3>
            {entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
        </div>
    );
};

export default EntryList;
