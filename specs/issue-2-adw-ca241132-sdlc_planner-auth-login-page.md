# Feature: Authentication System with Login Page

## Metadata
issue_number: `2`
adw_id: `ca241132`
issue_json: `{"number":2,"title":"Implement authentication system with login page","body":"# Issue #2: Authentication System with Login Page\n\n**Title:** Implement authentication system with login page\n\n**Labels:** feature, authentication\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nCreate a complete authentication system with a login page for the user profiles application.\n\n## Requirements\n\n- Create login page at `/login` route\n- Implement mock authentication service:\n  - Accept hardcoded credentials (username: \"admin\", password: \"admin123\")\n  - Generate and store JWT-like token in localStorage\n  - Session management\n- Protected route middleware to secure dashboard\n- Redirect to login if not authenticated\n- Redirect to dashboard if already authenticated\n- Login form with:\n  - Username input field\n  - Password input field\n  - Submit button\n  - Form validation\n  - Error messages for invalid credentials\n- Logout functionality\n- Responsive design with Tailwind CSS\n\n## Mock Credentials\n\n```typescript\nconst MOCK_USERS = [\n  { username: \"admin\", password: \"admin123\", role: \"admin\" },\n  { username: \"user\", password: \"user123\", role: \"user\" }\n];\n```\n\n## Acceptance Criteria\n\n- Login page is accessible at `/login`\n- Valid credentials redirect to dashboard\n- Invalid credentials show error message\n- Protected routes redirect unauthenticated users to login\n- Logout clears session and redirects to login\n- UI is responsive and user-friendly"}`

## Feature Description
This feature implements a complete authentication system for the Next.js application, including a login page, mock authentication service with JWT-like token management, protected route middleware, and session management. The system will secure the application by requiring users to authenticate before accessing protected routes, with proper redirects for authenticated and unauthenticated users.

## User Story
As a user of the application
I want to securely log in with my credentials
So that I can access protected content and have my session maintained across page reloads

## Problem Statement
The current Next.js application lacks any authentication mechanism, leaving all routes publicly accessible without user verification. This creates security concerns and prevents the implementation of user-specific features. Users need a way to authenticate themselves, and the application needs to protect routes that should only be accessible to authenticated users.

## Solution Statement
Implement a client-side authentication system using Next.js App Router with:
1. A dedicated login page at `/login` route with form validation
2. A mock authentication service that validates credentials against hardcoded users and generates JWT-like tokens
3. Client-side middleware to protect routes and redirect unauthenticated users
4. Session management using localStorage for token persistence
5. Automatic token validation on page load and API calls
6. Logout functionality that clears session and redirects to login
7. Responsive UI design using Tailwind CSS

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/app/layout.tsx` - Root layout component with Navigation, will need to handle authentication state and show/hide logout button
- `app/nextjs/app/page.tsx` - Home page, will become a protected route requiring authentication
- `app/nextjs/components/Navigation.tsx` - Navigation component, will need to display logout button for authenticated users
- `app/nextjs/lib/utils.ts` - Utility functions, will be extended with authentication utilities
- `app/nextjs/types/index.ts` - Type definitions, will include authentication-related types
- `app/nextjs/tailwind.config.ts` - Tailwind configuration, already set up for styling
- `app/nextjs/next.config.js` - Next.js configuration, may need updates for authentication flow
- `.claude/commands/test_e2e.md` - E2E test runner documentation to understand how to create E2E tests
- `.claude/commands/e2e/test_nextjs_setup.md` - Example E2E test to understand the format and structure

### New Files

- `app/nextjs/app/login/page.tsx` - Login page component with form, validation, and error handling
- `app/nextjs/lib/auth.ts` - Authentication service with mock user validation, token generation, and session management
- `app/nextjs/middleware.ts` - Next.js middleware for route protection and authentication checks
- `app/nextjs/app/dashboard/page.tsx` - Protected dashboard page to demonstrate authentication working
- `app/nextjs/hooks/useAuth.tsx` - Custom React hook for authentication state management
- `app/nextjs/contexts/AuthContext.tsx` - React context for global authentication state
- `.claude/commands/e2e/test_auth_login.md` - E2E test file to validate authentication functionality

## Implementation Plan

### Phase 1: Foundation
1. Create TypeScript types and interfaces for authentication (User, AuthToken, LoginCredentials)
2. Set up authentication context and provider for global state management
3. Create custom hook (useAuth) for accessing authentication state and methods
4. Implement core authentication service with mock user validation and token management

### Phase 2: Core Implementation
1. Build login page component with form, validation, and error handling
2. Implement authentication middleware for route protection
3. Create protected dashboard page to demonstrate authentication
4. Add token validation and automatic logout on token expiration
5. Implement session persistence using localStorage

### Phase 3: Integration
1. Update Navigation component to show/hide logout button based on auth state
2. Integrate authentication context into root layout
3. Add redirect logic for authenticated users visiting login page
4. Test authentication flow end-to-end with different user roles
5. Ensure responsive design works across different screen sizes

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create authentication types and interfaces
- Define User interface with username, role properties
- Define AuthToken interface with token and expiresAt properties
- Define LoginCredentials interface with username and password
- Define AuthContextType interface for context methods and state
- Add all types to `app/nextjs/types/index.ts`

### 2. Create authentication service
- Create `app/nextjs/lib/auth.ts` with mock user credentials
- Implement validateCredentials function to check username/password
- Implement generateToken function to create JWT-like tokens with expiration
- Implement saveToken function to store token in localStorage
- Implement getToken function to retrieve token from localStorage
- Implement removeToken function to clear token from localStorage
- Implement isTokenValid function to check token expiration
- Implement getCurrentUser function to decode user from token
- Export all authentication functions

### 3. Create authentication context and provider
- Create `app/nextjs/contexts/AuthContext.tsx` with React Context
- Define AuthContext with user state, loading state, and auth methods
- Implement AuthProvider component with login, logout, and checkAuth methods
- Add token validation on mount to restore session
- Handle loading states during authentication checks
- Export AuthContext and AuthProvider

### 4. Create useAuth custom hook
- Create `app/nextjs/hooks/useAuth.tsx`
- Implement useAuth hook that accesses AuthContext
- Add error handling for usage outside of AuthProvider
- Export useAuth hook for use in components

### 5. Create login page component
- Create `app/nextjs/app/login/page.tsx`
- Build form with username and password input fields
- Add form validation (required fields, min length)
- Implement submit handler that calls authentication service
- Add error message display for invalid credentials
- Add loading state during login attempt
- Style with Tailwind CSS for responsive design
- Add redirect to dashboard on successful login
- Add "Already logged in" redirect if user is authenticated

### 6. Create authentication middleware
- Create `app/nextjs/middleware.ts` for Next.js middleware
- Implement matcher to protect specific routes (/, /dashboard)
- Check for valid token in cookies or headers
- Redirect unauthenticated users to /login
- Allow access to /login for unauthenticated users
- Redirect authenticated users away from /login to dashboard

### 7. Create protected dashboard page
- Create `app/nextjs/app/dashboard/page.tsx`
- Display welcome message with username
- Show user role information
- Add logout button
- Style with Tailwind CSS
- Make it accessible only to authenticated users

### 8. Update Navigation component
- Modify `app/nextjs/components/Navigation.tsx`
- Use useAuth hook to access authentication state
- Show logout button when user is authenticated
- Hide logout button when user is not authenticated
- Implement logout handler that calls auth service
- Add redirect to /login after logout
- Add Dashboard link for authenticated users

### 9. Integrate authentication into root layout
- Update `app/nextjs/app/layout.tsx`
- Wrap children with AuthProvider
- Ensure Navigation has access to auth context
- Handle loading states during auth checks

### 10. Update home page for protected access
- Update `app/nextjs/app/page.tsx`
- Add authentication check using useAuth hook
- Show loading state while checking authentication
- Redirect to /login if not authenticated
- Display content only for authenticated users

### 11. Create E2E test file for authentication
- Create `.claude/commands/e2e/test_auth_login.md`
- Read `.claude/commands/test_e2e.md` to understand E2E test format
- Read `.claude/commands/e2e/test_nextjs_setup.md` for reference
- Define test steps for login flow validation
- Include steps to test invalid credentials
- Include steps to test successful login and redirect
- Include steps to test logout functionality
- Include steps to test protected route access
- Define success criteria and failure scenarios
- Specify screenshots to capture at each step

### 12. Run validation commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any issues that arise during validation
- Ensure all tests pass before completing the feature

## Testing Strategy

### Unit Tests
- Test authentication service functions (validateCredentials, generateToken, isTokenValid)
- Test useAuth hook behavior with different authentication states
- Test login form validation logic
- Test token expiration handling
- Test middleware redirect logic

### Edge Cases
- Invalid credentials with various formats (empty, wrong password, non-existent user)
- Token expiration during active session
- Multiple tabs with same authenticated user
- Manual token manipulation in localStorage
- Attempting to access protected routes without authentication
- Attempting to access /login while already authenticated
- Page refresh while authenticated (session persistence)
- Logout from multiple tabs simultaneously
- Very long usernames or passwords
- Special characters in credentials

## Acceptance Criteria
- Login page is accessible at `/login` and renders correctly
- Form validation prevents submission with empty fields
- Invalid credentials display clear error message
- Valid credentials (admin/admin123 or user/user123) successfully authenticate
- Successful login redirects to /dashboard
- Authentication token is stored in localStorage
- Protected routes (/, /dashboard) redirect unauthenticated users to /login
- Authenticated users cannot access /login (redirected to dashboard)
- Logout button is visible in navigation for authenticated users
- Logout clears token and redirects to /login
- Session persists across page refreshes
- UI is fully responsive on mobile, tablet, and desktop
- No console errors during authentication flow
- TypeScript compilation succeeds with no errors
- All existing functionality continues to work

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- Read `.claude/commands/test_e2e.md`, then read and execute the new E2E test file `.claude/commands/e2e/test_auth_login.md` to validate authentication functionality works end-to-end
- `cd app/nextjs && npx tsc --noEmit` - Validate TypeScript compilation with no errors
- `cd app/nextjs && npm run lint` - Validate ESLint passes with no errors
- `cd app/nextjs && npm run build` - Validate production build succeeds

## Notes
- This implementation uses mock authentication with hardcoded credentials. In a production environment, this should be replaced with a real backend authentication API
- Tokens are stored in localStorage for simplicity. Consider using httpOnly cookies for better security in production
- The JWT-like tokens are not actual JWTs in this mock implementation. For production, use a proper JWT library
- Consider adding password hashing even for mock credentials to demonstrate security best practices
- The middleware approach works for client-side route protection but can be bypassed. Real protection requires server-side validation
- Add rate limiting for login attempts in production to prevent brute force attacks
- Consider implementing "Remember Me" functionality for longer session persistence
- Future enhancements could include: password reset, registration, email verification, 2FA, OAuth integration
- The authentication system is designed to be easily replaced with a real backend service by updating the `lib/auth.ts` file
- User roles (admin/user) are included for future role-based access control (RBAC) features
