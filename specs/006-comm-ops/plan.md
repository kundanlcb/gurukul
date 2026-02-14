# Implementation Plan: Communication and Operations

**Feature**: 006-comm-ops
**Status**: Planning

## Phase 1: Communication Module (Notices)

### 1.1 Screens
- [ ] Create `src/features/communication/screens/NoticesScreen.tsx`.
- [ ] **UI**: List of notices. Urgent ones highlighted.
- [ ] Create `src/features/communication/screens/NoticeDetailScreen.tsx`.
- [ ] **UI**: Full view + PDF download mock.

### 1.2 Service
- [ ] Create `src/services/communicationService.ts`. (Mock data).

## Phase 2: Operations Module (Calendar)

### 2.1 Screens
- [ ] Create `src/features/communication/screens/SchoolCalendarScreen.tsx`.
- [ ] **UI**: Calendar View + Event List.

## Phase 3: Transport Module

### 3.1 Screens
- [ ] Create `src/features/transport/screens/BusTrackingScreen.tsx`.
- [ ] **UI**: Map Placeholder, Driver Details Card, "Call Driver" button.

## Phase 4: Integration

- [ ] Update `AppNavigator` with new screens (`Notices`, `NoticeDetail`, `SchoolCalendar`, `BusTracking`).
- [ ] Update `QuickActions.tsx` logic to navigate to these screens.
