import axios from 'axios';
import { getApiBaseUrl } from '@/utils/url';

const http = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default http;
