import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || 'https://uvarsity-backend-steller.onrender.com';

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// attach token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;