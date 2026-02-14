/**
 * Authentication Types — Gurukul (Parent/Student App)
 * Domain types that derive from generated API models where shapes overlap.
 * Components should ALWAYS import from here — never from src/api/ directly.
 */

// ============================================================================
// Re-exported API Types (for service layer use)
// ============================================================================

/** Generated request/response DTOs — use these in services that call the API directly */
export type { OtpRequestDto } from '../../api/models/otp-request-dto';
export type { OtpVerifyDto } from '../../api/models/otp-verify-dto';
export type { RefreshTokenRequestDto } from '../../api/models/refresh-token-request-dto';
export type { AuthTokenResponseDto } from '../../api/models/auth-token-response-dto';
export type { UserProfileDto } from '../../api/models/user-profile-dto';

// ============================================================================
// Domain Types (used by components and stores)
// ============================================================================

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
