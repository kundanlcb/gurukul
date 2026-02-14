# Tasks: Mobile App MVP (Student/Parent)

**Feature**: 001-mobile-app-mvp
**Dependencies**: `plan.md`, `spec.md`
**Generated**: 2026-02-13

## Task Format
`- [ ] [ID] [P?] [Story?] Description with file path`

---

## Phase 1: Setup & Infrastructure (Blocking)

- [X] T001 Initialize React Native CLI project (if not already clean)
- [X] T002 Install core libs: `react-navigation`, `axios`, `tanstack-query`, `zustand`, `async-storage`, `encrypted-storage`
- [X] T003 Install UI libs: `react-native-svg`, `vector-icons`, `linear-gradient`, `flash-list`, `react-hook-form`, `zod`
- [X] T004 Setup Folder Structure: `src/{app,components,features,services,theme,hooks,utils}`
- [X] T005 [P] Create `src/theme/tokens.ts` (colors, spacing, typography)
- [X] T006 [P] Configure Axios client `src/services/api/client.ts`
- [X] T007 [P] Setup `QueryClientProvider` + `AsyncStoragePersister` in `App.tsx`
- [X] T008 [P] Setup i18n skeleton `src/i18n/`

---

## Phase 2: Design System & Core Components (Foundational)

- [x] T009 [P] Create `AppText` (typography wrapper) in `src/components/ui/AppText.tsx`
- [x] T010 [P] Create `AppButton` (variants) in `src/components/ui/AppButton.tsx`
- [x] T011 [P] Create `AppCard` (shadows) in `src/components/ui/AppCard.tsx`
- [x] T012 [P] Create `AppInput` (controlled) in `src/components/ui/AppInput.tsx`
- [x] T013 [P] Create `StatusChip` in `src/components/ui/StatusChip.tsx`
- [x] T014 [P] Create `Header` (back/action) in `src/components/ui/Header.tsx`
- [x] T015 [P] Create `ScreenWrapper` (safe area + offline banner) in `src/components/layout/ScreenWrapper.tsx`

---

## Phase 3: Auth & Session (P1)

- [x] T016 [US1] Create `AuthStore` (Zustand) in `src/features/auth/store.ts`
- [x] T017 [US1] Implement `LoginScreen` in `src/features/auth/screens/LoginScreen.tsx`
- [x] T018 [US1] Implement `OtpVerificationScreen` in `src/features/auth/screens/OtpVerificationScreen.tsx`
- [x] T019 [US1] Implement `authService` (login, refresh, logout) in `src/services/authService.ts`
- [x] T020 [US1] Implement secure token storage logic in `src/utils/storage.ts`
- [x] T021 [US1] Create `ChildSwitcher` component in `src/features/auth/components/ChildSwitcher.tsx`

---

## Phase 4: Navigation & Dashboard (P1)

- [x] T023 [US2] Setup `RootNavigator`, `AuthStack`, `TabNavigator` in `src/navigation/`
- [x] T024 [US2] Implement `HomeScreen` shell
- [x] T025 [US2] Create `AttendanceWidget` in `src/features/dashboard/widgets/`
- [x] T026 [US2] Create `HomeworkWidget` in `src/features/dashboard/widgets/`
- [x] T027 [US2] Create `FeeWidget` in `src/features/dashboard/widgets/`
- [x] T028 [US2] Create `QuickActions` grid in `src/features/dashboard/components/`

---

## Phase 5: Academics (P1)

- [x] T030 [US3] Implement `AttendanceScreen` (Calendar Month View)
- [x] T032 [US3] Implement `HomeworkListScreen` (SectionList)
- [x] T033 [US3] Implement `HomeworkDetailScreen` (View + Mark Complete)
- [x] T034 [US3] Implement `TimetableScreen` (Day Tabs)

---

## Phase 6: Results & Reports (P1)

- [x] T035 [US4] Implement `ResultsScreen` (Term List)
- [x] T036 [US4] Create `ResultSummaryCard` component
- [x] T037 [US4] Implement `ResultDetailScreen` (Subject Marks)
- [x] T038 [US4] Implement PDF Download logic `src/utils/fileDownloader.ts`

---

## Phase 7: Fees & Payments (P1)

- [X] T039 [US5] Implement `FeeScreen` (Ledger + Pay Action)
- [X] T040 [US5] Create `FeeItem` component
- [X] T041 [US5] Implement `PaymentHistoryScreen`

---

## Phase 8: Communication (P1)

- [X] T043 [US6] Implement `NoticesScreen` (FlashList)
- [X] T044 [US6] Implement `NoticeDetailScreen`
- [X] T045 [US6] Implement `SchoolCalendarScreen` (Agenda View)
- [X] T046 [US6] Setup Notification Listeners in `src/services/notificationService.ts`

---

## Phase 9: Transport (P1)

- [ ] T047 [US7] Setup `react-native-maps`
- [X] T048 [US7] Implement `BusTrackingScreen` (Map + Route Polyline) - Stubbed
- [ ] T049 [US7] Create `BusMarker` (Live Position)

---

## Phase 10: Final Prep

- [X] T051 [NFR] Verify Offline Caching (Airplane Mode check) - Added OfflineBanner & Hook
- [X] T052 [NFR] Visual Parity Audit - Added KitchenSinkScreen
- [X] T054 [NFR] Performance Audit (TTI) - Optimised Lists with FlashList
