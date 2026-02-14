# Feature Specification: Navigation and Authentication Refactor

**Feature Branch**: `003-nav-auth-refactor`
**Created**: 2026-02-14
**Status**: Draft
**Input**: "Implement 5-tab navigation (Home, Timetable, Academics, Results, Profile) and OTP authentication with child switcher."

## User Scenarios & Testing

### User Story 1 - Login & Authentication (Priority: P1)

As a Student or Parent, I want to login using my mobile number and OTP so that I can access my personalized dashboard securely.

**Why this priority**: Access to the app is blocked without authentication. Foundation for all other features.

**Independent Test**: Can be tested by launching the app, seeing login screen, entering mobile/OTP, and landing on Home.

**Acceptance Scenarios**:

1. **Given** app is installed (fresh), **When** app launches, **Then** show Login Screen (not Home).
2. **Given** on login screen, **When** entering 10-digit mobile and OTP (mocked), **Then** navigate to Home Screen.
3. **Given** logged in, **When** killing and relaunching app, **Then** land directly on Home Screen (session persists).

---

### User Story 2 - 5-Tab Navigation (Priority: P1)

As a user, I want to switch between Home, Timetable, Academics, Results, and Profile using a bottom tab bar so that I can quickly access different features.

**Why this priority**: Core navigation structure required for the new feature set.

**Independent Test**: Tap each tab and verify the screen title/content changes.

**Acceptance Scenarios**:

1. **Given** on Home, **When** tapping "Timetable", **Then** switch to Timetable screen and active icon changes.
2. **Given** on any tab, **When** viewing the tab bar, **Then** see exactly 5 icons: Home, Timetable, Academics, Results, Profile.
3. **Given** on tab bar, **When** verified, **Then** active tab has PRIMARY color, inactive has TERTIARY color.

---

### User Story 3 - Child Switcher (Priority: P2)

As a Parent with multiple children, I want to switch the active child context so that I can view data for specific siblings.

**Why this priority**: Essential for parents with >1 student.

**Independent Test**: Switch profile and verify "Home" greeting or data changes (if mocked).

**Acceptance Scenarios**:

1. **Given** user is a Parent with 2 children, **When** viewing Profile/Header, **Then** see option to switch child.
2. **Given** child A selected, **When** switching to child B, **Then** Dashboard refreshes (conceptually).

### Edge Cases

- **No Network**: Login should fail gracefully with specific error message.
- **Invalid OTP**: Challenge user to retry max 3 times before timeout.
- **Expired Session**: App should auto-redirect to login if token is invalid on launch.
- **Single Child**: Child switcher UI should be hidden if parent has only 1 student linked.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST authenticate users via 10-digit Mobile Number + OTP.
- **FR-002**: System MUST persist user session across app restarts using secure local storage.
- **FR-003**: System MUST provide a "Logout" function in the Profile tab that clears session and redirects to Login.
- **FR-004**: System MUST display a Bottom Tab Navigator with 5 routes:
    1. `Home` (Dashboard)
    2. `Timetable` (Calendar view)
    3. `Academics` (Homework/Attendance hub)
    4. `Results` (Marks/Reports)
    5. `Profile` (Settings/User info)
- **FR-005**: System MUST allow parents to select a "Current Student" if multiple are linked to their phone number.

### UI/Design Requirements

- **UI-001**: **Tab Bar Style**: White background, Top Border (`#E4E7EC`), 56-64px height.
- **UI-002**: **Tab Icons**: Feather Icons.
    - Home: `home`
    - Timetable: `calendar`
    - Academics: `book-open`
    - Results: `award` (or `file-text`)
    - Profile: `user`
- **UI-003**: **Active State**: Icon color `primary.600`. Container style as defined in `UI_GUIDELINES.md` (Filled background if applicable, or just color).
- **UI-004**: **Login Screen**: Minimalist, branded with logo, clear input fields.

### Key Entities

- **User**: `id`, `name`, `mobile`, `role` (Parent/Student).
- **Student**: `id`, `name`, `class`, `section`.
- **Session**: `token`, `expiry`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Login flow completes in under 5 seconds (including UI transitions).
- **SC-002**: App restores session in under 1 second on relaunch.
- **SC-003**: Tab switching is instant (<100ms) with no visual glitch.
