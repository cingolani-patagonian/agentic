# Feature: User Profiles Dashboard Page

## Metadata
issue_number: `5`
adw_id: `4c8ea440`
issue_json: `{"number":5,"title":"Create dashboard page with user profile cards","body":"# Issue #5: User Profiles Dashboard Page\n\n**Title:** Create dashboard page with user profile cards\n\n**Labels:** feature, frontend\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nBuild the main dashboard page that displays user profiles as cards in a responsive grid layout.\n\n## Requirements\n\n- Create dashboard page at `/dashboard` route\n- Protected route - requires authentication\n- Fetch user data from mock API service\n- Display users as cards in responsive grid:\n  - 1 column on mobile\n  - 2 columns on tablet\n  - 3-4 columns on desktop\n- Each card should display:\n  - Avatar image\n  - Name\n  - Role\n  - Department\n  - Email\n  - Status badge (active/inactive)\n- Loading state while fetching data\n- Empty state if no users found\n- Error state if API fails\n- Header with:\n  - App title\n  - User info (logged in user)\n  - Logout button\n- Search functionality to filter users\n- Department filter dropdown\n- Responsive design with Tailwind CSS\n\n## Acceptance Criteria\n\n- Dashboard displays all user profiles as cards\n- Cards are responsive and look good on all screen sizes\n- Search and filter functionality works\n- Loading, empty, and error states are handled\n- Logout button works correctly\n- Only accessible when authenticated"}`

## Feature Description
Build a comprehensive user profiles dashboard page at the `/dashboard` route that displays user profile cards in a responsive grid layout. The dashboard will fetch user data from the existing mock API service, display users in a card-based interface with their avatar, name, role, department, email, and status. The feature includes search functionality to filter users by name/email/role, a department filter dropdown, and proper loading, error, and empty states. The dashboard header will show the app title, logged-in user information, and a logout button. The page will be protected by authentication, requiring users to be logged in to access it. The design will be responsive using Tailwind CSS, showing 1 column on mobile, 2 columns on tablet, and 3-4 columns on desktop.

## User Story
As a logged-in user
I want to view all user profiles in a card-based dashboard with search and filter capabilities
So that I can easily browse the team directory, find specific users, and view their professional information at a glance

## Problem Statement
The Next.js application currently has authentication (login/logout) and a mock user database with API service, but lacks a functional user interface to display and interact with the user data. Users need an intuitive, visually appealing dashboard to browse team members, search for specific people, and filter by department. The existing dashboard page only shows basic authentication information and doesn't leverage the rich user profile data available from the mock database.

