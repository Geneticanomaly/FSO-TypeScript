import { useState } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';
import Notify from './Notify';
import diaryService from '../services/diaryService';
import axios from 'axios';

type DiaryFormProps = {
    diaries: NonSensitiveDiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
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
        console.log(formData);
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
                    <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    visibility great
                    <input
                        type="radio"
                        id="great"
                        name="visibility"
                        value="great"
                        onChange={(e) => handleChange(e)}
                    />
                    good
                    <input
                        type="radio"
                        id="good"
                        name="visibility"
                        value="good"
                        onChange={(e) => handleChange(e)}
                    />
                    ok
                    <input
                        type="radio"
                        id="ok"
                        name="visibility"
                        value="ok"
                        onChange={(e) => handleChange(e)}
                    />
                    poor
                    <input
                        type="radio"
                        id="poor"
                        name="visibility"
                        value="poor"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    weather sunny
                    <input
                        type="radio"
                        id="sunny"
                        name="weather"
                        value="sunny"
                        onChange={(e) => handleChange(e)}
                    />
                    rainy
                    <input
                        type="radio"
                        id="rainy"
                        name="weather"
                        value="rainy"
                        onChange={(e) => handleChange(e)}
                    />
                    cloudy
                    <input
                        type="radio"
                        id="cloudy"
                        name="weather"
                        value="cloudy"
                        onChange={(e) => handleChange(e)}
                    />
                    stormy
                    <input
                        type="radio"
                        id="stormy"
                        name="weather"
                        value="stormy"
                        onChange={(e) => handleChange(e)}
                    />
                    windy
                    <input
                        type="radio"
                        id="windy"
                        name="weather"
                        value="windy"
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
