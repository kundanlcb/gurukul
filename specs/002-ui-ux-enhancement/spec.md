# Spec 002: UI/UX Enhancement & Premium Design Overhaul

## 1. Background
The current UI of `gurukul` is functional but lacks the premium polish found in `shubh-milan-fe`. The goal is to elevate the visual quality of `gurukul` by adopting design patterns, component styles, and interaction models that have proven successful in the reference app.

## 2. Objectives
- **Premium Aesthetic**: Shift from a basic utility look to a refined, high-quality user interface.
- **Consistency**: Enforce strict spacing, typography, and shadow systems.
- **Micro-interactions**: Add subtle animations (e.g., floating labels, tab presses) to delight users.
- **Visual Hierarchy**: Improved use of colors and whitespace to guide user attention.

## 3. Design System Updates

### 3.1 Color Palette Refinement
We will retain the core "Gurukul" identity (Purple/Indigo) but refine the palette to include "Premium" neutrals and accents similar to Shubh Milan.

**New Tokens to Add/Update in `src/theme/tokens.ts`:**
- **Premium Backgrounds**:
  - `surface.premium`: `#F8F9FA` (Subtle off-white for contrast against pure white cards)
  - `surface.overlay`: `rgba(0,0,0,0.5)`
- **Shadow Colors**: Low opacity shadows for iOS/Android parity.
- **Accents**: Introduce a "Gold" or "Rich Accent" counterpart to the primary color for special states (badges, premium features).

### 3.2 Typography & Spacing
- **Font Scale**: Align with `shubh-milan-fe`'s `xs` (12) to `6xl` (48) scale if not already matched.
- **Spacing**: Strict adherence to 4px grid (`xs=4`, `sm=8`, `md=16`, `lg=24`, `xl=32`).

### 3.3 Shadow System
Replace generic elevations with a tiered shadow system:
- `shadows.sm`: Offset {0, 1}, Radius 2, Opacity 0.1
- `shadows.md`: Offset {0, 2}, Radius 4, Opacity 0.15
- `shadows.lg`: Offset {0, 4}, Radius 8, Opacity 0.2
- `shadows.xl`: Offset {0, 8}, Radius 16, Opacity 0.25

## 4. Component Implementation Plan

### 4.1 Forms: Floating Label Inputs
**Current**: Standard boxed/outlined `TextInput`.
**Target**: `FloatingInput` component.
- **Features**:
  - Label animates from placeholder position to top-left on focus/value.
  - Border bottom style (cleaner look).
  - Animated color changes (Label/Border turns Primary on focus).
- **File**: `src/components/ui/FloatingInput.tsx`

### 4.2 Custom Tab Bar
**Current**: Default React Navigation Tab Bar.
**Target**: Custom Rendered Tab Bar (`CustomTabBar`).
- **Features**:
  - Removal of top border lines.
  - Custom styling for active/inactive states.
  - Ability to highlight specific tabs (e.g., center action button if needed).
  - Proper handling of `SafeAreaInsets` for specific device shapes.
- **File**: Update `src/navigation/TabNavigator.tsx` to use `tabBar={(props) => <CustomTabBar {...props} />}`.

### 4.3 App Header
**Current**: Inconsistent or default navigation headers.
**Target**: `AppHeader` component (reusable).
- **Features**:
  - Uniform padding and alignment.
  - Support for Left Icon (Back/Menu), Title, and Right Actions.
  - Badge support on Right Actions (e.g., Notifications).
  - Matches `surface.app` or `surface.premium` background.
- **File**: `src/components/ui/AppHeader.tsx`

### 4.4 Card Improvements
**Current**: Basic shadows.
**Target**: "Elevated" vs "Flat" vs "Outlined" variants using new Shadow System.
- **Update**: Refactor `AppCard` to use `shadows.sm` by default and `shadows.md/lg` for elevatd states.
- **Styling**: Ensure `borderRadius` follows `theme.radius.m` (12px) or `l` (16px) for a softer feel.

## 5. Execution Steps

1.  **Theme Infrastructure**:
    - Update `src/theme/tokens.ts` with new Shadows, Premium Colors, and Spacing constants.
2.  **Core Components**:
    - Create `src/components/ui/AppHeader.tsx`.
    - Create `src/components/ui/FloatingInput.tsx`.
    - Update `src/components/ui/AppCard.tsx`.
    - Update `src/components/ui/AppButton.tsx` (ensure it uses the new shadows/spacing).
3.  **Navigation Overhaul**:
    - Create `src/navigation/components/CustomTabBar.tsx`.
    - Integrate it into `TabNavigator`.
4.  **Screen Refactor (Phased)**:
    - **P0**: Update `HomeScreen` and `ProfileScreen` to use `AppHeader`, `AppCard` (new style), and `FloatingInput` (where applicable).
    - **P1**: Update Auth Screens (`Login`, `Otp`) to use `FloatingInput`.

## 6. Success Criteria
- [ ] `tokens.ts` includes `shadows` and `premium` color tokens.
- [ ] `FloatingInput` is usable in at least one screen.
- [ ] App uses a custom-rendered Bottom Tab Bar.
- [ ] Headers are consistent across main tabs.
- [ ] The "Kitchen Sink" screen is updated to showcase the new Premium components.
