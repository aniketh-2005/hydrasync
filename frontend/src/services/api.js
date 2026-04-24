import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  updateGoal: (daily_goal) => api.put('/auth/update-goal', { daily_goal }),
};

// Water API
export const waterAPI = {
  logWater: (amount) => api.post('/water/log', { amount }),
  getProgress: () => api.get('/water/my-progress'),
};

// Friends API
export const friendsAPI = {
  addFriend: (email) => api.post('/friends/add', { email }),
  getFriends: () => api.get('/friends/list'),
  getFriendsStatus: () => api.get('/friends/status'),
};

export default api;