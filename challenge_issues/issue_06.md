# Issue #6: User Profile Card Component

**Title:** Create reusable UserCard component

**Labels:** feature, component

**Workflow:** adw_sdlc_iso

---

## Description

Build a reusable card component to display individual user profiles with consistent styling.

## Requirements

- Create component at `/components/UserCard.tsx`
- Accept user object as prop
- Display user information:
  - Avatar with fallback
  - Name (bold, larger text)
  - Role and department
  - Email (with mailto link)
  - Location
  - Status badge with color coding:
    - Green for active
    - Gray for inactive
- Hover effects for better UX
- Click to view more details (optional modal)
- Responsive design
- Accessible (semantic HTML, ARIA labels)

## Acceptance Criteria

- Component is reusable and well-structured
- All user information displays correctly
- Status badges have appropriate colors
- Hover effects work smoothly
- Component is accessible
- TypeScript props are properly typed
