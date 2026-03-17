import axios from 'axios';
import api from '../api';

const PublicAPI = axios.create({
    baseURL: `${api.defaults.baseURL}/public`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add error handling interceptor (no auth for public API)
PublicAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export { PublicAPI };
