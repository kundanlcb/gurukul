import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

// General Storage (Non-sensitive)
export const storage = {
  setItem: async (key: string, value: string | object) => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Storage setItem error', e);
    }
  },

  getItem: async <T = string>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (e) {
      console.error('Storage getItem error', e);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Storage removeItem error', e);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Storage clear error', e);
    }
  },
};

// Secure Storage (Tokens, Credentials)
export const secureStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (e) {
      console.error('SecureStorage setItem error', e);
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (e) {
      console.error('SecureStorage getItem error', e);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (e) {
      console.error('SecureStorage removeItem error', e);
    }
  },

  clear: async () => {
    try {
      await EncryptedStorage.clear();
    } catch (e) {
      console.error('SecureStorage clear error', e);
    }
  },
};
