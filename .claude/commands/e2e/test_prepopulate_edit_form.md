# E2E Test: Pre-populate Edit Form with Existing User Data

## Test Metadata
- Test Name: Pre-populate Edit Form with Existing User Data
- Test ID: test_prepopulate_edit_form
- Application URL: http://localhost:3000
- Purpose: Validate that the edit user form automatically fetches and pre-populates all form fields with existing user data

## User Story
As an administrator, I want the edit user form to automatically load and display all of a user's existing information when I click Edit, so that I can see current values and make changes without having to re-enter all information from scratch.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system with admin credentials
- Admin user management feature implemented
- Mock users available in database

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all types properly defined

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-prepopulate-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Login as Admin User
**Action:** Navigate to http://localhost:3000/login and login with admin credentials (username: "admin", password: "admin123")
**Verify:**
- Login succeeds
- Redirects to /dashboard
**Expected:** Admin user is logged in successfully
**Screenshot:** 01_admin_login.png

### Step 4: Navigate to Dashboard
**Action:** Verify dashboard loads with user cards
**Verify:**
- Dashboard displays user cards
- Each user card shows user information
**Expected:** Dashboard displays successfully
**Screenshot:** 02_dashboard_with_users.png

### Step 5: Select a Known User for Testing
**Action:** Identify a user card with complete data (e.g., "Sarah Johnson" - usr_1a2b3c4d5e6f)
**Verify:**
- User card is visible
- User card shows name, role, and department
**Expected:** Test user is visible in dashboard
**Screenshot:** 03_target_user_card.png

### Step 6: Navigate to User Details Page
**Action:** Click on the test user's card to view details
**Verify:**
- Page navigates to /users/[id]
- User details page loads successfully
- All user information is displayed (name, email, role, department, location, bio, join date)
- "Edit User" button is visible
**Expected:** User details page displays complete information
**Screenshot:** 04_user_details_page.png

### Step 7: Click Edit Button
**Action:** Click "Edit User" button on user details page
**Verify:**
- Page navigates to /admin/users/[id]/edit
- Loading spinner appears briefly
**Expected:** Navigation to edit page initiates
**Screenshot:** 05_loading_spinner.png

### Step 8: Verify Edit Page Loads Successfully
**Action:** Wait for edit page to fully load
**Verify:**
- Page URL is /admin/users/[id]/edit
- Page header shows "Edit User: [User Name]"
- Loading spinner disappears
- User form is visible
**Expected:** Edit page loads without errors
**Screenshot:** 06_edit_page_loaded.png

### Step 9: Verify Name Field is Pre-populated
**Action:** Check the Name input field
**Verify:**
- Name field contains user's current name (e.g., "Sarah Johnson")
- Field is editable (not disabled or read-only)
**Expected:** Name field shows exact current value
**Screenshot:** 07_name_field_prepopulated.png

### Step 10: Verify Email Field is Pre-populated
**Action:** Check the Email input field
**Verify:**
- Email field contains user's current email (e.g., "sarah.johnson@company.com")
- Field is editable
**Expected:** Email field shows exact current value
**Screenshot:** 08_email_field_prepopulated.png

### Step 11: Verify Username Field is Pre-populated
**Action:** Check the Username input field
**Verify:**
- Username field contains user's current username (e.g., "sarahjohnson")
- Field is editable
- If username is not set, field is empty but available for input
**Expected:** Username field shows exact current value or is empty
**Screenshot:** 09_username_field_prepopulated.png

### Step 12: Verify Role Dropdown is Pre-populated
**Action:** Check the Role dropdown field
**Verify:**
- Role dropdown displays user's current role (e.g., "Engineering Manager")
- Dropdown is enabled and can be changed
- Selected value matches user's current role exactly
**Expected:** Role dropdown shows exact current role
**Screenshot:** 10_role_dropdown_prepopulated.png

### Step 13: Verify Department Dropdown is Pre-populated
**Action:** Check the Department dropdown field
**Verify:**
- Department dropdown displays user's current department (e.g., "Engineering")
- Dropdown is enabled and can be changed
- Selected value matches user's current department exactly
**Expected:** Department dropdown shows exact current department
**Screenshot:** 11_department_dropdown_prepopulated.png

### Step 14: Verify Location Dropdown is Pre-populated
**Action:** Check the Location dropdown field
**Verify:**
- Location dropdown displays user's current location (e.g., "San Francisco")
- Dropdown is enabled and can be changed
- Selected value matches user's current location exactly
**Expected:** Location dropdown shows exact current location
**Screenshot:** 12_location_dropdown_prepopulated.png

### Step 15: Verify Status Dropdown is Pre-populated
**Action:** Check the Status dropdown field
**Verify:**
- Status dropdown displays user's current status (e.g., "Active")
- Dropdown is enabled and can be changed
- Selected value matches user's current status exactly
**Expected:** Status dropdown shows exact current status
**Screenshot:** 13_status_dropdown_prepopulated.png

### Step 16: Verify Join Date Field is Pre-populated
**Action:** Check the Join Date input field
**Verify:**
- Join Date field contains user's current join date (e.g., "2019-03-15")
- Field is editable
- Date format is correct (YYYY-MM-DD)
**Expected:** Join Date field shows exact current date in correct format
**Screenshot:** 14_joindate_field_prepopulated.png

### Step 17: Verify Bio Textarea is Pre-populated
**Action:** Check the Bio textarea field
**Verify:**
- Bio textarea contains user's current bio text
- Field is editable
- Special characters (quotes, apostrophes, line breaks) are preserved correctly
- Character count indicator shows correct count
**Expected:** Bio textarea shows exact current bio with preserved formatting
**Screenshot:** 15_bio_textarea_prepopulated.png

