import axios from 'axios';
import { Platform } from 'react-native';
import { secureStorage } from '../../utils/storage';

const BASE_URL = 'https://api.gurukul.com/api'; // Replace with env var later

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Platform': Platform.OS,
  },
});

// Request Interceptor: Attach Token from EncryptedStorage
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await secureStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('[API] Error reading token', e);
    }
    console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('[API] Unauthenticated - clearing tokens');
      await secureStorage.removeItem('accessToken');
      await secureStorage.removeItem('refreshToken');
      // The auth store's persist middleware will detect missing tokens on next checkAuth
    }
    return Promise.reject(error);
  }
);
