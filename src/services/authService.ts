import { authApi } from '../api/instances';
import { AuthResponse } from '../features/auth/types';
import { secureStorage } from '../utils/storage';

export const authService = {
  requestOtp: async (mobile: string): Promise<{ message: string }> => {
    const response = await authApi.requestOtp({ otpRequestDto: { mobileNumber: mobile } });
    return {
      message: response.data.data ?? 'OTP sent successfully'
    };
  },

  verifyOtp: async (mobile: string, otp: string): Promise<AuthResponse> => {
    const response = await authApi.verifyOtp({ otpVerifyDto: { mobileNumber: mobile, otp } });
    const data = response.data.data;

    if (!data || !data.accessToken) {
      throw new Error(response.data.error?.message || 'Verification failed');
    }

    // Persist tokens in EncryptedStorage
    await secureStorage.setItem('accessToken', data.accessToken);
    if (data.refreshToken) {
      await secureStorage.setItem('refreshToken', data.refreshToken);
    }

    // Map backend response to frontend AuthResponse type
    const user = data.user;
    return {
      user: {
        id: user?.userId || '',
        name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        mobile: user?.mobileNumber || mobile,
        role: (user?.role as any) === 'ROLE_PARENT' ? 'parent' : 'student',
      },
      token: data.accessToken,
      refreshToken: data.refreshToken || '',
    };
  },

  logout: async () => {
    try {
      const refreshToken = await secureStorage.getItem('refreshToken');
      if (refreshToken) {
        await authApi.logout({ refreshTokenRequestDto: { refreshToken } });
      }
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
      const response = await authApi.refreshToken({ refreshTokenRequestDto: { refreshToken } });
      const data = response.data.data;
      if (data?.accessToken) {
        await secureStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
          await secureStorage.setItem('refreshToken', data.refreshToken);
        }
        return data.accessToken;
      }
    } catch (e) {
      console.error('Failed to refresh token', e);
    }
    return null;
  },
};
