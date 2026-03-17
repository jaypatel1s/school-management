import axios from 'axios';
import api from '../api';

const TeacherAPI = axios.create({
    baseURL: `${api.defaults.baseURL}/teachers`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token interceptor
TeacherAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add error handling interceptor
TeacherAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export { TeacherAPI };
