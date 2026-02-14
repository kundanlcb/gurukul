# Student/Parent Mobile App Requirements (App-Only Draft v0.6)

## 1. Objective
Build the `gurukul` React Native app for `Student` and `Parent` users with production-ready UX, stable mobile architecture, and strict visual parity to the approved reference design.

## 2. Scope
- Target implementation repo: `gurukul` (React Native CLI project).
- In scope: app UX and app engineering for Android + iOS.
- In scope modules (MVP): authentication, home dashboard, attendance, homework, timetable, results, fees, notices, notifications, calendar, bus tracking, profile/settings.
- In scope quality bar: bilingual strings (English/Hindi), consistent design tokens, performance baseline, offline behavior for read modules.
- Out of scope for this draft: backend redesign, API contract redesign, server data model changes, admin/teacher web workflows.

## 3. Product Personas
- `Student`: daily app usage for attendance, homework, timetable, exam results, notices, and fee visibility.
- `Parent`: monitor one or multiple children, receive alerts, track progress, pay fees, and view receipts.

## 4. UX Direction (Reference-Locked)
- Visual style: card-first layout, compact but readable information density, rounded containers, icon-first status chips.
- Home layout rhythm: greeting header -> primary highlight card -> learning/activity blocks -> assignment status.
- Results: timeline/list pattern with explicit state chips (`Pass`, `Failed`, `Promoted`).
- Academics: subject-centric cards with progress/summary information.
- Navigation: bottom tabs with `Home`, `Timetable`, `Academics`, `Results`, `Profile`.

### 4.1 UI Fidelity Requirement (Mandatory)
- MVP UI must stay aligned to the provided reference image for:
  - card radii, spacing rhythm, and section hierarchy
  - dashboard content order and visual weight
  - timeline treatment and status chips
  - subject tile style and compact list density
  - bottom tab emphasis and icon-driven layout
- Release sign-off includes a visual parity review against the reference image.

### 4.2 Mandatory Color System (Same as Reference Theme)
Use a centralized token file and apply only these colors for MVP screens.

| Token | Hex | Usage |
|---|---|---|
| `primary.600` | `#5A53D6` | Primary action, active tab, hero card base |
| `primary.500` | `#6A63E8` | Gradient end, highlighted accents |
| `primary.100` | `#E9E7FB` | Light lavender container backgrounds |
| `surface.app` | `#F3F4F6` | App background |
| `surface.card` | `#FFFFFF` | Card background |
| `surface.soft` | `#F7F8FB` | Secondary blocks/strips |
| `accent.teal` | `#3DB9BE` | Academic/timetable accents |
| `accent.mint` | `#E3F6F4` | Mint-tint card backgrounds |
| `accent.amber` | `#F2B457` | Timeline marker / warning highlight |
| `accent.orange` | `#F29C4C` | Subject/assignment accent |
| `status.success` | `#20A56F` | `Pass` / `Promoted` states |
| `status.danger` | `#EC6B57` | `Failed` / overdue states |
| `text.primary` | `#1F2533` | Main text |
| `text.secondary` | `#6E7583` | Supporting text |
| `border.soft` | `#E4E7EC` | Dividers and subtle borders |

Mandatory color rules:
- No ad-hoc brand colors in MVP screens.
- No inline hardcoded hex values inside feature components.
- Status colors must be semantically mapped (`success`, `danger`, `warning`) through tokens.

### 4.3 Theme Strategy for MVP
- MVP visual target is the reference light theme above.
- Dark theme is deferred to Phase-2 unless explicitly prioritized later.
- All color usage still goes through tokens to keep future dark-theme rollout possible.

## 5. Feature Requirements

### 5.1 Authentication and Account
- OTP-first login for Student/Parent mobile numbers.
- Persistent session with secure token storage.
- Parent supports child-switcher for linked students.

### 5.2 Home Dashboard
- Personalized greeting with profile avatar.
- Today summary widgets:
  - attendance status
  - pending homework
  - upcoming exam/task
  - pending fee amount
- Quick actions:
  - homework
  - timetable
  - results
  - fees
  - notices

### 5.3 Attendance
- Read-only attendance view for student and parent contexts.
- Monthly percentage, Present/Absent/Late counts, date-wise history.
- Month/date-range filters.

### 5.4 Homework / Digital Diary
- Homework list by class/subject/date.
- Detail view with description, due date, attachments.
- Status labels: upcoming, due today, overdue, completed.
- Student completion/submission flow included in MVP.

### 5.5 Timetable
- Day and week views.
- Slot-level details: time, subject, teacher.
- Highlight current/next period.

### 5.6 Results / Report Card
- Term list and result summary cards.
- Subject-wise marks, percentage, grade.
- Download/share report card PDF when available.

### 5.7 Fees and Payments
- Ledger summary: total due, paid, pending, due items.
- Payment flow for student and parent contexts.
- Transaction history and receipt download.

### 5.8 Notices and Communication
- Notice feed with priority targeting.
- Notice details with attachments.
- Read/unread state.
- Push alerts for critical notices.

### 5.9 Profile and Settings
- Student/Parent profile details.
- App settings:
  - language (English/Hindi)
  - notification toggles
- Parent child-switcher entry in top area/profile header.

### 5.10 Calendar (MVP)
- Unified events for exams, holidays, and school events.
- Day and month view.
- Tap-to-detail behavior.

