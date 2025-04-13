import axios from 'axios';

// Create axios instance with configuration
const useAxios = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_BASE_URL,
  timeout: 1000 * 30, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Error handling function
const catchError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx range
    console.error('Error response:', error.response.data);
    console.error('Status code:', error.response.status);
    throw new Error(
      (error.response.data)?.message || 
      `Request failed with status code ${error.response.status}`
    );
  } else if (error.request) {
    // No response received
    console.error('Error request:', error.request);
    throw new Error('No response received from server');
  } else {
    // Request setup error
    console.error('Error message:', error.message);
    throw new Error(`Request failed: ${error.message}`);
  }
};

export { useAxios, catchError };