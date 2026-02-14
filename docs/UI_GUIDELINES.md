# UI Design Guidelines

## Philosophy
The app follows a "Premium Minimalist" aesthetic. It prioritizes content clarity, soft interactions, and generous whitespace.

## Components

### Header
*   **Style**: Transparent background, minimal elements.
*   **Layout**: `Greeting + Name` on Left | `Notification Bell` on Right.
*   **Profile**: **Do not** display a profile icon in the header if a dedicated "Profile" tab exists.
*   **Icons**: Use `Feather` library. Size 24px.
*   **Typography**: Greeting is Small/Secondary. Name is Large/Bold (26px).

### Navigation (Tab Bar)
*   **Style**: Simple, Full-Width Bottom Bar.
*   **Appearance**: White background, Top Border (`border.soft`), Mild Shadow.
*   **Interaction**: No text labels (optional), Icon color changes on selection (Active: Primary, Inactive: Tertiary).
*   **Height**: Standard 56-64px. No floating elements.

### Cards & Widgets
*   **Shadows**: Soft, diffused shadows (`shadowOpacity: 0.1` max). avoiding harsh Android elevation where possible.
*   **Border Radius**: Generous. Standard is `theme.radius.l` (16px) or `xl` (24px).
*   **Spacing**: 
    *   Screen Padding: `theme.spacing.l` (16px).
    *   Widget Spacing: `theme.spacing.xl` (24px) vertical separation.

### Typography
*   **Standard**: Inter (or System default).
*   **Colors**:
    *   Headings: `text.primary` (#1F2533)
    *   Subtitles: `text.secondary` (#6E7583)
    *   Brand/Active: `primary.600` (#5A53D6)

## Implementation Notes
*   **Icons**: Always prioritize `Feather` icons (`message-square`, `book`, `user`, `bell`).
*   **Safe Area**: Handle carefully. Tab Bar sits at bottom safe area. Header allows status bar transparency.