### 5.11 Bus Tracking (MVP)
- Live bus location map for assigned route.
- ETA for upcoming stops.
- Route and stop list.
- Pickup/drop alerts for parent context.
- Fallback: show last update timestamp when live location is stale.

## 6. Role Matrix (Mobile)

| Feature | Student | Parent |
|---|---|---|
| Login (OTP) | Yes | Yes |
| Home dashboard | Yes | Yes |
| Attendance view | Own only | Linked children |
| Homework view | Own class | Linked children |
| Timetable | Own class | Linked children |
| Results | Own only | Linked children |
| Fees ledger | View + pay | View + pay |
| Receipts | View/download | View/download |
| Notices | Read | Read |
| Calendar | Read | Read |
| Bus tracking | Own route | Linked children |
| Profile/settings | Yes | Yes |

## 7. Mobile App Technical Requirements
- Stack: React Native CLI + TypeScript.
- Navigation: React Navigation (native stack + bottom tabs).
- Networking/data: Axios service layer + TanStack React Query.
- Persistence:
  - AsyncStorage for non-sensitive cached data
  - encrypted storage for token/session data
- Notifications: Firebase Messaging + native notification handling.
- Payments: gateway SDK integration via strategy-based adapter.
- Maps: production map SDK/provider for transport tracking.
- Performance baseline:
  - Home screen TTI under 2.5 seconds on target mid-range Android class
  - list pagination and retry/backoff for network resilience

### 7.1 Coding Style Baseline
- Feature-first structure:
  - `src/features/<feature>/screens`
  - `src/features/<feature>/components`
  - `src/features/<feature>/hooks`
- Shared layers:
  - `src/navigation`, `src/services`, `src/context`, `src/config`, `src/constants`
- UI implementation:
  - `StyleSheet.create` + centralized design tokens
  - keep business logic inside hooks/services
- API usage:
  - no direct API calls in presentational components
  - centralized endpoint constants and client interceptors

## 8. Integration Assumptions (App-Only)
- Backend/API work is treated as completed and externally managed.
- App should consume finalized mobile endpoints and response contracts as-is.
- Any backend defect discovered during app development is tracked separately and does not change this draft's app scope.

## 9. MVP Acceptance Criteria by Module
- Auth:
  - OTP login success path is stable and actionable failure states are shown.
- Home:
  - Dashboard widgets render within performance target.
- Attendance:
  - Summary and history render accurately for selected period.
- Homework:
  - Status states and submission/completion flow behave correctly.
- Timetable:
  - Day/week slots render correctly for selected child.
- Results:
  - Term summaries and subject rows render accurately.
- Fees:
  - Ledger math is consistent post-payment refresh.
  - Receipt opens/downloads correctly.
- Notices:
  - Targeted notices visible, read state persists.
- Calendar:
  - Event dates map correctly in day/month views.
- Bus tracking:
  - Live location/ETA/events are shown with stale-data fallback.
- Localization:
  - English/Hindi strings render without clipping.
- Design parity:
  - All screens use the mandatory token palette and pass visual review against reference.

## 10. Design System and UI Parity Checklist
- Central token sets required:
  - colors
  - typography scale
  - spacing scale
  - radius scale
  - shadow/elevation scale
- Component baseline:
  - cards
  - chips
  - section headers
  - timeline cells
  - bottom tab bar
  - list rows
  - empty/error states
- Visual sign-off artifacts:
  - screenshot set for key MVP screens in light theme
  - explicit parity checklist mapped to the reference image

## 11. Offline, Security, and Privacy Baseline
- Cache policy:
  - attendance/homework/notices/calendar: at least last 7 days
- Offline behavior:
  - graceful empty/offline states for read screens
- Tokens/session:
  - secure storage for sensitive values
- Data hygiene:
  - no sensitive PII in logs

## 12. Testing and QA Strategy
- Unit tests:
  - hooks, services, and utility logic
- Integration tests:
  - auth/session flow, API client interceptors, child-context switching
- UI tests:
  - smoke tests for all MVP modules
  - visual regression on Home, Results, Fees, Bus Tracking
- Localization QA:
  - English/Hindi passes on core screens
- Visual parity QA:
  - mandatory review against reference image before release approval

## 13. MVP Recommendation (Release 1)
- Auth + session bootstrap + child switcher.
- Home dashboard.
- Attendance.
- Homework list/detail + completion/submission.
- Timetable.
- Results list/detail.
- Fees ledger + payment + receipt.
- Notices feed/detail.
- Calendar.
- Bus tracking.
- Bilingual UI (English/Hindi).
- Reference color-theme compliance across all MVP screens.

## 14. Phase-2 (Release 2)
- Dark theme.
- Leave request workflow.
- Advanced result analytics.
- Deeper offline sync behavior.

## 15. Locked MVP Decisions
1. Focus is app-only delivery in `gurukul`.
2. Student and Parent both can pay fees in MVP.
3. Homework completion/submission is included in MVP.
4. Calendar module is included in MVP.
5. Parent child-switcher is included in MVP.
6. Bilingual support (Hindi/English) is mandatory in MVP.
7. App uses React Native CLI (no Expo).
8. UI must follow the reference image color scheme and token set in section 4.2.

## 16. Immediate Next Step
Start implementation in this order:
1. Design token setup (colors/typography/spacing) and shared UI primitives.
2. Navigation + auth/session shell.
3. Home + attendance + homework + timetable.
4. Results + notices + calendar.
5. Fees + payment + receipt.
6. Bus tracking + notification wiring.
