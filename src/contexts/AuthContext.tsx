import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, Student } from '../types/auth';

interface AuthContextType extends AuthState {
  sendOtp: (mobile: string) => Promise<void>;
  verifyOtp: (mobile: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  switchStudent: (studentId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    currentStudent: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const studentJson = await AsyncStorage.getItem('currentStudent');
      
      if (userJson) {
        const user = JSON.parse(userJson);
        const currentStudent = studentJson ? JSON.parse(studentJson) : (user.students[0] || null);
        
        setState(prev => ({
          ...prev,
          user,
          currentStudent,
          isAuthenticated: true,
          isLoading: false
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (e) {
      console.error('Failed to load session', e);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const sendOtp = async (mobile: string) => {
    // MOCK: Simulate API call
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setState(prev => ({ ...prev, isLoading: false }));
        resolve();
      }, 1000);
    });
  };

  const verifyOtp = async (mobile: string, otp: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // MOCK: Simulate successful login
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        if (otp === '1234') { // Mock OTP
          const mockUser: User = {
            id: 'u1',
            name: 'Kundan Parent',
            mobile,
            students: [
              { id: 's1', name: 'Aarav', class: '10-A', rollNo: '12' },
              { id: 's2', name: 'Vihaan', class: '6-B', rollNo: '05' }
            ]
          };
          
          const defaultStudent = mockUser.students[0];

          await AsyncStorage.setItem('user', JSON.stringify(mockUser));
          await AsyncStorage.setItem('currentStudent', JSON.stringify(defaultStudent));

          setState({
            user: mockUser,
            currentStudent: defaultStudent,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          resolve();
        } else {
          setState(prev => ({ ...prev, isLoading: false, error: 'Invalid OTP' }));
          reject(new Error('Invalid OTP'));
        }
      }, 1000);
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('currentStudent');
    setState({
      user: null,
      currentStudent: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const switchStudent = async (studentId: string) => {
    if (!state.user) return;
    const student = state.user.students.find(s => s.id === studentId);
    if (student) {
      await AsyncStorage.setItem('currentStudent', JSON.stringify(student));
      setState(prev => ({ ...prev, currentStudent: student }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, sendOtp, verifyOtp, logout, switchStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
