import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
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

    return (
        <div>
            <DiaryForm diaries={diaries} setDiaries={setDiaries} />
            <DiaryList diaries={diaries} />
        </div>
    );
}

export default App;
