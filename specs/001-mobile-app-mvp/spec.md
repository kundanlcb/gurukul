# Feature Specification: Mobile App MVP (Student/Parent)

**Feature Branch**: `001-mobile-app-mvp`
**Created**: 2026-02-13
**Status**: Draft
**Input**: `requirements-draft.md` (v0.6)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authentication & Session Management (Priority: P1)

As a Student or Parent, I need to log in securely using my mobile number and OTP so that I can access my personalized dashboard and data. Parents need to switch between multiple children.

**Why this priority**: Essential for access. Without auth, no other feature is usable.

**Independent Test**: Can be tested by sending an OTP to a known test number, verifying it, and checking if the correct user profile/dashboard loads.

**Acceptance Scenarios**:

1. **Given** a user on the login screen, **When** they enter a valid mobile number and correct OTP, **Then** they are logged in and redirected to the Home Dashboard.
2. **Given** a user entering an invalid OTP, **When** they submit, **Then** an error message is shown and they remain on the OTP screen.
3. **Given** a Parent with multiple children, **When** they tap the child switcher in the header, **Then** a list of linked students appears, and selecting one updates the dashboard context.
4. **Given** a logged-in user, **When** they relaunch the app, **Then** they remain logged in (persistent session).

---

### User Story 2 - Home Dashboard & Navigation (Priority: P1)

As a user, I want a central dashboard that shows me a summary of my day (attendance, pending tasks, fees) and provides quick navigation to key modules.

**Why this priority**: The landing page for all user interactions.

**Independent Test**: Verify the dashboard loads widgets (Attendance, Homework, Fees) with mock data and navigation tabs switch screens correctly.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the network request succeeds, **Then** the "Today" widgets (Attendance status, Homework count, Fee due) display correct summary data.
2. **Given** the bottom navigation bar, **When** tapping "Academics" or "Results", **Then** the user is navigated to the respective screen.
3. **Given** the dashboard, **When** tapping a specific widget (e.g., "Pending Fees"), **Then** the user is deep-linked to the detailed screen (Fee Ledger).

---

### User Story 3 - Academic Core (Attendance, Homework, Timetable) (Priority: P1)

As a Student/Parent, I want to view daily attendance, homework assignments, and the class timetable to stay organized.

**Why this priority**: Core value proposition for daily school engagement.

**Independent Test**: Verify data display for attendance calendar, homework lists, and timetable slots against API responses.

**Acceptance Scenarios**:

1. **Given** the Attendance screen, **When** viewing the current month, **Then** days are marked as Present/Absent/Late according to the data.
2. **Given** the Homework list, **When** a student marks an assignment as "Completed", **Then** the status updates locally and on the server (if applicable).
3. **Given** the Timetable screen, **When** selecting "Tuesday", **Then** the scheduled classes for Tuesday are displayed in time order.

---

### User Story 4 - Results & Reports (Priority: P1)

As a Student/Parent, I want to view term-wise exam results and report cards to track academic progress.

**Why this priority**: Critical transparency for academic performance.

**Independent Test**: Verify result summaries and subject marks match the test data.

**Acceptance Scenarios**:

1. **Given** the Results screen, **When** a term is selected, **Then** the subject-wise marks and overall grade/percentage are displayed.
2. **Given** a published report card, **When** the "Download" button is tapped, **Then** the PDF is downloaded/opened.

---

### User Story 5 - Fees & Payments (Priority: P1)

As a Parent (or Student), I want to view my fee ledger and pay pending fees online so that I don't have to visit the school office.

**Why this priority**: High business value for the school (revenue collection) and convenience for parents.

**Independent Test**: specific test environment payment gateway flow (sandbox).

**Acceptance Scenarios**:

1. **Given** the Fees screen, **When** viewing the ledger, **Then** total due, paid, and pending amounts match the backend.
2. **Given** a pending fee, **When** initiating payment and completing the gateway flow, **Then** the payment is recorded and the ledger updates to "Paid".
3. **Given** past transactions, **When** tapping a transaction, **Then** the receipt can be viewed/downloaded.

