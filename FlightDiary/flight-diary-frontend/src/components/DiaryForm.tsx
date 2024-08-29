import { useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../types';

type DiaryFormProps = {
    createDiary: (diary: NewDiaryEntry) => Promise<void>;
};

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
    const [formData, setFormData] = useState({
        date: '',
        visibility: '',
        weather: '',
        comment: '',
    });

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
            createDiary(newObject);
        } catch (error) {
            console.log(error);
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
