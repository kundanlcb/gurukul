# Feature Specification: Academic Features (Attendance, Homework, Timetable)

**Feature Branch**: `004-academic-features`
**Created**: 2026-02-14
**Status**: Draft
**Input**: "Implement Academic features: Attendance, Homework, and Timetable with list/detail views and read-only calendar integration."

## User Scenarios & Testing

### User Story 1 - Attendance Tracking (Priority: P1)

As a Parent, I want to view my child's monthly attendance summary and daily history so that I can track their regularity.

**Acceptance Scenarios**:
1. **Given** on Attendance (Academy tab), **When** viewing dashboard, **Then** see monthly % and Present/Absent count.
2. **Given** on History view, **When** scrolling, **Then** see date-wise status (Present/Absent/Holiday).
3. **Given** changing month filter, **When** selected, **Then** data updates for that month.

### User Story 2 - Homework Management (Priority: P1)

As a Student, I want to see a list of homework assignments sorted by date/status so that I don't miss deadlines.

**Acceptance Scenarios**:
1. **Given** on Homework list, **When** viewing items, **Then** see Subject, Title, Due Date, and Status Chip (Pending/Overdue).
2. **Given** an assignment, **When** tapping it, **Then** see detailed description and "Mark as Done" or "Submit" button.
3. **Given** marking as done, **When** updated, **Then** status changes locally to 'Completed'.

### User Story 3 - Timetable View (Priority: P2)

As a Student, I want to see today's class schedule so that I can pack my bag correctly.

**Acceptance Scenarios**:
1. **Given** on Timetable tab, **When** viewing "Today", **Then** see ordered list of periods with Time, Subject, and Teacher name.
2. **Given** viewing "Week", **When** tapping a day (e.g., Wednesday), **Then** see schedule for that day.

### Edge Cases
- **No Data**: Show friendly "No homework assigned" or "No schedule" states.
- **Holidays**: Timetable should indicate "Holiday" instead of empty slots.
- **Offline**: Show cached data if network fails.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display Attendance Summary (Total Days, Present, Absent, %).
- **FR-002**: System MUST list Homework items with status: `Assign`, `Pending`, `overdue`, `Submitted`.
- **FR-003**: System MUST provide a Timetable view supporting Day selection (Mon-Sat).
- **FR-004**: System MUST allow filtering Homework by Subject and Status.

### UI/Design Requirements

- **UI-001**: **Cards**: Use standard `AppCard` for Homework items.
- **UI-002**: **Status Chips**: Use `status.success` (Green) for Present/Completed, `status.danger` (Red) for Absent/Overdue.
- **UI-003**: **Calendar**: Use library compliant with design tokens (custom colors).

### Key Entities
- **Homework**: `id`, `subject`, `title`, `dueDate`, `status`.
- **AttendanceRecord**: `date`, `status`, `remarks`.
- **TimeSlot**: `day`, `startTime`, `endTime`, `subject`, `teacher`.

## Success Criteria
- **SC-001**: Attendance calendar renders < 1 sec.
- **SC-002**: Filter operations on Homework list are instantaneous.
