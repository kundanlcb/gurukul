# Implementation Plan: Results and Fees

**Feature**: 005-results-fees
**Status**: Planning

## Phase 1: Results Module

### 1.1 Result Services
- [ ] Create `src/services/resultService.ts`.
- [ ] Mock data: Terms, Marks, Grades.

### 1.2 Results Screens
- [ ] Update `src/screens/app/ResultsScreen.tsx` (Tab Root).
- [ ] **UI**: List of Exam Terms (e.g., "Mid Term 2023").
- [ ] Create `src/features/results/screens/ResultDetailScreen.tsx`.
- [ ] **UI**: Report card view (Subject | Marks | Grade). Standard Table or Card List.

### 1.3 Result Widgets
- [ ] Create `ResultSummaryCard` component.

## Phase 2: Finance Module

### 2.1 Finance Services
- [ ] Create `src/services/financeService.ts`.
- [ ] Mock data: Fee structure, Due dates, Transaction history.

### 2.2 Fee Screens
- [ ] Create `src/features/finance/screens/FeeScreen.tsx`.
- [ ] **UI**: "Total Due" Banner (Red/Green). List of Installments.
- [ ] Create `src/features/finance/screens/PaymentHistoryScreen.tsx`.

### 2.3 Dashboard Integration
- [ ] Create `FeeWidget` for Home Screen (showing next due amount).
- [ ] Add "Pay Fees" to Quick Actions.

## Phase 3: Navigation

- [ ] Update `AcademicNavigator` or `AppNavigator`?
- [ ] **Results Tab**: Points to `ResultsNavigator` (Stack: List -> Detail).
- [ ] **Fees**: Not a main tab. Use Stack navigation from Home/QuickActions.
- [ ] Define `FinanceStack` or add screens to `RootStack`?
- [ ] Decision: Add `FeeScreen` and `ResultDetail` to a new `AppStack` or handle within existing.
- [ ] Suggestion: Update `AppNavigator` to be a `NativeStack` that *contains* the `TabNavigator`.
- [ ] Current `AppNavigator` IS the TabNavigator.
- [ ] Update `RootNavigator` or `AppTabParamList` doesn't fit standalone screens nicely (Tabs usually shouldn't push full screens covering tabs).
- [ ] Best Practice: `AppStack` contains `Tabs` + `FeeScreen` + `ResultDetail`.
- [ ] I will refactor `AppNavigator` to be a Stack, and `TabNavigator` to be the main screen of that stack.

## Phase 4: Integration

- [ ] Connect `ResultsScreen` (Tab) to `ResultDetail`.
- [ ] Connect `FeeWidget` -> `FeeScreen`.
