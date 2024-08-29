import axios from 'axios';
import { NewDiaryEntry } from '../types';
const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const create = async (diary: NewDiaryEntry) => {
    console.log('MYDIARY', diary);
    const res = await axios.post(baseUrl, diary);
    return res.data;
};

export default { getAll, create };
