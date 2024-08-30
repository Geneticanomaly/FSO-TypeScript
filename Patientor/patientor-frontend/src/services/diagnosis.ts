const baseUrl = 'http://localhost:3001/api/diagnoses';
import axios from 'axios';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

export default { getAll };
