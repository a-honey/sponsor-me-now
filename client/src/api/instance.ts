import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL;
export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
