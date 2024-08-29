import { useState } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';
import Notify from './Notify';
import diaryService from '../services/diaryService';
import axios from 'axios';

type DiaryFormProps = {
    diaries: NonSensitiveDiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
    // createDiary: (diary: NewDiaryEntry) => Promise<void>;
    // notification: string | null;
};

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
    const [formData, setFormData] = useState({
        date: '',
        visibility: '',
        weather: '',
        comment: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newObject: NewDiaryEntry = {
                date: formData.date,
                visibility: formData.visibility as Visibility,
                weather: formData.weather as Weather,
                comment: formData.comment,
            };
            const newDiary = await diaryService.create(newObject);
            if (newDiary.error) {
                setError(newDiary.error[0].message);
                setTimeout(() => {
                    setError(null);
                }, 5000);
                throw new Error(newDiary.error[0].message);
            }
            setDiaries(diaries.concat(newDiary));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.log('ERROR', e.status);
            } else {
                console.log('Unknown error', e);
            }
        }

        setFormData({
            date: '',
            visibility: '',
            weather: '',
            comment: '',
        });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error && <Notify message={error} />}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    date
                    <input type="text" name="date" value={formData.date} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    visibility
                    <input
                        type="text"
                        name="visibility"
                        value={formData.visibility}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    weather
                    <input
                        type="text"
                        name="weather"
                        value={formData.weather}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    comment
                    <input
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button>add</button>
            </form>
        </div>
    );
};

export default DiaryForm;
