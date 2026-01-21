# E2E Test: Admin User Management

## Test Metadata
- Test Name: Admin User Management
- Test ID: test_admin_user_management
- Application URL: http://localhost:3000
- Purpose: Validate admin-only user creation, editing, access control, and form validation

## User Story
As an administrator, I want to create new users and edit existing user profiles through an intuitive form interface, so that I can manage the team directory without needing backend access. As a regular user, I should not be able to access admin-only features.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system with admin and regular user credentials
- Admin user management feature implemented

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all admin user management types properly defined

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-admin-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Login as Regular User
**Action:** Navigate to http://localhost:3000/login and login with regular user credentials (username: "user", password: "user123")
**Verify:**
- Login succeeds
- Redirects to /dashboard
**Expected:** User is logged in successfully
**Screenshot:** 01_regular_user_login.png

### Step 4: Verify Regular User Cannot See Admin Features
**Action:** Check dashboard for admin-only features
**Verify:**
- "Add New User" button is NOT visible in dashboard header
- Edit buttons are NOT visible on user cards
**Expected:** Regular users cannot see admin-only features
**Screenshot:** 02_regular_user_dashboard.png

### Step 5: Test Access Denial for Regular User - Create Page
**Action:** Navigate directly to http://localhost:3000/admin/users/new
**Verify:**
- Access is denied
- Error toast message "Access denied. Admin privileges required." appears
- User is redirected back to /dashboard
**Expected:** Regular users cannot access admin create user page
**Screenshot:** 03_regular_user_create_access_denied.png

### Step 6: Test Access Denial for Regular User - Edit Page
**Action:** Navigate directly to http://localhost:3000/admin/users/usr_1a2b3c4d5e6f/edit
**Verify:**
- Access is denied
- Error toast message "Access denied. Admin privileges required." appears
- User is redirected back to /dashboard
**Expected:** Regular users cannot access admin edit user page
**Screenshot:** 04_regular_user_edit_access_denied.png

### Step 7: Logout and Login as Admin
**Action:** Click logout button, then login with admin credentials (username: "admin", password: "admin123")
**Verify:**
- Logout succeeds
- Login with admin credentials succeeds
- Redirects to /dashboard
**Expected:** Admin user is logged in
**Screenshot:** 05_admin_login.png

### Step 8: Verify Admin User Can See Admin Features
**Action:** Check dashboard for admin-only features
**Verify:**
- "Add New User" button IS visible in dashboard header
- Edit buttons ARE visible on user cards (small edit icon in top-right corner)
**Expected:** Admin users can see admin-only features
**Screenshot:** 06_admin_dashboard.png

### Step 9: Navigate to Create User Page
**Action:** Click "Add New User" button
**Verify:**
- Page navigates to /admin/users/new
- Page header shows "Add New User"
- User form is visible with all fields
**Expected:** Create user page loads successfully
**Screenshot:** 07_create_user_page.png

### Step 10: Verify Create User Form Fields
**Action:** Check that all form fields are present
**Verify:**
- Name field (required)
- Email field (required)
- Username field (optional)
- Role dropdown (required)
- Department dropdown (required)
- Location dropdown (required)
- Status dropdown (required)
- Join Date field (required)
- Bio textarea (required)
- Create User button
- Cancel button
**Expected:** All form fields are present and properly labeled
**Screenshot:** 08_create_form_fields.png

### Step 11: Test Form Validation - Empty Fields
**Action:** Click "Create User" button without filling any fields
**Verify:**
- Form does not submit
- Validation errors appear below required fields:
  - "Name is required"
  - "Email is required"
  - "Role is required"
  - "Department is required"
  - "Location is required"
  - "Bio is required"
  - "Join date is required"
  - "Status is required"
**Expected:** Form validation prevents submission with empty fields
**Screenshot:** 09_validation_empty_fields.png

### Step 12: Test Form Validation - Invalid Email
**Action:** Fill in all fields but use invalid email format (e.g., "notanemail")
**Verify:**
- Validation error "Invalid email format" appears below email field
- Form does not submit
**Expected:** Email validation works correctly
**Screenshot:** 10_validation_invalid_email.png

### Step 13: Test Form Validation - Future Join Date
**Action:** Fill in all fields but select a future date for join date
**Verify:**
- Validation error "Join date cannot be in the future" appears
- Form does not submit
**Expected:** Join date validation prevents future dates
**Screenshot:** 11_validation_future_date.png

### Step 14: Test Form Validation - Invalid Username
**Action:** Fill in all fields but use invalid username (e.g., "a" - less than 3 characters)
**Verify:**
- Validation error "Username must be at least 3 characters" appears
- Form does not submit
**Expected:** Username validation enforces minimum length
**Screenshot:** 12_validation_invalid_username.png

### Step 15: Test Cancel Button on Create Form
**Action:** Fill in some fields, then click "Cancel" button
**Verify:**
- Form is abandoned
- User is navigated back to /dashboard
**Expected:** Cancel button navigates back to dashboard
**Screenshot:** 13_create_cancel.png

### Step 16: Successfully Create a New User
**Action:** Click "Add New User" again, fill in all required fields with valid data:
- Name: "Test User"
- Email: "test.user@company.com"
- Username: "testuser"
- Role: "Full Stack Developer"
- Department: "Engineering"
- Location: "San Francisco"
- Status: "active"
- Join Date: "2024-01-15"
- Bio: "This is a test user created for E2E testing purposes."
**Verify:**
- Form submits successfully
- Success toast message "User created successfully!" appears
- User is redirected to /dashboard
**Expected:** New user is created successfully
**Screenshot:** 14_create_success.png

