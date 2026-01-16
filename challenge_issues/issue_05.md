# Issue #5: User Profiles Dashboard Page

**Title:** Create dashboard page with user profile cards

**Labels:** feature, frontend

**Workflow:** adw_sdlc_iso

---

## Description

Build the main dashboard page that displays user profiles as cards in a responsive grid layout.

## Requirements

- Create dashboard page at `/dashboard` route
- Protected route - requires authentication
- Fetch user data from mock API service
- Display users as cards in responsive grid:
  - 1 column on mobile
  - 2 columns on tablet
  - 3-4 columns on desktop
- Each card should display:
  - Avatar image
  - Name
  - Role
  - Department
  - Email
  - Status badge (active/inactive)
- Loading state while fetching data
- Empty state if no users found
- Error state if API fails
- Header with:
  - App title
  - User info (logged in user)
  - Logout button
- Search functionality to filter users
- Department filter dropdown
- Responsive design with Tailwind CSS

## Acceptance Criteria

- Dashboard displays all user profiles as cards
- Cards are responsive and look good on all screen sizes
- Search and filter functionality works
- Loading, empty, and error states are handled
- Logout button works correctly
- Only accessible when authenticated
