import { useState, useEffect } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiaries = async () => {
            const data = await diaryService.getAll();
            setDiaries(data);
        };
        fetchDiaries();
    }, []);

    const createDiary = async (diary: NewDiaryEntry) => {
        const newDiary = await diaryService.create(diary);
        setDiaries([...diaries, newDiary]);
    };

    return (
        <div>
            <DiaryForm createDiary={createDiary} />
            <DiaryList diaries={diaries} />
        </div>
    );
}

export default App;
