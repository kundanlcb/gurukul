import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = 'https://api.gurukul.com/api/mobile/v1'; // Replace with env var later

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Platform': Platform.OS,
  },
});

// Request Interceptor: Attach Token
client.interceptors.request.use(
  async (config) => {
    // TODO: Get token from EncryptedStorage
    // const token = await getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: Handle Token Refresh logic here
    if (error.response?.status === 401) {
      console.warn('[API] Unauthenticated - redirecting to login');
      // triggerLogout();
    }
    return Promise.reject(error);
  }
);
