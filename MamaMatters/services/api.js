// MamaMatters/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.132:5000', // Replace with your actual backend server address
  withCredentials: true, // optional: use if backend uses cookies
});

export default API;
