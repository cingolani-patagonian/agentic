# Reusable UserCard Component

**ADW ID:** 216fce1d
**Date:** 2026-01-16
**Specification:** specs/issue-6-adw-216fce1d-sdlc_planner-reusable-user-card-component.md

## Overview

Enhanced the UserCard component to be a fully-featured, reusable component that displays user profile information with avatar fallback, location display, optional click functionality, comprehensive accessibility features, and responsive design. The component now supports all user fields from the User type and provides excellent UX through hover effects, keyboard navigation, and screen reader support.

## What Was Built

- Avatar fallback functionality using user initials when images fail to load
- Location field display with conditional rendering
- Optional click handler for viewing detailed user information
- Comprehensive ARIA labels and semantic HTML for accessibility
- Full keyboard navigation support (Tab, Enter, Space)
- Enhanced responsive design with optimized padding for mobile devices
- Email link click protection to prevent triggering card onClick
- TypeScript prop interfaces with JSDoc documentation
- Client-side component with React hooks for state management

## Technical Implementation

### Files Modified

- `app/nextjs/components/UserCard.tsx`: Completely enhanced component with avatar fallback, location display, click handler support, accessibility features, and keyboard navigation
- `.claude/commands/e2e/test_user_card_component.md`: Comprehensive E2E test specification covering all component features
- `specs/issue-6-adw-216fce1d-sdlc_planner-reusable-user-card-component.md`: Feature specification document
- `.mcp.json`: Configuration update
- `playwright-mcp-config.json`: Configuration update

### Key Changes

1. **Avatar Fallback System**: Implemented state-based error handling for avatar images with automatic fallback to user initials displayed in a colored circle (indigo background)

2. **Location Display**: Added conditional rendering of location field with consistent styling matching role and department fields

3. **Click-to-View-Details**: Added optional `onClick` prop that makes the card clickable, focusable, and keyboard-accessible with proper visual feedback

4. **Accessibility Enhancements**: Added comprehensive ARIA labels (`aria-label`) to card container, avatar, status badge, and email link; added `role="article"` for semantic structure

5. **Keyboard Navigation**: Implemented `onKeyPress` handler supporting Enter and Space keys, with `tabIndex={0}` for focusable cards and `focus:ring` for visual focus indicators

6. **Responsive Improvements**: Optimized padding for mobile devices (`p-4 sm:p-6`) and added text wrapping/breaking for long content

7. **Client Component**: Converted to 'use client' directive to support React hooks (`useState`) for avatar fallback state management

## How to Use

### Basic Usage

```tsx
import UserCard from '@/components/UserCard';
import { User } from '@/types';

// Display user card with all information
<UserCard user={userData} />
```

### With Click Handler

```tsx
// Make card clickable to view user details
<UserCard
  user={userData}
  onClick={(user) => {
    console.log('View details for:', user.name);
    // Open modal, navigate to profile, etc.
  }}
/>
```

### With Custom Styling

```tsx
// Add custom classes
<UserCard
  user={userData}
  className="custom-shadow"
/>
```

### User Data Structure

The component expects a User object with the following fields:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  location?: string; // Optional - conditionally displayed
  avatar: string;
  status: 'active' | 'inactive';
  // Other fields available but not displayed by card
}
```

## Configuration

### Props Interface

- `user` (required): User object containing profile information
- `onClick` (optional): Callback function triggered when card is clicked - `(user: User) => void`
- `className` (optional): Additional CSS classes for custom styling

### Avatar Requirements

- Avatar images are loaded via Next.js Image component with automatic optimization
- Fallback displays user initials (first letter of each name part, max 2 characters)
- Fallback uses indigo background (`bg-indigo-500`) with white text
- Avatar dimensions: 64x64 pixels (w-16 h-16)

### Status Badge Colors

- `active`: Green badge (`bg-green-100 text-green-800`)
- `inactive`: Gray badge (`bg-gray-100 text-gray-800`)

## Testing

### E2E Testing

Run the comprehensive E2E test specification:

```bash
# Read the E2E test specification
cat .claude/commands/e2e/test_user_card_component.md

# Execute tests using Playwright
# Tests cover: location display, avatar fallback, click functionality,
# accessibility, keyboard navigation, responsive design
```

### Manual Testing

1. **View Dashboard**: Navigate to `http://localhost:3000/dashboard`
2. **Verify Location**: Check that location displays for all user cards
3. **Test Avatar Fallback**: Break an avatar URL to see initials fallback
4. **Test Hover Effects**: Hover over cards to see shadow transition
5. **Test Email Links**: Click email links to verify mailto functionality
6. **Test Keyboard Navigation**: Use Tab to focus cards, Enter/Space to activate (if onClick provided)
7. **Test Screen Reader**: Use screen reader to verify ARIA labels are announced correctly
8. **Test Responsive**: Resize browser to test mobile, tablet, and desktop layouts

### Validation Commands

```bash
# TypeScript compilation check
cd app/nextjs && npx tsc --noEmit

# Linting
cd app/nextjs && npm run lint

# Production build
cd app/nextjs && npm run build
```

## Notes

### Accessibility Features

- Semantic HTML with `role="article"` for proper structure
- ARIA labels on all interactive and informational elements
- Full keyboard navigation with Tab, Enter, and Space key support
- Focus indicators with ring effect for keyboard users
- Screen reader friendly content organization

### Backward Compatibility

All enhancements maintain backward compatibility with existing dashboard implementation. The component works exactly as before when used without the optional `onClick` prop.

### Email Link Protection

Email clicks stop event propagation to prevent triggering the card's onClick handler, ensuring users can still click email links without activating card click behavior.

### Performance Considerations

- Next.js Image component provides automatic optimization
- Avatar fallback prevents broken image display
- CSS transitions used for smooth hover effects
- No external dependencies beyond React and Next.js
- Lightweight component suitable for rendering multiple instances

### Future Enhancement Ideas

- Add different card sizes (compact, default, expanded)
- Support custom avatar upload
- Add user presence indicator (online/offline/away)
- Include social media links
- Add skeleton loading state
- Support card selection mode for bulk operations
