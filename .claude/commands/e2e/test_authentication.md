# E2E Test: Authentication Flow

Test complete authentication functionality including registration, login, and logout in the Natural Language SQL Interface application.

## User Story

As a new user
I want to register an account, login, and access protected features
So that my data and queries are secure and private

## Test Steps

### Part 1: Registration

1. Navigate to the `Application URL` (should redirect to /login.html)
2. Take a screenshot of the login page
3. **Verify** the page title contains "Login"
4. **Verify** login form elements are present:
   - Username input field
   - Password input field
   - Sign In button
   - Link to registration page

5. Click the "Create one" link to navigate to registration
6. **Verify** URL changes to `/register.html`
7. Take a screenshot of the registration page
8. **Verify** registration form elements are present:
   - Username input field
   - Email input field
   - Password input field
   - Confirm Password input field
   - Create Account button

9. Fill in registration form with test data:
   - Username: "testuser123"
   - Email: "testuser123@example.com"
   - Password: "TestPassword123!"
   - Confirm Password: "TestPassword123!"

10. Take a screenshot of the filled form
11. Click "Create Account" button
12. **Verify** redirect to main application (/)
13. Take a screenshot of the authenticated state
14. **Verify** user info is displayed in header showing "testuser123"
15. **Verify** logout button is visible

### Part 2: Logout and Re-login

16. Click the "Logout" button
17. **Verify** redirect to `/login.html`
18. Take a screenshot after logout
19. **Verify** cannot access main application without authentication
20. Navigate to `/` directly
21. **Verify** automatic redirect to `/login.html`

22. Fill in login form:
    - Username: "testuser123"
    - Password: "TestPassword123!"

23. Take a screenshot of the filled login form
24. Click "Sign In" button
25. **Verify** redirect to main application (/)
26. Take a screenshot of the logged-in state
27. **Verify** user info displays "testuser123"
28. **Verify** user remains authenticated on page reload
29. Reload the page
30. Take a screenshot after reload
31. **Verify** still logged in (user info still displayed)

### Part 3: Protected API Endpoints

32. **Verify** API requests include authentication token:
    - Try uploading a file (should work with auth)
    - Try accessing schema endpoint (should work with auth)

33. Clear authentication token from localStorage:
    - Run: `localStorage.removeItem('auth_token')`
34. Try to access an API endpoint without token
35. **Verify** redirect to login page occurs

## Success Criteria

- Registration page loads correctly
- New user can register with valid credentials
- Registration validates password confirmation
- Successful registration redirects to main app
- User info displays after authentication
- Logout clears session and redirects to login
- Login works with registered credentials
- Authentication persists across page reloads
- Protected routes redirect to login when not authenticated
- API requests include authentication token
- Requests without token trigger redirect to login
- All screenshots capture key states (8 total)

## Error Cases to Test

- Registration with duplicate username (should show error)
- Registration with duplicate email (should show error)
- Login with invalid credentials (should show error)
- Password and confirm password mismatch (should show error)
- Email format validation (invalid email should show error)
- Password too short (less than 8 characters, should show error)

## Application URL

http://localhost:5173