### Step 17: Verify New User Appears in Dashboard
**Action:** Check dashboard for newly created user
**Verify:**
- New user "Test User" appears in user card grid
- User card shows correct information
**Expected:** Newly created user is visible in dashboard
**Screenshot:** 15_new_user_in_dashboard.png

### Step 18: Navigate to User Details Page
**Action:** Click on the newly created user card
**Verify:**
- User details page loads at /users/[id]
- All user information is displayed correctly
- Edit button IS visible (since we're logged in as admin)
**Expected:** User details page shows complete information
**Screenshot:** 16_new_user_details.png

### Step 19: Navigate to Edit User Page from Details
**Action:** Click "Edit User" button on user details page
**Verify:**
- Page navigates to /admin/users/[id]/edit
- Page header shows "Edit User: Test User"
- Form is pre-populated with existing user data
**Expected:** Edit page loads with user data
**Screenshot:** 17_edit_user_page.png

### Step 20: Verify Edit Form is Pre-populated
**Action:** Check that all form fields contain existing user data
**Verify:**
- Name field contains "Test User"
- Email field contains "test.user@company.com"
- Username field contains "testuser"
- Role dropdown shows "Full Stack Developer"
- Department dropdown shows "Engineering"
- Location dropdown shows "San Francisco"
- Status dropdown shows "active"
- Join Date field shows "2024-01-15"
- Bio textarea contains the bio text
**Expected:** All form fields are pre-populated correctly
**Screenshot:** 18_edit_form_prepopulated.png

### Step 21: Test Cancel Button on Edit Form
**Action:** Change some fields, then click "Cancel" button
**Verify:**
- Form changes are abandoned
- User is navigated back to /users/[id] (user details page)
**Expected:** Cancel button navigates back to user details
**Screenshot:** 19_edit_cancel.png

### Step 22: Successfully Edit User
**Action:** Click "Edit User" again, change some fields:
- Role: "Senior Full Stack Developer"
- Location: "New York"
- Bio: "Updated bio for the test user."
**Verify:**
- Form submits successfully
- Success toast message "User updated successfully!" appears
- User is redirected to /users/[id] (user details page)
**Expected:** User is updated successfully
**Screenshot:** 20_edit_success.png

### Step 23: Verify Changes are Reflected
**Action:** Check user details page for updated information
**Verify:**
- Role shows "Senior Full Stack Developer"
- Location shows "New York"
- Bio shows "Updated bio for the test user."
**Expected:** All changes are reflected in user details
**Screenshot:** 21_updated_user_details.png

### Step 24: Navigate Back to Dashboard
**Action:** Click "Back" button to return to dashboard
**Verify:**
- User navigates to /dashboard
- Updated user "Test User" shows updated role in user card
**Expected:** Dashboard shows updated user information
**Screenshot:** 22_updated_user_in_dashboard.png

### Step 25: Test Edit from Dashboard User Card
**Action:** Hover over a user card and click the edit icon (top-right corner)
**Verify:**
- Page navigates to /admin/users/[id]/edit for that user
- Edit form loads correctly
**Expected:** Edit button on user card works correctly
**Screenshot:** 23_edit_from_card.png

### Step 26: Test Form Validation on Edit
**Action:** Clear the email field and click "Update User"
**Verify:**
- Form does not submit
- Validation error "Email is required" appears
**Expected:** Form validation works on edit as well as create
**Screenshot:** 24_edit_validation.png

### Step 27: Verify No Console Errors
**Action:** Open browser console and check for errors
**Verify:**
- No console errors during any admin operations
- No warnings about missing dependencies or invalid props
**Expected:** Application runs without console errors
**Screenshot:** 25_no_console_errors.png

### Step 28: Stop Development Server
**Action:** Stop the development server
```bash
pkill -f "next dev"
```
**Verify:** Server process terminates
**Expected:** Development server stops cleanly

## Success Criteria
- ✅ TypeScript compilation succeeds with no errors
- ✅ Regular users cannot see admin features (no "Add New User" button, no edit buttons)
- ✅ Regular users are denied access to /admin/users/new with error message
- ✅ Regular users are denied access to /admin/users/[id]/edit with error message
- ✅ Admin users can see "Add New User" button in dashboard
- ✅ Admin users can see edit buttons on user cards
- ✅ Admin users can access /admin/users/new page
- ✅ Create user form has all required fields
- ✅ Form validation prevents submission with empty fields
- ✅ Form validation prevents invalid email format
- ✅ Form validation prevents future join dates
- ✅ Form validation enforces username minimum length
- ✅ Cancel button on create form navigates back to dashboard
- ✅ Successfully creating a user shows success toast
- ✅ Newly created user appears in dashboard
- ✅ Edit button on user details page works for admins
- ✅ Edit form pre-populates with existing user data
- ✅ Cancel button on edit form navigates back to user details
- ✅ Successfully editing a user shows success toast
- ✅ Changes are reflected in user details and dashboard
- ✅ Edit button on user card works correctly
- ✅ Form validation works on edit as well as create
- ✅ No console errors during admin operations

## Failure Scenarios
If any test step fails:
1. Capture screenshot at point of failure
2. Save browser console logs
3. Check server logs in /tmp/nextjs-admin-dev.log
4. Verify all files are saved correctly
5. Verify TypeScript types are correct
6. Check that authentication state is properly maintained
7. Ensure AdminGuard component is working correctly

## Cleanup
- Stop development server
- Remove any test users created during testing (if using persistent storage)
- Clear browser local storage
- Delete temporary log files

## Notes
- This test validates the complete admin user management flow
- Access control is critical - regular users must not access admin features
- Form validation must work on both create and edit operations
- Changes must be immediately visible after save
- All admin features must be properly protected
