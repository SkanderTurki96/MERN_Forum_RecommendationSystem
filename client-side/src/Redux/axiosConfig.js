import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Your server's base URL
  timeout: 5000, // Timeout in milliseconds
  maxContentLength: 50 * 1000 * 1000, // Max content length in bytes (in this example, 50MB)
});

export default instance;