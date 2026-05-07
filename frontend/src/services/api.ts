import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      const authData = JSON.parse(token);
      if (authData.state?.token) {
        config.headers.Authorization = `Bearer ${authData.state.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Code Review API
export const codeReviewAPI = {
  reviewCode: (data) => api.post('/code/review', data),
  explainCode: (data) => api.post('/code/explain', data),
  improveCode: (data) => api.post('/code/improve', data),
  getHistory: (params) => api.get('/code/history', { params }),
  deleteReview: (id) => api.delete(`/code/history/${id}`),
  getDashboardStats: () => api.get('/code/dashboard'),
};

export default api;
