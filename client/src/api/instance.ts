import { useLoginStore } from '@/store';
import axios from 'axios';

const base = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
};

export const instance = axios.create(base);
export const fileInstance = axios.create(base);

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

fileInstance.interceptors.request.use(
  (config) => {
    const token = useLoginStore.getState().token;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
