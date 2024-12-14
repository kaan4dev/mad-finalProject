import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://yemeksepeti.emeksoft.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;