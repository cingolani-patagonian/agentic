# Feature: Create user details page on card click

## Metadata
issue_number: `25`
adw_id: `d54beab1`
issue_json: `{"number":25,"title":"Create user details page on card click","body":"Implement a user details page that displays when clicking on a user profile card.\n\n**Description:**\nCreate a dedicated page or modal that shows detailed information about a user when their card is clicked.\n\n**Acceptance Criteria:**\n- Clicking a user card should navigate to or open a user details view\n- Details page should display comprehensive user information (name, email, department, avatar, etc.)\n- Include a way to return to the main dashboard\n- Route should be shareable (e.g., /users/[id])\n- Maintain consistent design with the rest of the application"}`

## Feature Description
This feature adds a dedicated user details page that displays comprehensive user information when clicking on a user profile card from the dashboard. Users will be able to view detailed information about team members including their name, email, department, role, location, bio, join date, status, and avatar. The page will be accessible via a shareable URL route (`/users/[id]`) and will include navigation back to the dashboard. This feature enhances the application by providing a deeper view into user profiles beyond the summary shown on cards.

## User Story
As a team member or manager
I want to click on a user profile card and view detailed information about that person
So that I can learn more about my colleagues, their roles, departments, and contact information without cluttering the main dashboard view

## Problem Statement
Currently, the dashboard displays user cards with basic information (name, email, role, department, location, status), but there's no way to view additional details about a user. The UserCard component has an optional `onClick` handler that isn't being used. Users need a way to access comprehensive information about team members, including their bio, join date, and other details that don't fit on the compact card view. Additionally, users should be able to share direct links to specific user profiles.

## Solution Statement
Implement a dynamic Next.js route at `/users/[id]` that displays a comprehensive user details page. Update the dashboard to pass an onClick handler to UserCard components that navigates to the details page. The details page will fetch user data by ID, display all available user information in an organized layout, include the user's avatar with fallback support, and provide a back button to return to the dashboard. The route will be shareable, allowing users to directly access specific user profiles via URL.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/app/dashboard/page.tsx` - Main dashboard page that displays user cards. Need to add onClick handler to UserCard components to navigate to user details page at line 246.

- `app/nextjs/components/UserCard.tsx` - User card component that already supports optional onClick prop. Will receive navigation handler from dashboard to route to `/users/[id]` when clicked.

- `app/nextjs/lib/api.ts` - API service module that provides `getUserById()` function for fetching individual user data. Already implemented at line 187-212 with proper error handling and retry logic.

- `app/nextjs/types/index.ts` - TypeScript type definitions including the User interface with all required fields (id, name, email, role, avatar, department, location, bio, joinDate, status).

- `app/nextjs/components/Navigation.tsx` - Navigation component for reference on header styling and layout patterns to maintain consistent design.

- `app/nextjs/components/LoadingSpinner.tsx` - Loading spinner component to display while fetching user data.

- `app/nextjs/components/ErrorState.tsx` - Error state component to display if user data fails to load or user is not found.

- `README.md` - Project documentation for understanding the application architecture and Next.js setup.

- `.claude/commands/conditional_docs.md` - Documentation guide for determining which additional docs to read.

- `.claude/commands/test_e2e.md` - E2E testing framework guide for understanding how to create test specifications.

- `.claude/commands/e2e/test_user_card_component.md` - Example E2E test showing how to test user card interactions and navigation.

### New Files

- `app/nextjs/app/users/[id]/page.tsx` - Dynamic route page component for displaying user details. Will use Next.js dynamic routing with `[id]` parameter to fetch and display individual user information.

- `.claude/commands/e2e/test_user_details_page.md` - E2E test specification for validating the user details page functionality, navigation, data display, error handling, and back button.

## Implementation Plan

### Phase 1: Foundation
Create the foundational dynamic route structure and set up the user details page component with basic layout. This includes creating the `/users/[id]` directory structure in the Next.js app router, implementing the page component with TypeScript types, and setting up the basic page layout with authentication guards similar to the dashboard.

### Phase 2: Core Implementation
Implement the core user details page functionality including data fetching using the existing `getUserById()` API, comprehensive user information display, avatar display with fallback support, loading and error states, and responsive design. Ensure the page displays all User type fields (name, email, role, department, location, bio, joinDate, status, avatar) in an organized, visually appealing layout that matches the application's design system.

