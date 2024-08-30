import { Diagnosis, Entry } from '../types';

type EntryListProps = {
    entries: Entry[] | undefined;
    diagnoses: Diagnosis[] | undefined;
};

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
    const getCodeName = (code: string): string | undefined => {
        const diagnosis = diagnoses?.find((d) => d.code === code);
        return diagnosis ? diagnosis?.name : 'This diagnosis has no name';
    };
    return (
        <div>
            <h3>Entries</h3>
            {entries?.map((entry) => (
                <div key={entry.id}>
                    <p key={entry.id}>
                        {entry.date} {entry.description}
                    </p>
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>
                                {code} {getCodeName(code)}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default EntryList;
