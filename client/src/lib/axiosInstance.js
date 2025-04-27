import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Function to get the JWT token from cookies
const getToken = () => {
  return Cookies.get('token'); // This retrieves the token from the cookies
};

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: '/api', // Base URL of your API
});

// Add a request interceptor to attach the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
