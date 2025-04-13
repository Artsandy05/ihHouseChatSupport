// src/services/api.ts
import axios from 'axios';
import { getCookie } from '../utils/cookie';

const api = axios.create({
  baseURL: 'http://localhost:8001/api/v1', 
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





export default api;
