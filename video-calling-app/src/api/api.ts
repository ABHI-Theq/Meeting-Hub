// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500/api/auth', // change baseURL as per your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Token expired or unauthorized!');
        localStorage.removeItem('token'); // or sessionStorage
        window.location.href = '/'; // redirect to login
      } else if (error.response.status === 403) {
        alert('You do not have permission to access this resource.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
