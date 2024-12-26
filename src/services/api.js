import axios from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';

//const BACKEND_URL = 'http://localhost:3000/';
const BACKEND_URL = 'https://project-backend-vf6r.onrender.com/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
    const api = axios.create({
      baseURL: BACKEND_URL,
      timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config) => {
          const token = getToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          };
          return config;
        },
    );

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          toast.warn(error.response.data.message);
        }
  
        throw error;
      }
    );

    return api;
};
