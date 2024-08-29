import { Visibility, Weather } from '../types';

type Diary = {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
};

type DiaryListProps = {
    diaries: Diary[];
};

const DiaryList = ({ diaries }: DiaryListProps) => {
    return (
        <div>
            <h3>Diary entries</h3>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <b>{diary.date}</b>
                    <p style={{ marginBottom: 0 }}>visibility: {diary.visibility}</p>
                    <p style={{ marginTop: 0 }}>weather: {diary.weather}</p>
                </div>
            ))}
        </div>
    );
};

export default DiaryList;
