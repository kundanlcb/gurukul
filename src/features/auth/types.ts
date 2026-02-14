export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'parent' | 'student';
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface Student {
  id: string;
  name: string;
  schoolId: string;
  classId: string;
  sectionId: string;
  rollNumber: string;
  avatar?: string;
}

// Extended user for Parent who has children
export interface ParentUser extends User {
  role: 'parent';
  children: Student[];
}