### Step 18: Verify All Fields Together
**Action:** Scroll through form to view all fields at once
**Verify:**
- All fields contain pre-populated data
- No fields are empty when they should have values
- No fields show "undefined" or placeholder text instead of actual values
**Expected:** Complete form shows all pre-populated values correctly
**Screenshot:** 16_all_fields_prepopulated.png

### Step 19: Test Error Handling - Invalid User ID
**Action:** Navigate directly to http://localhost:3000/admin/users/invalid_id_12345/edit
**Verify:**
- Loading spinner appears
- Error state is displayed
- Error message shows "User not found" or similar
- "Back to Dashboard" button is visible
**Expected:** Appropriate error handling for non-existent user
**Screenshot:** 17_error_invalid_user_id.png

### Step 20: Return to Dashboard from Error State
**Action:** Click "Back to Dashboard" button
**Verify:**
- User navigates back to /dashboard
- Dashboard loads successfully
**Expected:** Navigation from error state works correctly
**Screenshot:** 18_back_to_dashboard.png

### Step 21: Test Form Modification and Submission
**Action:** Navigate back to edit page for the test user, modify some fields:
- Change Role to "Senior Engineering Manager"
- Change Location to "New York"
- Update Bio by adding " Updated for testing."
**Verify:**
- Fields can be modified
- Changes are visible in form
**Expected:** Pre-populated values can be edited
**Screenshot:** 19_modified_fields.png

### Step 22: Submit Modified Form
**Action:** Click "Update User" button
**Verify:**
- Form submits successfully
- Success toast message "User updated successfully!" appears
- User is redirected to /users/[id]
**Expected:** Modified form submits successfully
**Screenshot:** 20_submit_success.png

### Step 23: Verify Changes Persisted
**Action:** Check user details page for updated information
**Verify:**
- Role shows "Senior Engineering Manager"
- Location shows "New York"
- Bio contains "Updated for testing."
**Expected:** All changes are reflected in user details
**Screenshot:** 21_changes_persisted.png

### Step 24: Verify Re-edit Loads Updated Data
**Action:** Click "Edit User" button again
**Verify:**
- Edit form loads with newly updated values
- Role shows "Senior Engineering Manager"
- Location shows "New York"
- Bio contains updated text
**Expected:** Form pre-populates with latest updated values
**Screenshot:** 22_reedit_shows_updated_data.png

### Step 25: Test Cancel Button
**Action:** Modify a field (e.g., change role), then click "Cancel" button
**Verify:**
- Form changes are abandoned
- User navigates back to /users/[id]
- User details show previous values (no changes saved)
**Expected:** Cancel button abandons changes correctly
**Screenshot:** 23_cancel_button_works.png

### Step 26: Test with User with Special Characters in Bio
**Action:** Navigate to dashboard, find a user with special characters in bio (or create one), click edit
**Verify:**
- Bio textarea displays all special characters correctly (quotes, apostrophes, line breaks)
- No HTML encoding visible (e.g., &quot; instead of ")
- Text is properly escaped and safe
**Expected:** Special characters in bio are handled correctly
**Screenshot:** 24_special_characters_in_bio.png

### Step 27: Verify No Console Errors
**Action:** Open browser console and check for errors throughout the test
**Verify:**
- No console errors during page load
- No console errors during data fetching
- No console errors during form pre-population
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
- ✅ Edit page loads successfully when accessed from user details
- ✅ Loading spinner displays during user data fetch
- ✅ Name field pre-populates with exact current value
- ✅ Email field pre-populates with exact current value
- ✅ Username field pre-populates with exact current value or is empty
- ✅ Role dropdown pre-populates with exact current role
- ✅ Department dropdown pre-populates with exact current department
- ✅ Location dropdown pre-populates with exact current location
- ✅ Status dropdown pre-populates with exact current status
- ✅ Join Date field pre-populates with exact current date in correct format
- ✅ Bio textarea pre-populates with exact current bio text
- ✅ All fields are editable (not disabled or read-only)
- ✅ Pre-populated values can be modified
- ✅ Modified form submits successfully
- ✅ Changes persist after save
- ✅ Re-editing loads updated values
- ✅ Cancel button abandons changes correctly
- ✅ Error handling works for invalid user IDs
- ✅ Special characters in bio are preserved correctly
- ✅ No console errors during form pre-population or editing
- ✅ Form never displays empty fields when valid user data exists
- ✅ Dropdown values match exactly (no mismatches or undefined values)

## Edge Cases Tested
1. **Non-existent User ID**: Verifies error message and graceful handling
2. **Special Characters in Data**: Verifies proper escaping and display
3. **Date Format Handling**: Verifies date displays correctly in date input field
4. **Dropdown Value Matching**: Verifies dropdowns select exact matching values
5. **Cancel After Edit**: Verifies changes are discarded
6. **Re-edit After Save**: Verifies form re-fetches and shows latest data

## Failure Scenarios
If any test step fails:
1. Capture screenshot at point of failure
2. Save browser console logs
3. Check server logs in /tmp/nextjs-prepopulate-dev.log
4. Verify getUserById API function is working
5. Verify UserForm initialData prop is being passed correctly
6. Verify form state initialization logic in UserForm.tsx
7. Check network requests in browser DevTools

## Cleanup
- Stop development server
- Clear browser local storage
- Delete temporary log files

## Notes
- This test focuses specifically on form pre-population functionality
- Validates all field types: text inputs, dropdowns, date picker, textarea
- Ensures data integrity throughout edit workflow
- Tests both success and error scenarios
- Verifies data persistence across multiple edit cycles
