import axios from 'axios';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';

export interface ValidationErrors {
  [field: string]:
    | string
    | string[]
    | boolean
    | { key: string; message: string };
}

export interface HttpError extends Record<string, unknown> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message ?? error.message,
      statusCode: error.response?.status,
    };
    const message = isArray(customError.message)
      ? customError.message[0]
      : customError.message;

    toast.error(message);
    return Promise.reject(customError);
  },
);

export { axiosInstance };
