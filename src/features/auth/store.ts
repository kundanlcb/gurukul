import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User, ParentUser, Student } from './types';
import { storage, secureStorage } from '../../utils/storage';
import { authService } from '../../services/authService';

interface AuthState {
  user: User | ParentUser | null;
  selectedChild: Student | null; // For parent view context
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  requestOtp: (mobile: string) => Promise<void>;
  verifyOtp: (mobile: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  selectChild: (childId: string) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      selectedChild: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      requestOtp: async (mobile: string) => {
        set({ isLoading: true, error: null });
        try {
          // await authService.requestOtp(mobile);
          // MOCK: Simulate success delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ isLoading: false });
        } catch (e: any) {
          set({ isLoading: false, error: e.message || 'Failed to request OTP' });
          throw e;
        }
      },

      verifyOtp: async (mobile: string, otp: string) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await authService.verifyOtp(mobile, otp);
          
          // MOCK: Bypass validation
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: ParentUser = {
            id: 'mock-parent-1',
            name: 'Demo Parent',
            mobile: mobile,
            role: 'parent',
            children: [
              {
                id: 'student-1',
                name: 'Rahul Kumar',
                schoolId: 'school-1',
                classId: '10',
                sectionId: 'A',
                rollNumber: '21',
              },
               {
                id: 'student-2',
                name: 'Priya Singh',
                schoolId: 'school-1',
                classId: '08',
                sectionId: 'B',
                rollNumber: '15',
              }
            ]
          };

          // Store tokens (mock)
          await secureStorage.setItem('accessToken', 'mock-access-token');
          await secureStorage.setItem('refreshToken', 'mock-refresh-token');

          const response = { user: mockUser };

          let selectedChild = null;
          // If parent, select first child by default
          if (response.user.role === 'parent') {
            const parent = response.user as ParentUser;
            if (parent.children && parent.children.length > 0) {
              selectedChild = parent.children[0];
            }
          }

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            selectedChild,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e.message || 'Invalid OTP' });
          throw e; // Rethrow so UI can show specific error
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false, 
            selectedChild: null, 
            isLoading: false 
          });
        }
      },

      selectChild: (childId: string) => {
        const { user } = get();
        if (user?.role === 'parent') {
          const parent = user as ParentUser;
          const child = parent.children.find(c => c.id === childId);
          if (child) {
            set({ selectedChild: child });
          }
        }
      },

      checkAuth: async () => {
        // Hydration via persist middleware handles 'user', 
        // but we verify if token still exists in secure storage
        const token = await secureStorage.getItem('accessToken');
        if (!token) {
          set({ user: null, isAuthenticated: false, selectedChild: null });
        } else {
          // Ideally verify token validity here or wait for 401 interceptor
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ 
        user: state.user, 
        selectedChild: state.selectedChild,
        isAuthenticated: state.isAuthenticated 
      }), // Persist these fields
    }
  )
);
