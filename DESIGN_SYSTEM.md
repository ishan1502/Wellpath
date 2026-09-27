# WellPath Design System

## Core Principles
1. **Consistency**: Use semantic design tokens (`primary`, `surface`, `background`, `muted`) instead of arbitrary hardcoded Tailwind colors (`emerald-600`, `gray-100`).
2. **Hierarchy**: Clear distinction between primary actions, secondary actions, and surface elements.
3. **Restraint**: Avoid excessive rounding (`rounded-3xl` everywhere). Standardize on `rounded-lg` for cards, `rounded-md` for buttons and inputs.
4. **Brand**: Keep the green-and-white family, but execute it professionally.

## Design Tokens

### Colors
- **Primary**: `#059669` (Emerald 600) - Used for primary actions, active states.
- **Primary Hover**: `#047857` (Emerald 700)
- **Primary Foreground**: `#FFFFFF`
- **Background**: `#FAFAF8` (Slightly warm off-white for softer feel)
- **Surface**: `#FFFFFF` (White for cards, dropdowns, inputs)
- **Border**: `#E5E7EB` (Gray 200) - For subtle separation.
- **Text Main**: `#111827` (Gray 900) - For primary text.
- **Text Muted**: `#6B7280` (Gray 500) - For secondary text, descriptions.
- **Destructive**: `#EF4444` (Red 500)

### Typography
- Inter for everything.
- Headings: Bold, tight tracking.
- Body: Normal weight, relaxed leading.

### Spacing & Layout
- Global max-width for marketing pages: `max-w-7xl`.
- Dashboard layouts: Sidebar with `surface` background, main content area with `background`.

### Radii
- `sm`: 6px - Badges, small elements.
- `md`: 8px - Buttons, Inputs.
- `lg`: 12px - Cards, modals.
- `xl`: 16px - Large hero sections or featured blocks.
- `full`: 9999px - Avatars.

### Shadows
- `sm`: Very subtle, for buttons and inputs.
- `md`: For cards.
- `lg`: For dropdowns and modals.

## Components Specification
- **Button**: Uses `bg-primary text-primary-foreground rounded-md`.
- **Card**: Uses `bg-surface border-border rounded-lg shadow-sm`.
- **Input**: Uses `bg-surface border-border rounded-md`.
- **Badge**: Uses `rounded-full` (or `sm`?) Let's stick to `rounded-full` for badges.
- **Avatar**: `rounded-full`.