## Solution Statement
Replace the current basic dashboard with a fully-featured user profiles dashboard that displays all 25 mock users as cards in a responsive grid. Integrate the existing mock API service (`getAllUsers`, `searchUsers`, `getUsersByDepartment`) to fetch data with proper loading states. Design user profile cards that display avatars, names, roles, departments, emails, and status badges with a clean, professional design using Tailwind CSS. Implement client-side search functionality that filters users in real-time as they type, and add a department dropdown filter. Include proper error handling with user-friendly error messages, and empty states for no results. Maintain the existing authentication protection so only logged-in users can access the dashboard.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/app/dashboard/page.tsx` - Current dashboard page that needs to be replaced with the new user profiles dashboard. Currently shows basic auth info, will be redesigned to display user cards with search/filter functionality.
- `app/nextjs/components/Navigation.tsx` - Navigation component that includes the dashboard link and logout button. Already has proper authentication state handling. May need minor adjustments for consistent styling with new dashboard.
- `app/nextjs/lib/api.ts` - Mock API service with `getAllUsers()`, `searchUsers()`, and `getUsersByDepartment()` functions. These will be used to fetch user data with simulated network delays.
- `app/nextjs/lib/mockDb.ts` - Mock user database containing 25 user profiles with complete data (avatar, role, department, location, bio, joinDate, status). This is the underlying data source for the API.
- `app/nextjs/types/index.ts` - TypeScript type definitions including `User` interface and `ApiResponse<T>` type. All existing types will be reused.
- `app/nextjs/hooks/useAuth.tsx` - Custom authentication hook providing `user`, `logout`, and `isLoading` state. Will be used to protect the route and display logged-in user info.
- `app/nextjs/contexts/AuthContext.tsx` - Authentication context provider. Already integrated, no changes needed.
- `app/nextjs/tailwind.config.ts` - Tailwind CSS configuration. Will be used for responsive grid layouts and styling.
- `.claude/commands/conditional_docs.md` - Documentation guide for checking if additional docs are needed. Feature matches Next.js, authentication, and mock API conditions.
- `.claude/commands/test_e2e.md` - E2E test runner documentation to understand how to structure the E2E test file.
- `.claude/commands/e2e/test_auth_login.md` - Example E2E test showing authentication flow validation patterns to follow.

### New Files

- `app/nextjs/components/UserCard.tsx` - Reusable user card component that displays individual user profile with avatar, name, role, department, email, and status badge. Will be used in the dashboard grid.
- `app/nextjs/components/SearchBar.tsx` - Search input component with real-time filtering functionality. Accepts onChange handler and current search value.
- `app/nextjs/components/DepartmentFilter.tsx` - Dropdown component for filtering users by department. Displays all available departments from the mock database.
- `app/nextjs/components/LoadingSpinner.tsx` - Reusable loading spinner component for async operations. Will show while fetching user data.
- `app/nextjs/components/EmptyState.tsx` - Reusable empty state component for when no users match filters or no data is available.
- `app/nextjs/components/ErrorState.tsx` - Reusable error state component for API failures with retry functionality.
- `.claude/commands/e2e/test_dashboard_user_cards.md` - E2E test specification that validates dashboard functionality including user card display, search, filtering, loading states, error states, and responsive design.

## Implementation Plan

### Phase 1: Foundation
Create reusable UI components that will be used throughout the dashboard. These components need to be built first as they are dependencies for the main dashboard page. Start with the simplest components (LoadingSpinner, EmptyState, ErrorState) that have no dependencies, then move to the more complex components (SearchBar, DepartmentFilter, UserCard) that might use the simpler ones. Each component should be self-contained, fully typed with TypeScript, and styled with Tailwind CSS following the existing design patterns in the codebase.

### Phase 2: Core Implementation
Replace the existing dashboard page with the new user profiles dashboard implementation. This involves integrating all the foundation components created in Phase 1, implementing the data fetching logic using the existing mock API service, managing component state (search query, department filter, loading states, error states), and implementing the responsive grid layout. The dashboard needs to handle all user interactions including search input changes, department filter selection, and displaying appropriate states (loading, error, empty, success with data).

### Phase 3: Integration
Ensure the dashboard integrates seamlessly with the existing authentication system, maintains route protection, and works correctly with the navigation component. Verify that the logout functionality continues to work properly, the dashboard link in navigation remains functional, and the responsive design works across all screen sizes. Create comprehensive E2E tests to validate all functionality including authentication flow, data display, search, filtering, and state handling.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create LoadingSpinner Component
- Create `app/nextjs/components/LoadingSpinner.tsx` with a centered animated spinner
- Use Tailwind CSS classes for the spinning animation (animate-spin)
- Design should be a circular loader with indigo color scheme matching the app
- Component should accept optional size prop (small, medium, large) with default medium
- Export as default component for easy imports

### 2. Create EmptyState Component
- Create `app/nextjs/components/EmptyState.tsx` that displays a friendly "no results" message
- Accept props: `title` (string), `message` (string), and optional `icon` (React node)
- Use centered layout with gray text colors
- Include a subtle icon or illustration (can use text emoji or SVG)
- Design should match the overall app aesthetic with proper spacing

### 3. Create ErrorState Component
- Create `app/nextjs/components/ErrorState.tsx` for API failure scenarios
- Accept props: `message` (string) and `onRetry` (callback function)
- Display error message with a "Try Again" button
- Use red color scheme for error indication (red-600 for button)
- Include error icon or visual indicator
- Button should call the onRetry callback when clicked

### 4. Create SearchBar Component
- Create `app/nextjs/components/SearchBar.tsx` with a text input field
- Accept props: `value` (string), `onChange` (callback), and `placeholder` (string)
- Include a search icon (magnifying glass) inside the input field
- Use Tailwind CSS for styling with focus states and transitions
- Implement debouncing if needed for performance (optional but recommended)
- Add proper accessibility attributes (aria-label, aria-describedby)
- Style to match the overall app design with rounded corners and border

### 5. Create DepartmentFilter Component
- Create `app/nextjs/components/DepartmentFilter.tsx` as a dropdown/select element
- Accept props: `value` (string), `onChange` (callback), and `departments` (string array)
- Include an "All Departments" option as the default/first option
- Use Tailwind CSS for consistent styling with SearchBar
- Add proper accessibility attributes
- Consider using native select element or a custom dropdown depending on design needs
- Display "Department" label above or inside the select element

### 6. Create UserCard Component
- Create `app/nextjs/components/UserCard.tsx` to display individual user information
- Accept a `user` prop of type `User` from the types file
- Display all required fields: avatar (img tag with user.avatar src), name (h3), role (p), department (p), email (p), status badge
- Status badge should be a colored pill: green for "active", gray for "inactive"
- Use Tailwind CSS for card styling: white background, rounded corners, shadow, padding
- Add hover effect for better interactivity (subtle shadow increase)
- Ensure the avatar is displayed with proper sizing and rounded (circular)
- Structure the card with proper spacing and visual hierarchy
- Make sure email is clickable as a mailto: link

### 7. Update Dashboard Page - Part 1: Setup and State
- Open `app/nextjs/app/dashboard/page.tsx` and replace the current implementation
- Keep the existing authentication protection logic (useAuth, useRouter, useEffect for redirect)
- Import all newly created components (UserCard, SearchBar, DepartmentFilter, LoadingSpinner, EmptyState, ErrorState)
- Import API functions: getAllUsers, searchUsers, getUsersByDepartment from '@/lib/api'
- Set up React state variables: users (User[]), filteredUsers (User[]), isLoadingUsers (boolean), error (string | null), searchQuery (string), selectedDepartment (string)
- Keep the existing user, logout, isLoading from useAuth hook

### 8. Update Dashboard Page - Part 2: Data Fetching
- Implement useEffect hook to fetch users on component mount
- Call getAllUsers() API function to fetch all 25 users
- Set isLoadingUsers to true before the API call
- Handle successful response: store users in state, initialize filteredUsers with all users
- Handle error response: set error message in state
- Set isLoadingUsers to false after API call completes
- Include proper error handling with try-catch block

### 9. Update Dashboard Page - Part 3: Search and Filter Logic
- Implement useEffect hook that watches searchQuery and selectedDepartment changes
- When either changes, filter the users array based on:
  - If searchQuery is not empty: filter by name, email, or role (case-insensitive partial match)
  - If selectedDepartment is not "All Departments": filter by department
  - Apply both filters if both are active
- Update filteredUsers state with the filtered results
- This provides real-time filtering without additional API calls

### 10. Update Dashboard Page - Part 4: UI Structure and Header
- Create the page structure with proper semantic HTML
- Add a header section with: page title "Team Directory" (or similar), SearchBar component, DepartmentFilter component
- Extract unique departments from users array for the DepartmentFilter departments prop
- Wire up SearchBar onChange to update searchQuery state
- Wire up DepartmentFilter onChange to update selectedDepartment state
- Include logged-in user info display in the header (username, role)
- Add logout button in the header (can reuse existing logout logic)
- Style the header with flexbox for proper layout and spacing

### 11. Update Dashboard Page - Part 5: Grid Layout and Cards
- Create the main content area that displays the user cards
- Implement responsive grid using Tailwind CSS grid classes:
  - Base (mobile): grid-cols-1
  - Tablet (md breakpoint): md:grid-cols-2
  - Desktop (lg breakpoint): lg:grid-cols-3 or xl:grid-cols-4
- Add proper gap between cards (gap-4 or gap-6)
- Map over filteredUsers array and render UserCard component for each user
- Pass the user object as prop to UserCard
- Add proper key prop (user.id) for React list rendering

### 12. Update Dashboard Page - Part 6: Conditional Rendering
- Add conditional rendering logic for different states:
  - If isLoading (auth check): show LoadingSpinner centered
  - If !user (not authenticated): return null (will redirect)
  - If isLoadingUsers (fetching data): show LoadingSpinner with "Loading users..." message
  - If error (API failure): show ErrorState with error message and retry button
  - If filteredUsers.length === 0 and users.length > 0: show EmptyState with "No users match your filters" message
  - If users.length === 0: show EmptyState with "No users found" message
  - Otherwise: show the grid with user cards
- Implement retry handler that refetches data by calling the fetch function again

### 13. Add Styling and Polish
- Review the entire dashboard for visual consistency
- Ensure proper spacing, padding, and margins throughout
- Verify responsive design works at all breakpoints (test mobile, tablet, desktop)
- Add transitions for smooth interactions (hover effects, filter changes)
- Ensure color scheme is consistent with the rest of the app
- Verify text is readable with proper contrast ratios
- Check that the layout doesn't break with different content lengths

### 14. Create E2E Test Specification
- Create `.claude/commands/e2e/test_dashboard_user_cards.md` following the pattern from `test_auth_login.md`
- Include test metadata: test name, test ID, application URL (http://localhost:3000), purpose
- Write comprehensive test steps that validate:
  - Step 1: TypeScript compilation check
  - Step 2: Start Next.js dev server
  - Step 3: Navigate to /dashboard without authentication (should redirect to /login)
  - Step 4: Login with valid credentials (admin/admin123)
  - Step 5: Verify redirect to /dashboard after login
  - Step 6: Verify dashboard header displays correctly with title, user info, logout button
  - Step 7: Verify loading state appears briefly
  - Step 8: Verify user cards load and display (should show 25 cards)
  - Step 9: Verify each card displays all required information (avatar, name, role, department, email, status)
  - Step 10: Verify responsive grid layout (1 col mobile, 2 col tablet, 3-4 col desktop) - resize browser
  - Step 11: Test search functionality - enter "sarah" and verify filtering works
  - Step 12: Clear search and verify all cards return
  - Step 13: Test department filter - select "Engineering" and verify filtering
  - Step 14: Test combined search and filter
  - Step 15: Test search with no results - enter "zzzzz" and verify empty state
  - Step 16: Clear filters and verify cards return
  - Step 17: Verify status badges show correct colors (green for active, gray for inactive)
  - Step 18: Verify email links are clickable (mailto:)
  - Step 19: Test logout button functionality
  - Step 20: Check console for errors
  - Step 21: Stop dev server
- Include success criteria for each step
- Define failure scenarios
- Specify screenshot captures for each major step (use descriptive names)
- Include output format JSON structure
- Add cleanup instructions

### 15. Validate TypeScript Compilation
- Run TypeScript compiler to ensure no type errors
- Execute: `cd app/nextjs && npx tsc --noEmit`
- Verify exit code is 0 (no errors)
- Fix any type errors if they appear
- Ensure all new components are properly typed

### 16. Run Validation Commands
- Execute all commands in the Validation Commands section below
- Ensure TypeScript compilation passes with zero errors
- Verify ESLint passes with no warnings or errors
- Confirm production build completes successfully
- Run the E2E test by reading and executing the test specification
- Fix any issues that arise during validation
- Ensure all tests pass before considering the feature complete

## Testing Strategy

### Unit Tests
While this feature focuses on integration with E2E tests, consider these unit test scenarios for future implementation:
- UserCard component renders all user properties correctly
- UserCard displays correct status badge color based on user status
- SearchBar component calls onChange handler when input changes
- DepartmentFilter component renders all department options
- EmptyState component displays custom title and message
- ErrorState component calls onRetry when button is clicked
- LoadingSpinner component renders with correct size prop

### Edge Cases
- Empty search query should show all users
- Search with no matches should show empty state
- Department filter "All Departments" should show all users
- Combined search and department filter should apply both filters
- Search is case-insensitive (searching "SARAH" should match "Sarah Johnson")
- Search matches partial strings (searching "dev" should match "Developer")
- User with inactive status shows gray badge instead of green
- API error displays error state with retry button
- Retry button successfully refetches data after error
- Multiple rapid filter changes don't cause race conditions
- Long user names, roles, or departments don't break card layout
- Email links properly encode special characters
- Page remains protected - accessing /dashboard without auth redirects to /login
- Logout button works from dashboard and redirects to login
- Browser resize updates grid layout responsively
- Avatar images handle loading and error states gracefully

## Acceptance Criteria
- Dashboard page is accessible at /dashboard route and requires authentication
- Unauthenticated users are redirected to /login when accessing /dashboard
- Dashboard displays all 25 user profiles as cards in a responsive grid layout
- Grid shows 1 column on mobile (<768px), 2 columns on tablet (768-1023px), 3-4 columns on desktop (≥1024px)
- Each user card displays: avatar image, name, role, department, email (as clickable mailto link), and status badge
- Status badges show green color for "active" users and gray color for "inactive" users
- Dashboard header shows: page title, logged-in user information (username, role), and logout button
- Search functionality filters users in real-time by name, email, or role (case-insensitive partial matching)
- Department filter dropdown displays all unique departments plus "All Departments" option
- Department filter correctly filters users when a specific department is selected
- Search and department filter work together (applying both filters simultaneously)
- Loading spinner displays while fetching user data from API
- Empty state displays when search/filter returns no results with appropriate message
- Error state displays when API call fails with retry button
- Retry button successfully refetches data after API error
- All UI elements are styled consistently with Tailwind CSS matching the app's design
- Cards have hover effects for better interactivity
- Logout button successfully logs out user and redirects to login page
- Page is responsive and looks good on all screen sizes (mobile, tablet, desktop)
- No TypeScript compilation errors
- Production build completes successfully without errors
- E2E test passes all validation steps

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute your new E2E `.claude/commands/e2e/test_dashboard_user_cards.md` test file to validate this functionality works.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation check to ensure no type errors
- `cd app/nextjs && npm run lint` - Run ESLint to ensure code quality and catch potential issues
- `cd app/nextjs && npm run build` - Run production build to ensure the feature builds correctly
- `cd app/server && uv run pytest` - Run server tests to validate no backend regressions
- `cd app/client && bun run build` - Run Vite client build to validate no regressions in the legacy client

## Notes

### Design Considerations
- The dashboard replaces the existing basic dashboard page that only showed authentication info
- User cards should be visually appealing with proper spacing and typography hierarchy
- Avatar images use the UI Avatars service which generates initials-based avatars
- The responsive grid ensures good user experience on all devices
- Search and filter provide powerful user discovery capabilities without additional API calls
- Real-time filtering improves UX by providing instant feedback

### Integration with Existing Systems
- Uses existing authentication system (AuthContext, useAuth hook) for route protection
- Leverages existing mock API service (getAllUsers, searchUsers, getUsersByDepartment)
- Works with existing Navigation component which already has dashboard link and logout button
- Maintains consistent styling with login page and other existing pages
- Uses existing TypeScript types (User, ApiResponse) without modifications

### Performance Considerations
- Initial load fetches all 25 users at once (acceptable for mock data)
- Search and filtering happen client-side for instant feedback
- No need for pagination with only 25 users
- Consider adding pagination or infinite scroll if user count grows significantly
- Mock API simulates 500-1000ms delay to test loading states realistically

### Future Enhancements
- Add sorting options (by name, date joined, department)
- Implement detailed user profile view (modal or separate page)
- Add user actions (edit, delete, contact) for admin users
- Export user list to CSV or PDF
- Add user statistics dashboard (total users, active vs inactive, department breakdown)
- Implement role-based access control (different views for admin vs regular user)
- Add user presence indicators (online/offline status)
- Implement real backend integration to replace mock API
- Add pagination for scalability with larger user counts
- Implement advanced search with multiple criteria

### Accessibility Notes
- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels to search input and department filter
- Status badges should have sufficient color contrast
- Consider adding screen reader text for status badges
- Email links should be properly announced by screen readers
- Loading and error states should be announced to assistive technologies

### Browser Compatibility
- Tailwind CSS grid layout works in all modern browsers
- Consider adding fallback for older browsers if needed
- Test on Chrome, Firefox, Safari, and Edge
- Verify responsive breakpoints work consistently across browsers
