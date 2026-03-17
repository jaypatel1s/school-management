import axios from 'axios';
import api from '../api';

const PrincipalAPI = axios.create({
  baseURL: `${api.defaults.baseURL}/principals`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
PrincipalAPI.interceptors.request.use(
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
PrincipalAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export { PrincipalAPI };
