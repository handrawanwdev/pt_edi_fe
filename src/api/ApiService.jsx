// src/api/ApiService.js
import axios from 'axios';

// Buat instance Axios dengan pengaturan dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // URL backend
  timeout: 10000, // Timeout 10 detik
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache', // HTTP 1.1
    'Authorization': `Bearer ${localStorage.getItem("token")||""}` // Token JWT
  }
});

export default apiClient;