---

### User Story 6 - Communication (Notices & Calendar) (Priority: P1)

As a user, I want to see important school notices and upcoming calendar events (holidays, exams) to stay informed.

**Why this priority**: Essential communication channel.

**Independent Test**: Push notification receipt and list rendering of notices.

**Acceptance Scenarios**:

1. **Given** a new high-priority notice, **When** it is published, **Then** a push notification is received (if permissions granted).
2. **Given** the Notice feed, **When** tapping a notice, **Then** the full details and attachments are shown.
3. **Given** the Calendar, **When** viewing a month, **Then** holidays and exam dates are clearly marked.

---

### User Story 7 - Bus Tracking (Priority: P1)

As a Parent, I want to track the live location of my child's school bus to know when to drop/pick them up.

**Why this priority**: Safety and convenience feature for transport users.

**Independent Test**: Verify map renders with bus icon updating position based on mock coordinate stream.

**Acceptance Scenarios**:

1. **Given** the Bus Tracking screen, **When** the bus is active, **Then** its live location is shown on the map with an estimated ETA.
2. **Given** the bus is not active/data stale, **When** viewing tracking, **Then** the last updated timestamp is shown clearly.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST allow login via Mobile Number + OTP.
- **FR-002**: The app MUST support role-based views (Student vs. Parent).
- **FR-003**: The app MUST allow Parents to switch between linked child profiles.
- **FR-004**: The app MUST display a dashboard with attendance, homework, and fee summaries.
- **FR-005**: The app MUST clearly indicate "Offline" status if network is unavailable, while showing cached read-only data (Attendance, Homework, Notices).
- **FR-006**: The app MUST support bilingual UI (English and Hindi), selectable from Settings.
- **FR-007**: The app MUST implement the mandatory color system defined in the design tokens (`primary.600`, `status.success`, etc.).
- **FR-008**: The app MUST allow downloading/viewing of PDF attachments (Homework, Notices, Receipts, Report Cards).
- **FR-009**: The app MUST receive and handle Firebase push notifications for Notices and Events.

### Non-Functional Requirements

- **NFR-001**: **Performance**: Home screen Time-to-Interactive (TTI) MUST be under 2.5 seconds on mid-range Android devices.
- **NFR-002**: **Security**: Auth tokens MUST be stored in secure storage (EncryptedSharedPreferences/Keychain), NOT plain AsyncStorage.
- **NFR-003**: **UX Fidelity**: MVP UI MUST strictly match the reference design (card radii, spacing, typography).
- **NFR-004**: **Compatibility**: Must support Android 8.0+ and iOS 14+.

### Key Entities *(Frontend Models)*

- **User**: ID, Name, Mobile, Role (Student/Parent).
- **StudentProfile**: ID, Name, Class, Section, Roll No, Avatar URL.
- **AttendanceRecord**: Date, Status (Present/Absent/Late/HalfDay).
- **Homework**: ID, Subject, Title, Description, DueDate, Status (Pending/Submitted/Late).
- **FeeLedger**: TotalDue, TotalPaid, PendingAmount, Transactions[].
- **Notice**: ID, Title, Content, Date, Priority, IsRead, Attachments[].
- **BusRoute**: RouteID, VehicleNumber, LiveCoordinates(Lat, Lng), ETA.

## API Integration *(Assumptions)*

- Endpoints follow REST conventions `/api/mobile/v1/...`
- Auth uses Bearer JWT (Access + Refresh token flow).
- Standard response envelope: `{ success: boolean, data: any, error: { code, message } }`.

## UI/Design Guidelines

- **Typography**: System font stack (San Francisco / Roboto).
  - Headings: Bold/Semibold.
  - Body: Regular/Medium.
- **Spacing**: 4px grid (4, 8, 12, 16, 24, 32).
- **Radius**: Cards (12px or 16px), Buttons (8px or Pill).
- **Icons**: Outlined/rounded icon set (e.g., Lucide or Material Symbols Rounded).
