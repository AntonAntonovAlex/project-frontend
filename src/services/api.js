import axios from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const BACKEND_URL = 'http://localhost:3000/';
//const BACKEND_URL = 'https://project-backend-vf6r.onrender.com/';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};
const shouldDisplayError = (response) => !!StatusCodeMapping[response.status];

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
        if (error.response && shouldDisplayError(error.response)) {
          toast.warn(error.response.data.message);
        } else {
          toast.warn(error.message);
        }
  
        throw error;
      }
    );

    return api;
};
