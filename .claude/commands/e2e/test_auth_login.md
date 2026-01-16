# E2E Test: Authentication and Login Flow

## Test Metadata
- Test Name: Authentication and Login Flow
- Test ID: test_auth_login
- Application URL: http://localhost:3000
- Purpose: Validate that the authentication system works correctly including login, logout, protected routes, and session management

## User Story
As a user, I want to securely log in with my credentials, access protected content, and have my session maintained across page reloads, so that I can use the application securely and conveniently.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system implemented with mock credentials

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, authentication types properly defined

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-auth-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Navigate to Home Page (Unauthenticated)
**Action:** Open http://localhost:3000 in Playwright browser
**Verify:** Should redirect to /login since user is not authenticated
**Expected:** URL changes to http://localhost:3000/login
**Screenshot:** 01_redirect_to_login.png

### Step 4: Verify Login Page Elements
**Action:** Check that login page renders correctly
**Verify:**
- Login form is visible
- Username input field exists
- Password input field exists
- Submit button is present with text "Sign in"
- Page heading "Sign in to your account" is visible
- Instructions showing mock credentials are present
**Expected:** All login form elements render correctly
**Screenshot:** 02_login_page.png

### Step 5: Test Login with Empty Credentials
**Action:** Click submit button without entering credentials
**Verify:** Form validation prevents submission or shows error
**Expected:** Error message "Username and password are required" appears
**Screenshot:** 03_empty_credentials_error.png

### Step 6: Test Login with Invalid Credentials
**Action:** Enter invalid credentials (username: "wrong", password: "wrong123")
**Verify:** Error message appears
**Expected:** Error message "Invalid username or password" is displayed
**Screenshot:** 04_invalid_credentials_error.png

### Step 7: Test Login with Valid Admin Credentials
**Action:** Enter valid admin credentials (username: "admin", password: "admin123")
**Verify:**
- Form submits successfully
- Page redirects to /dashboard
- No error messages appear
**Expected:** User is logged in and redirected to dashboard
**Screenshot:** 05_successful_login.png

### Step 8: Verify Dashboard Page
**Action:** Check dashboard page content
**Verify:**
- Dashboard page loads at /dashboard
- Welcome message is visible
- Username "admin" is displayed
- User role "admin" is shown
- Logout button is present
**Expected:** Dashboard displays user information correctly
**Screenshot:** 06_dashboard_page.png

### Step 9: Verify Navigation with Authentication
**Action:** Check navigation bar for authenticated user
**Verify:**
- Username "admin" is visible in navigation
- Dashboard link is present
- Logout button is visible in navigation
- Login button is NOT visible
**Expected:** Navigation shows authenticated user controls
**Screenshot:** 07_authenticated_navigation.png

### Step 10: Navigate to Home Page (Authenticated)
**Action:** Click on "Home" link in navigation
**Verify:**
- Home page loads successfully
- User remains authenticated
- Home page content is visible
**Expected:** Authenticated users can access home page
**Screenshot:** 08_home_page_authenticated.png

### Step 11: Verify Protected Route Access
**Action:** Navigate directly to /dashboard via URL
**Verify:** Dashboard is accessible without redirecting
**Expected:** Protected route allows authenticated user access
**Screenshot:** 09_protected_route_access.png

### Step 12: Test Session Persistence
**Action:** Reload the page (simulate browser refresh)
**Verify:**
- User remains logged in after refresh
- Dashboard content is still visible
- No redirect to login page occurs
**Expected:** Session persists across page reloads
**Screenshot:** 10_session_persistence.png

### Step 13: Check Local Storage Token
**Action:** Inspect localStorage for auth token using browser evaluate
**Verify:** auth_token exists in localStorage
**Expected:** Token is stored and retrievable

### Step 14: Test Logout Functionality
**Action:** Click logout button in navigation or dashboard
**Verify:**
- User is logged out
- Redirects to /login page
- Navigation no longer shows user info
**Expected:** Logout clears session and redirects to login
**Screenshot:** 11_logout_redirect.png

### Step 15: Verify Token Removal After Logout
**Action:** Check localStorage after logout
**Verify:** auth_token is removed from localStorage
**Expected:** Token is cleared from storage

### Step 16: Test Protected Route After Logout
**Action:** Try to navigate to /dashboard after logout
**Verify:** Should redirect back to /login
**Expected:** Protected routes are inaccessible when not authenticated
**Screenshot:** 12_protected_route_blocked.png

### Step 17: Test Login Page Redirect When Authenticated
**Action:** Log in again with valid credentials, then try to access /login
**Verify:** Should redirect to /dashboard instead of showing login page
**Expected:** Authenticated users cannot access login page
**Screenshot:** 13_login_redirect_when_authenticated.png

### Step 18: Test Second User Login
**Action:** Logout if logged in, then login with user credentials (username: "user", password: "user123")
**Verify:**
- Login succeeds
- Redirects to dashboard
- Username "user" is displayed
- Role "user" is shown
**Expected:** Different user credentials work correctly
**Screenshot:** 14_user_login_success.png

### Step 19: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings related to authentication
**Expected:** Clean console output

### Step 20: Verify Network Requests
**Action:** Check network requests in browser dev tools
**Verify:** All resources load successfully, no 401 or authentication errors
**Expected:** No failed network requests

### Step 21: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Unauthenticated users are redirected to /login
- ✅ Login page renders with all form elements
- ✅ Empty credentials show validation error
- ✅ Invalid credentials show error message
- ✅ Valid credentials successfully authenticate
- ✅ Successful login redirects to /dashboard
- ✅ Dashboard displays user information correctly
- ✅ Navigation shows authenticated user controls
- ✅ Protected routes are accessible when authenticated
- ✅ Session persists across page reloads
- ✅ Token is stored in localStorage
- ✅ Logout clears session and redirects to login
- ✅ Token is removed from localStorage after logout
- ✅ Protected routes redirect to login when not authenticated
- ✅ Login page redirects to dashboard when already authenticated
- ✅ Multiple user accounts work correctly
- ✅ No console errors during authentication flow
- ✅ All network requests succeed

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Unauthenticated access to protected routes is allowed
- Login form validation doesn't work
- Valid credentials fail to authenticate
- Invalid credentials don't show error message
- Successful login doesn't redirect to dashboard
- Dashboard doesn't display user information
- Navigation doesn't update with auth state
- Session doesn't persist after page reload
- Logout doesn't clear session properly
- Protected routes accessible after logout
- Login page accessible when already authenticated
- Console contains authentication-related errors
- Token not properly stored or retrieved

## Output Format
```json
{
  "test_name": "Authentication and Login Flow",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/auth_login/01_redirect_to_login.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/02_login_page.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/03_empty_credentials_error.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/04_invalid_credentials_error.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/05_successful_login.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/06_dashboard_page.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/07_authenticated_navigation.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/08_home_page_authenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/09_protected_route_access.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/10_session_persistence.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/11_logout_redirect.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/12_protected_route_blocked.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/13_login_redirect_when_authenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/auth_login/14_user_login_success.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
