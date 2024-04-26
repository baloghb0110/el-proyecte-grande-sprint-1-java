import axios from 'axios';
import { getLocalStorageItem } from '@src/utilities';

const axiosConfig = axios.create({
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
  },
});

const axiosConfigWithAuth = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
  },
});

axiosConfigWithAuth.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export {
  axiosConfig,
  axiosConfigWithAuth
};
