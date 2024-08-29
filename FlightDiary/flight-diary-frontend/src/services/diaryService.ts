import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

export default { getAll };
