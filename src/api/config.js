import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sbd-sbd9-kharisma.ztg0mm.easypanel.host',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;