# Implementation Plan: Navigation & Auth Refactor

**Feature**: 003-nav-auth-refactor
**Status**: Planning

## Phase 1: Core Architecture & Dependencies

### 1.1 Project Configuration
- [ ] Install React Navigation dependencies (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `react-native-screens`, `react-native-safe-area-context`).
- [ ] Install Icons library (`react-native-vector-icons` if not present, or `lucide-react-native`).
- [ ] Setup `src/navigation` directory structure.
- [ ] Define TypeScript types for RootStack, AuthStack, and AppTabNavigator in `src/navigation/types.ts`.

### 1.2 Global State & Context
- [ ] Create `AuthContext` (`src/contexts/AuthContext.tsx`).
    - State: `user`, `isAuthenticated`, `isLoading`, `currentStudent`.
    - Methods: `login(mobile, otp)`, `logout()`, `switchStudent(studentId)`.
    - Storage: Integrate `AsyncStorage` for session persistence.
- [ ] Define clear interfaces for `User`, `Student`, `AuthResponse`.

## Phase 2: Navigation Structure (The Shell)

### 2.1 Tab Navigator
- [ ] Implement `AppNavigator` with Bottom Tabs.
- [ ] Configure 5 Tabs:
    1.  **Home**: Dashboard (Placeholder)
    2.  **Timetable**: Schedule (Placeholder)
    3.  **Academics**: List of academic items (Placeholder)
    4.  **Results**: Exam results (Placeholder)
    5.  **Profile**: User settings (Placeholder)
- [ ] **UI Requirement**: Apply standard tab bar styling (Height ~60-70px, no floating pill, active/inactive colors from `UI_GUIDELINES.md`).
- [ ] **Icons**: Use outline icons for inactive, filled for active (or distinct colors).

### 2.2 Auth Navigator
- [ ] Create `AuthNavigator` stack.
- [ ] Screens: `LoginScreen`, `OtpVerifyScreen`.
- [ ] **UI Requirement**: Use standard "Background Card" layout for auth screens (Logo at top, content card at bottom).

### 2.3 Root Navigator
- [ ] Implement `RootNavigator` to switch between `AuthNavigator` and `AppNavigator` based on `isAuthenticated`.

## Phase 3: UI Implementation (Screens)

### 3.1 Login Screen
- [ ] Layout: Logo + Heading + "Enter Mobile Number" Code Input.
- [ ] Validation: Mobile number format (10 digits).
- [ ] Action: "Send OTP" button (Primary Button Style).
- [ ] **UI Standard**: Use standard spacing (e.g., `p-4` or `p-6`), consistent colors (Primary Blue), rounded inputs.

### 3.2 OTP Verification Screen
- [ ] Layout: "Enter OTP sent to +91..."
- [ ] Input: 4 or 6 digit OTP input fields (auto-focus next).
- [ ] Action: "Verify & Login" button.
- [ ] Countdown timer for "Resend OTP".

### 3.3 Child Switcher (Header Component)
- [ ] Create a reusable `Header` component for the Home tab.
- [ ] Display current user/student name.
- [ ] Implement dropdown/modal to switch between siblings.
- [ ] Action: Switching updates `currentStudent` in Context and refreshes data.

## Phase 4: Integration & Mock Data

### 4.1 Mock Service
- [ ] Create `src/services/mockAuth.ts`.
- [ ] Functions: `sendOtp(mobile)`, `verifyOtp(mobile, otp)`.
- [ ] Mock Data: Return a User object with *multiple* attached Student profiles to test switching.

### 4.2 Error Handling
- [ ] Add toast/alert for invalid OTP or network errors.
- [ ] Handle Loading states on buttons.

## Phase 5: Design Polish & Review

- [ ] **Consistency Check**: Verify margins/paddings against `UI_GUIDELINES.md`.
- [ ] **Typography**: Ensure global font usage (Headings, Body).
- [ ] **Safe Area**: Verify layout on iPhone notch/Android status bar.
- [ ] **Transitions**: Ensure smooth slide/fade animations between screens.
