import { Entry } from '../types';

type EntryListProps = {
    entries: Entry[] | undefined;
};

const EntryList = ({ entries }: EntryListProps) => {
    return (
        <div>
            <h3>Entries</h3>
            {entries?.map((entry) => (
                <div key={entry.id}>
                    <p key={entry.id}>
                        {entry.date} {entry.description}
                    </p>
                    <ul>
                        {entry.diagnosisCodes?.map((code, i) => (
                            <li key={i}>{code}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default EntryList;
