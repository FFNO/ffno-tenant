import axios from "axios";

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

    return Promise.reject(customError);
  }
);

export { axiosInstance };
