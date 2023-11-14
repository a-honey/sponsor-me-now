import { useLoginStore } from '@/store';
import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = useLoginStore.getState().token;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
