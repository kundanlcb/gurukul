# Implementation Plan: Academic Features

**Feature**: 004-academic-features
**Status**: Planning

## Phase 1: Shared UI Components

### 1.1 Status Chip
- [ ] Create `src/components/ui/StatusChip.tsx`.
- [ ] Variants: Success (Present/Done), Error (Absent/Overdue), Warning (Late/Pending), Neutral (Holiday).
- [ ] **UI Standard**: Rounded full pill, light background + dark text.

### 1.2 Reusable Cards
- [ ] Ensure `src/components/ui/AppCard.tsx` (if created in 003) is flexible enough for lists.

## Phase 2: Attendance Module

### 2.1 Attendance Screen
- [ ] Create `src/features/academic/screens/AttendanceScreen.tsx`.
- [ ] **UI**: Top Summary Card (Present %, Total Days).
- [ ] **Calendar**: Library `react-native-calendars` or custom simple strip? Suggest `react-native-calendars` for full view.
- [ ] **List**: Date-wise history below calendar.

### 2.2 Attendance Service (Mock)
- [ ] Create `src/services/academicService.ts`.
- [ ] method: `getAttendance(studentId, month)`.

## Phase 3: Homework Module

### 3.1 Homework List
- [ ] Create `src/features/academic/screens/HomeworkListScreen.tsx`.
- [ ] **UI**: Filters (All, Pending, Completed).
- [ ] **Item Card**: Subject Icon + Title + Due Date badge.

### 3.2 Homework Details
- [ ] Create `src/features/academic/screens/HomeworkDetailScreen.tsx`.
- [ ] **UI**: Full details, attachments (mock), "Mark as Done" button.

### 4.0 Timetable Module

### 4.1 Timetable Screen
- [ ] Create `src/features/academic/screens/TimetableScreen.tsx`.
- [ ] **UI**: Horizontal day selector (Mon, Tue...).
- [ ] **List**: Time slots vertical timeline.

## Phase 5: Dashboard Integration

### 5.1 Widgets
- [ ] Create `AttendanceWidget` for Home Screen.
- [ ] Create `HomeworkWidget` (Next due) for Home Screen.

## Phase 6: Navigation Update

- [ ] Update `AppNavigator` to link actual screens instead of placeholders.
- [ ] Navigation:
    - Tab `Timetable` -> `TimetableScreen`.
    - Tab `Academics` -> New `AcademicNavigator` or `Hub Screen`?
    - **Decision**: `Academics` tab could be a menu (Attendance, Homework, etc.) or just one of them?
    - **Refinement**: Spec says "Academic Features" includes Attendance, Homework. The Tab is "Academics".
    - **UI**: The "Academics" tab should probably be a Menu/Dashboard of academic modules.
    - **Plan**: Create `AcademicScreen` as a hub with grid menu items.