### Phase 3: Integration
Integrate the user details page with the dashboard by adding onClick handlers to UserCard components that navigate to `/users/[id]`. Implement the back button to return to the dashboard, ensure shareable URLs work correctly with proper authentication handling, and create comprehensive E2E tests to validate the entire user flow from dashboard card click to details page view and back.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Research existing patterns and architecture
- Read `README.md` to understand the Next.js application structure
- Read `.claude/commands/conditional_docs.md` to identify relevant documentation
- Read `app_docs/feature-216fce1d-user-card-component.md` for UserCard component details
- Read `app_docs/feature-4c8ea440-dashboard-user-profiles.md` for dashboard patterns
- Read `app_docs/feature-ca241132-auth-system.md` for authentication patterns
- Review existing Next.js pages to understand layout and structure patterns

### Task 2: Create the dynamic route structure
- Create directory: `app/nextjs/app/users/[id]/`
- Create file: `app/nextjs/app/users/[id]/page.tsx` with basic Next.js page structure
- Set up the page as a client component with 'use client' directive (needed for auth and state)
- Add TypeScript imports for User type, API functions, and UI components
- Implement authentication guard similar to dashboard (redirect to login if not authenticated)

### Task 3: Implement data fetching for user details
- Extract the user ID from Next.js params using `useParams()` hook
- Call `getUserById()` from `lib/api.ts` to fetch user data
- Implement loading state using `isLoading` state variable
- Implement error state handling for API failures and user not found scenarios
- Use existing `LoadingSpinner` and `ErrorState` components for UI feedback

### Task 4: Design and implement user details page layout
- Create responsive page header with back button and page title
- Design main content area with two-column layout on desktop, single-column on mobile
- Create user profile section with large avatar display (with fallback support using same pattern as UserCard)
- Add user status badge with same styling as UserCard component
- Organize user information into logical sections (Profile, Contact, Organization, Additional)

### Task 5: Display comprehensive user information
- Display user name as page heading (h1)
- Show role and department prominently
- Display email as clickable mailto link
- Show location with appropriate icon or label
- Display bio in a text block with proper text wrapping
- Format and display join date (e.g., "Joined: January 15, 2023")
- Show status badge (active/inactive) with color coding
- Ensure all fields handle missing data gracefully

### Task 6: Implement navigation and back button
- Add back button in page header that navigates to `/dashboard`
- Use Next.js `useRouter()` hook for navigation
- Style back button consistently with application design (similar to logout button)
- Add keyboard accessibility (Tab, Enter) for back button
- Add aria-label for screen reader support

### Task 7: Add styling and responsive design
- Apply Tailwind CSS classes for consistent styling with dashboard
- Implement responsive breakpoints (mobile-first design)
- Use similar color scheme and spacing as dashboard and user cards
- Ensure proper padding and margins for mobile, tablet, and desktop
- Add subtle animations/transitions for page load if appropriate
- Test layout at multiple viewport sizes

### Task 8: Integrate user details page with dashboard
- Open `app/nextjs/app/dashboard/page.tsx`
- Add navigation logic using `useRouter()` hook
- Create `handleUserClick` function that navigates to `/users/[userId]`
- Pass `onClick={handleUserClick}` prop to all UserCard components (line 246)
- Ensure the user ID is passed correctly to the navigation function

### Task 9: Test shareable URLs and direct access
- Verify that directly accessing `/users/[id]` with valid ID loads correctly
- Test with invalid user IDs to ensure proper error handling
- Verify authentication guard redirects unauthenticated users to login
- Test URL sharing functionality (copy URL, open in new tab)
- Ensure page maintains state when refreshed

### Task 10: Create E2E test specification
- Read `.claude/commands/test_e2e.md` to understand E2E test format
- Read `.claude/commands/e2e/test_user_card_component.md` as example
- Create `.claude/commands/e2e/test_user_details_page.md`
- Include test steps for: clicking card from dashboard, verifying navigation, checking all user data displays, testing back button, testing direct URL access, testing error states (invalid ID, not found), testing loading states, testing responsive design, testing authentication guard
- Specify screenshots for key validation points
- Define clear success criteria and failure scenarios

