# Implementation Plan: Mobile App MVP (Student/Parent)

**Feature**: 001-mobile-app-mvp  
**Status**: Planned  
**Based on**: `specs/001-mobile-app-mvp/spec.md`

## 1. Executive Summary
This plan outlines the architecture and implementation strategy for the `gurukul` React Native application. The goal is to build a high-performance, offline-capable mobile app for Students and Parents with strict adherence to the design system and a feature-first codebase structure.

## 2. Technical Architecture

### 2.1 Tech Stack Choices
- **Framework**: React Native CLI (0.73+) with TypeScript.
- **Navigation**: `react-navigation` (Native Stack + Bottom Tabs).
- **State Management**: 
  - **Server State**: `TanStack Query` (React Query) v5 for caching, deduping, and offline persistence.
  - **Client State**: `Zustand` for lightweight global session state (User, Role, Theme).
  - **Form State**: `react-hook-form` + `zod` for validation.
- **Networking**: `Axios` with centralized interceptors.
- **Storage**: 
  - `react-native-encrypted-storage` for tokens (Auth).
  - `react-native-async-storage` for React Query cache persistence.
- **UI/Styling**: 
  - `StyleSheet` with a centralized `Theme` object (Tokens).
  - `react-native-svg` for icons/illustrations.
- **Maps**: `react-native-maps` (Google Maps provider).
- **Notifications**: `@react-native-firebase/messaging`.

### 2.2 Project Structure (Feature-First)
We will adopt a domain-driven folder structure to ensure scalability.
```
src/
├── app/                 # Entry point, providers (QueryClient, AuthProvider)
├── assets/              # Fonts, Images, Animations
├── components/          # Shared Atoms/Molecules (Buttons, Inputs, Cards)
├── config/              # Env variables, centralized constants
├── features/            # Feature modules (Domain logic + Screens)
│   ├── auth/            # Login, OTP, Child Switcher
│   ├── dashboard/       # Home widgets, Quick Actions
│   ├── academics/       # Attendance, Homework, Timetable
│   ├── finance/         # Fees, Transactions
│   ├── transport/       # Bus Tracking
│   └── communication/   # Notices, Calendar
├── hooks/               # Shared hooks (useOnlineStatus, useRefresh)
├── i18n/                # Localization files (en, hi)
├── navigation/          # Navigators, Deep linking, Route types
├── services/            # API Client, Sockets, Notification Handlers
├── theme/               # Design Tokens (Colors, Spacing, Typography)
└── utils/               # Date formatters, File helpers
```

## 3. Core Module Design

### 3.1 Design System & UI
- **Approach**: Build a "mini-UI kit" first to guarantee visual consistency.
- **Tokens**: `src/theme/tokens.ts` will hold `colors` (primary.600, etc.), `spacing`, `radius`, `typography`.
- **Base Components**:
  - `AppText`: Wrapper around RN Text to enforce font family and weight.
  - `AppCard`: Standard container with shadow and radius.
  - `AppButton`: Variants for Primary, Secondary, Ghost, Danger.
  - `ScreenWrapper`: Safe Area handling + Offline Banner injection.

### 3.2 Authentication & Session
- **Flow**: Phone Number -> OTP -> JWT (Access + Refresh).
- **Role Handling**: 
  - Stored in `AuthStore` (Zustand).
  - **Parent Mode**: Needs a `selectedStudentId` in the store to filter data requests.
- **Persistence**: 
  - On launch, check EncryptedStorage for Refresh Token. 
  - If valid, silent refresh -> hydration.
  - If invalid, navigate to Login.

### 3.3 Data Layer (Offline Strategy)
- **React Query**:
  - `staleTime`: 5 minutes for active data (e.g., live bus).
  - `gcTime` (cache time): 24 hours for read-only data (Attendance, Homework).
  - **Persister**: Async Storage persister to save the query cache to disk. This enables the app to show data immediately upon launch even without network.
- **Mutations**: Optimistic updates for "Mark Homework Complete" or "Read Notice".

### 3.4 Navigation Strategy
- **RootNavigator**: Switch between `AuthStack` and `MainTabNavigator`.
- **MainTabNavigator**:
  - `Home` (Dashboard)
  - `Academics` (Attendance/Homework/Timetable)
  - `Chat/Notices` (Updates)
  - `Exams` (Results)
  - `Menu` (Profile/Settings/More)
- **Deep Linking**: Push notifications will deep link to `NoticesDetail` or `HomeworkDetail`.

## 4. Feature Implementation Strategy

### 4.1 Dashboard
- **Composition**: A ScrollView with individual "Widgets".
- **Widgets**: Isolated components that fetch their own data (e.g., `<AttendanceWidget studentId={id} />`). This prevents one API failure from breaking the whole dashboard.

### 4.2 Academics (Attendance & Homework)
- **Attendance**: 
  - Monthly view using `react-native-calendars` custom day marking.
- **Homework**:
  - SectionList grouped by Date (Today, Yesterday, Older).
  - Detail screen with PDF viewing capability.

### 4.3 Finance (Fees)
- **Security**: No sensitive card data stored in app.
- **Flow**: User inputs amount -> App requests "Order ID" from backend -> App opens Payment SDK/WebView -> Success Callback -> Backend Verification -> App success screen.

### 4.4 Transport (Maps)
- **Optimization**: Poll location endpoint every 10s if screen is focused. Stop polling on blur.
- **Fallback**: UI must handle "No signal" or "Bus inactive" states clearly.

## 5. Quality Assurance Plan

### 5.1 Performance Targets
- **TTI**: Skeleton screens for all query loading states.
- **Lists**: `FlashList` (Shopify) instead of FlatList for large lists (e.g., Ledger, Notices).
- **Images**: FastImage driven caching for profile pictures.

### 5.2 Testing
- **Unit**: Jest + React Native Testing Library for Hooks and Utility functions.
- **E2E**: Manual testing against the Acceptence Criteria in Spec.

## 6. Execution Phases
*(See `tasks.md` for the granular checklist)*
1. **Foundation**: Init, Tokens, Networking, Auth Store.
2. **Core UI**: Component Library.
3. **Flows**: Auth -> Dashboard -> Feature Modules -> Polish.
