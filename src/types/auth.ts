export interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  students: Student[];
}

export interface AuthState {
  user: User | null;
  currentStudent: Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