### Task 11: Run validation commands
- Execute TypeScript compilation check: `cd app/nextjs && npx tsc --noEmit`
- Execute linting check: `cd app/nextjs && npm run lint`
- Execute production build: `cd app/nextjs && npm run build`
- Read and execute the new E2E test file created in Task 10
- Verify zero regressions in existing dashboard functionality

## Testing Strategy

### Unit Tests
- User details page renders correctly with valid user data
- Loading state displays LoadingSpinner component
- Error state displays ErrorState component with retry functionality
- Back button navigates to /dashboard
- Avatar fallback displays user initials when image fails
- All user fields display correctly with proper formatting
- Missing optional fields (like location or bio) are handled gracefully
- Invalid user IDs trigger appropriate error messages
- Authentication guard redirects unauthenticated users

### Integration Tests
- Dashboard onClick handler navigates to correct /users/[id] route
- User ID parameter is extracted correctly from URL
- getUserById API is called with correct user ID
- Page updates correctly when navigating between different users
- Browser back button returns to dashboard with filters preserved
- Direct URL access loads user details correctly

### Edge Cases
- User with very long name or bio text wraps correctly
- User with missing avatar displays fallback initials
- User with missing optional fields (location, bio) doesn't break layout
- Invalid user ID shows appropriate "User not found" error
- Network failure displays error with retry option
- Rapid navigation between users doesn't cause race conditions
- Unauthenticated users are redirected to login page
- Very long email addresses don't break layout
- Special characters in user data display correctly
- Page works correctly on slow network connections

## Acceptance Criteria
- Clicking a user card on the dashboard navigates to `/users/[id]` route
- User details page displays all comprehensive user information (name, email, department, role, location, bio, joinDate, status, avatar)
- Avatar displays with automatic fallback to user initials if image fails
- Page includes a functional back button that returns to the dashboard
- Route is shareable - direct URL access works correctly (e.g., `/users/usr_1a2b3c4d5e6f`)
- Page maintains consistent design with the rest of the application (colors, fonts, spacing, layout)
- Loading state displays while fetching user data
- Error state displays for invalid user IDs or API failures with retry option
- Page is fully responsive (mobile, tablet, desktop)
- Authentication guard redirects unauthenticated users to login
- All interactive elements are keyboard accessible
- Screen readers can navigate content clearly with proper ARIA labels
- TypeScript compiles without errors
- Production build succeeds without warnings
- E2E tests pass successfully

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute your new E2E `.claude/commands/e2e/test_user_details_page.md` test file to validate this functionality works.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation check
- `cd app/nextjs && npm run lint` - Run linting check to ensure code quality
- `cd app/nextjs && npm run build` - Run production build to validate the feature works with zero regressions
- Test manual navigation: Start dev server, login, click user card, verify navigation to details page
- Test direct URL access: Navigate directly to `/users/usr_1a2b3c4d5e6f` and verify page loads
- Test back button: From user details page, click back button, verify return to dashboard
- Test invalid ID: Navigate to `/users/invalid-id` and verify error state displays
- Test loading state: Observe loading spinner on page load (may need to throttle network)
- Test responsive design: Resize browser to mobile, tablet, desktop sizes and verify layout
- Test authentication: Logout, try to access `/users/[id]` directly, verify redirect to login

## Notes
- The UserCard component already supports the onClick prop, so integration with the dashboard should be straightforward
- The getUserById API function is already implemented in lib/api.ts with proper error handling and retry logic
- Use the same avatar fallback pattern as UserCard component for consistency
- Consider using Next.js Link component for the back button to enable prefetching
- The page should follow the same authentication pattern as the dashboard (redirect to /login if not authenticated)
- Format the join date in a user-friendly format (e.g., "January 15, 2023" or "Jan 15, 2023")
- Consider adding a subtle animation when the page loads to enhance UX
- Ensure proper meta tags for SEO if needed in the future
- The bio field should support line breaks if present in the data
- Consider adding a "Contact" button that opens the default email client with the user's email pre-filled
- Future enhancement: Add edit functionality for authorized users (admin role)
- Future enhancement: Add breadcrumb navigation (Dashboard > User Details > [Name])
