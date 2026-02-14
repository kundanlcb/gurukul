import { client } from './api/client';
import { AuthResponse } from '../features/auth/types';
import { secureStorage } from '../utils/storage';

const ENDPOINTS = {
  REQUEST_OTP: '/auth/otp/request',
  VERIFY_OTP: '/auth/otp/verify',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
};

export const authService = {
  requestOtp: async (mobile: string): Promise<{ message: string }> => {
    const response = await client.post(ENDPOINTS.REQUEST_OTP, { mobile });
    return response.data;
  },

  verifyOtp: async (mobile: string, otp: string): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>(ENDPOINTS.VERIFY_OTP, { mobile, otp });
    
    // Auto-persist tokens on success
    if (response.data.token) {
      await secureStorage.setItem('accessToken', response.data.token);
    }
    if (response.data.refreshToken) {
      await secureStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },

  logout: async () => {
    try {
      await client.post(ENDPOINTS.LOGOUT);
    } catch (e) {
      // Ignore logout errors (network)
    } finally {
      // Always clear local tokens
      await secureStorage.removeItem('accessToken');
      await secureStorage.removeItem('refreshToken');
    }
  },

  refreshToken: async (): Promise<string | null> => {
    const refreshToken = await secureStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
      const response = await client.post<{ token: string }>(ENDPOINTS.REFRESH, { refreshToken });
      if (response.data.token) {
        await secureStorage.setItem('accessToken', response.data.token);
        return response.data.token;
      }
    } catch (e) {
      console.error('Failed to refresh token', e);
    }
    return null;
  },
};
