# E2E Test: Black Text in Edit Form Inputs

## Test Metadata
- Test Name: Black Text in Edit Form Inputs
- Test ID: test_black_text_edit_form
- Application URL: http://localhost:3000
- Purpose: Validate that all form input fields in both create and edit user forms have dark, readable text colors with proper contrast ratios, ensuring text visibility meets accessibility standards

## User Story
As an administrator creating or editing user profiles, I want all input fields to have clear, dark text that is easy to read so that I can accurately enter and verify user information without straining to see the text.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system implemented with admin credentials
- Mock user database with existing users
- UserForm component with text-gray-900 and placeholder:text-gray-500 classes applied to all input fields

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all components properly typed

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-black-text-form-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Navigate to Login and Authenticate
**Action:** Open http://localhost:3000/login in Playwright browser
**Verify:** Login page loads correctly
**Action:** Enter admin credentials (username: "admin", password: "admin123") and submit
**Verify:** User is logged in and redirected to dashboard
**Expected:** URL is http://localhost:3000/dashboard
**Screenshot:** 01_login_success.png

### Step 4: Navigate to Create User Form
**Action:** Click "Add New User" button from dashboard
**Verify:** Page navigates to /admin/users/new
**Expected:** Create user form loads with all fields visible
**Screenshot:** 02_create_user_form.png

### Step 5: Verify Name Input Text Color Classes
**Action:** Inspect the name input element's className attribute
**Verify:**
- Name input has "text-gray-900" class applied
- Name input has "placeholder:text-gray-500" class applied
- Classes are in the className string of the input element
**Expected:** Name input has both text-gray-900 and placeholder:text-gray-500 classes
**Screenshot:** 03_name_input_classes.png

### Step 6: Verify Email Input Text Color Classes
**Action:** Inspect the email input element's className attribute
**Verify:**
- Email input has "text-gray-900" class applied
- Email input has "placeholder:text-gray-500" class applied
- Classes are in the className string of the input element
**Expected:** Email input has both text-gray-900 and placeholder:text-gray-500 classes
**Screenshot:** 04_email_input_classes.png

### Step 7: Verify Username Input Text Color Classes
**Action:** Inspect the username input element's className attribute
**Verify:**
- Username input has "text-gray-900" class applied
- Username input has "placeholder:text-gray-500" class applied
- Classes are in the className string of the input element
**Expected:** Username input has both text-gray-900 and placeholder:text-gray-500 classes
**Screenshot:** 05_username_input_classes.png

### Step 8: Verify Role Select Text Color Classes
**Action:** Inspect the role select element's className attribute
**Verify:**
- Role select has "text-gray-900" class applied
- Class is in the className string of the select element
**Expected:** Role select has text-gray-900 class
**Screenshot:** 06_role_select_classes.png

### Step 9: Verify Department Select Text Color Classes
**Action:** Inspect the department select element's className attribute
**Verify:**
- Department select has "text-gray-900" class applied
- Class is in the className string of the select element
**Expected:** Department select has text-gray-900 class
**Screenshot:** 07_department_select_classes.png

### Step 10: Verify Location Select Text Color Classes
**Action:** Inspect the location select element's className attribute
**Verify:**
- Location select has "text-gray-900" class applied
- Class is in the className string of the select element
**Expected:** Location select has text-gray-900 class
**Screenshot:** 08_location_select_classes.png

### Step 11: Verify Status Select Text Color Classes
**Action:** Inspect the status select element's className attribute
**Verify:**
- Status select has "text-gray-900" class applied
- Class is in the className string of the select element
**Expected:** Status select has text-gray-900 class
**Screenshot:** 09_status_select_classes.png

### Step 12: Verify Join Date Input Text Color Classes
**Action:** Inspect the joinDate input element's className attribute
**Verify:**
- Join date input has "text-gray-900" class applied
- Class is in the className string of the input element
**Expected:** Join date input has text-gray-900 class
**Screenshot:** 10_joindate_input_classes.png

### Step 13: Verify Bio Textarea Text Color Classes
**Action:** Inspect the bio textarea element's className attribute
**Verify:**
- Bio textarea has "text-gray-900" class applied
- Bio textarea has "placeholder:text-gray-500" class applied
- Classes are in the className string of the textarea element
**Expected:** Bio textarea has both text-gray-900 and placeholder:text-gray-500 classes
**Screenshot:** 11_bio_textarea_classes.png

### Step 14: Test Name Input Text Visibility
**Action:** Type "Jane Smith" into the name input field
**Verify:**
- Typed text is dark and clearly visible against white background
- Text appears in a dark color (near black)
- Text is easy to read without straining
- No visual issues with text rendering
**Expected:** Name input text is dark and highly readable
**Screenshot:** 12_name_text_visible.png

### Step 15: Test Email Input Text Visibility
**Action:** Type "jane.smith@company.com" into the email input field
**Verify:**
- Typed text is dark and clearly visible
- Email address is easy to read
- No visual issues with text rendering
**Expected:** Email input text is dark and highly readable
**Screenshot:** 13_email_text_visible.png

### Step 16: Test Username Input Text Visibility
**Action:** Type "janesmith" into the username input field
**Verify:**
- Typed text is dark and clearly visible
- Username is easy to read
- No visual issues with text rendering
**Expected:** Username input text is dark and highly readable
**Screenshot:** 14_username_text_visible.png

### Step 17: Test Role Select Text Visibility
**Action:** Select "Frontend Developer" from the role dropdown
**Verify:**
- Selected text is dark and clearly visible in the select element
- Text appears in a dark color (near black)
- Text is easy to read
**Expected:** Role select text is dark and highly readable
**Screenshot:** 15_role_text_visible.png

### Step 18: Test Department Select Text Visibility
**Action:** Select "Engineering" from the department dropdown
**Verify:**
- Selected text is dark and clearly visible
- Text is easy to read in the select element
**Expected:** Department select text is dark and highly readable
**Screenshot:** 16_department_text_visible.png

### Step 19: Test Location Select Text Visibility
**Action:** Select "San Francisco" from the location dropdown
**Verify:**
- Selected text is dark and clearly visible
- Text is easy to read in the select element
**Expected:** Location select text is dark and highly readable
**Screenshot:** 17_location_text_visible.png

### Step 20: Test Status Select Text Visibility
**Action:** Verify "Active" status is selected (default) and text is visible
**Verify:**
- Selected text is dark and clearly visible
- Text is easy to read in the select element
**Expected:** Status select text is dark and highly readable
**Screenshot:** 18_status_text_visible.png

### Step 21: Test Join Date Input Text Visibility
**Action:** Select or type a join date (e.g., "2024-01-15")
**Verify:**
- Date text is dark and clearly visible
- Date is easy to read in the input field
**Expected:** Join date input text is dark and highly readable
**Screenshot:** 19_joindate_text_visible.png

### Step 22: Test Bio Textarea Text Visibility
**Action:** Type a multi-line bio: "Frontend developer with 5 years of experience building responsive web applications. Passionate about user experience and accessibility."
**Verify:**
- Typed text is dark and clearly visible
- Multi-line text is easy to read
- No visual issues with text rendering in textarea
**Expected:** Bio textarea text is dark and highly readable
**Screenshot:** 20_bio_text_visible.png

### Step 23: Verify Placeholder Text Visibility
**Action:** Clear the name input and observe placeholder text
**Verify:**
- Placeholder text "John Doe" is visible
- Placeholder is lighter than regular text but still readable
- Placeholder provides good visual hierarchy
**Action:** Clear email, username, and bio fields and verify placeholders
**Expected:** All placeholder text is appropriately styled with good contrast
**Screenshot:** 21_placeholder_text.png

### Step 24: Test Input Text Contrast Ratio
**Action:** Use browser dev tools to verify input text color contrast
**Verify:**
- Input text color is #111827 (text-gray-900) or very close
- Background is white (#FFFFFF)
- Contrast ratio is approximately 18:1 (well above WCAG AAA 7:1)
- Text meets accessibility standards for normal text
**Expected:** Input text has excellent contrast ratio (>7:1)
**Screenshot:** 22_input_contrast.png

### Step 25: Test Placeholder Contrast Ratio
**Action:** Verify placeholder text color meets accessibility standards
**Verify:**
- Placeholder text color is #6B7280 (text-gray-500) or very close
- Background is white (#FFFFFF)
- Contrast ratio is approximately 4.6:1 (meets WCAG AA 4.5:1)
- Placeholder text is readable while maintaining visual hierarchy
**Expected:** Placeholder text has sufficient contrast ratio (>4.5:1)
**Screenshot:** 23_placeholder_contrast.png

### Step 26: Navigate to Edit User Form
**Action:** Click Cancel to return to dashboard, then click edit icon on any user card
**Verify:** Page navigates to /admin/users/[id]/edit
**Expected:** Edit user form loads with pre-populated data
**Screenshot:** 24_edit_user_form.png

### Step 27: Verify Pre-populated Name Field Text
**Action:** Check the pre-populated name field
**Verify:**
- Existing name data is dark and clearly visible
- Text color matches the create form
- Easy to read and verify existing data
**Expected:** Pre-populated name is dark and highly readable
**Screenshot:** 25_edit_name_visible.png

### Step 28: Verify Pre-populated Email Field Text
**Action:** Check the pre-populated email field
**Verify:**
- Existing email data is dark and clearly visible
- Email is easy to read and verify
**Expected:** Pre-populated email is dark and highly readable
**Screenshot:** 26_edit_email_visible.png

### Step 29: Verify Pre-populated Username Field Text
**Action:** Check the pre-populated username field
**Verify:**
- Existing username data is dark and clearly visible (if present)
- Username is easy to read
**Expected:** Pre-populated username is dark and highly readable
**Screenshot:** 27_edit_username_visible.png

### Step 30: Verify Pre-populated Role Selection Text
**Action:** Check the pre-populated role select field
**Verify:**
- Existing role is dark and clearly visible
- Selected role is easy to read
**Expected:** Pre-populated role is dark and highly readable
**Screenshot:** 28_edit_role_visible.png

### Step 31: Verify Pre-populated Department Selection Text
**Action:** Check the pre-populated department select field
**Verify:**
- Existing department is dark and clearly visible
- Selected department is easy to read
**Expected:** Pre-populated department is dark and highly readable
**Screenshot:** 29_edit_department_visible.png

### Step 32: Verify Pre-populated Location Selection Text
**Action:** Check the pre-populated location select field
**Verify:**
- Existing location is dark and clearly visible
- Selected location is easy to read
**Expected:** Pre-populated location is dark and highly readable
**Screenshot:** 30_edit_location_visible.png

### Step 33: Verify Pre-populated Status Selection Text
**Action:** Check the pre-populated status select field
**Verify:**
- Existing status is dark and clearly visible
- Selected status is easy to read
**Expected:** Pre-populated status is dark and highly readable
**Screenshot:** 31_edit_status_visible.png

### Step 34: Verify Pre-populated Join Date Text
**Action:** Check the pre-populated join date field
**Verify:**
- Existing join date is dark and clearly visible
- Date is easy to read
**Expected:** Pre-populated join date is dark and highly readable
**Screenshot:** 32_edit_joindate_visible.png

### Step 35: Verify Pre-populated Bio Text
**Action:** Check the pre-populated bio textarea
**Verify:**
- Existing bio text is dark and clearly visible
- Multi-line bio is easy to read
- All text in textarea is readable
**Expected:** Pre-populated bio is dark and highly readable
**Screenshot:** 33_edit_bio_visible.png

### Step 36: Test Edit Form Text Modifications
**Action:** Modify the name field to add " (Updated)"
**Verify:**
- Both original and newly typed text are dark and readable
- No difference in text visibility between pre-populated and new text
- Editing experience is smooth
**Expected:** Mixed pre-populated and new text is equally readable
**Screenshot:** 34_edit_form_modifications.png

### Step 37: Test Mobile View (375px) - Create Form
**Action:** Navigate back to create form and resize browser to mobile size (375x667)
**Verify:**
- All input field text is dark and readable on mobile
- Placeholder text is visible and appropriately styled
- No layout issues affecting text visibility
- Text color is consistent with desktop view
**Expected:** Text is dark and readable on mobile devices
**Screenshot:** 35_mobile_create_form.png

### Step 38: Test Mobile View (375px) - Edit Form
**Action:** Navigate to edit form on mobile view
**Verify:**
- All pre-populated field text is dark and readable on mobile
- No layout issues affecting text visibility
- Text visibility matches desktop experience
**Expected:** Pre-populated text is dark and readable on mobile
**Screenshot:** 36_mobile_edit_form.png

### Step 39: Test Tablet View (768px) - Form Text
**Action:** Resize browser to tablet size (768x1024)
**Verify:**
- Input field text is dark and readable
- Select field text is dark and readable
- Textarea text is dark and readable
- No visual regressions on tablet sizes
**Expected:** Text readability maintained on tablet
**Screenshot:** 37_tablet_form_view.png

### Step 40: Test Desktop View (1280px) - Complete Form
**Action:** Resize browser to desktop size (1280x720)
**Verify:**
- All form fields display with dark, readable text
- Visual consistency across all input types
- Professional appearance
- Form layout is clean and organized
**Expected:** All form text is dark and readable on desktop
**Screenshot:** 38_desktop_full_form.png

### Step 41: Test Focus States Don't Affect Text Color
**Action:** Click into name input to focus it
**Verify:**
- Text color remains dark when focused
- Focus ring appears (indigo-500) without affecting text color
- Text is still clearly readable while focused
**Action:** Tab through several fields and observe text color
**Verify:**
- All fields maintain dark text color when focused
- Focus ring appears without affecting text color
**Expected:** Text color is unaffected by focus states
**Screenshot:** 39_focus_states.png

### Step 42: Test Error State Text Visibility
**Action:** Submit form with empty required fields to trigger validation errors
**Verify:**
- Input field text color remains dark even when field has error state
- Red border appears but doesn't affect text color
- Error messages appear below fields in red
- Input text is still readable with error styling
**Expected:** Text remains dark and readable during error states
**Screenshot:** 40_error_state_text.png

### Step 43: Verify No Layout Regressions
**Action:** Review complete form layout
**Verify:**
- Form labels display correctly
- Form spacing is appropriate
- Buttons render correctly
- Only changes are text colors in input fields
- No unintended side effects on other form elements
**Expected:** No regressions in form layout or functionality
**Screenshot:** 41_no_layout_regressions.png

### Step 44: Test Zoom Levels - 150% and 200%
**Action:** Set browser zoom to 150%
**Verify:**
- Text remains dark and readable at 150% zoom
- No layout breakage
- All fields remain accessible
**Action:** Set browser zoom to 200%
**Verify:**
- Text remains dark and readable at 200% zoom
- Layout scales appropriately
- Form remains usable
**Expected:** Text readability maintained at all zoom levels
**Screenshot:** 42_zoom_levels.png

### Step 45: Test Form Submission with Dark Text
**Action:** Fill out complete valid form and submit
**Verify:**
- Form validation passes
- Form submits successfully
- User is redirected to dashboard
- Toast notification appears confirming success
- All form functionality preserved
**Expected:** Form submission works perfectly with new styling
**Screenshot:** 43_form_submission.png

### Step 46: Verify Edit Form Save Functionality
**Action:** Return to edit form, make a change, and save
**Verify:**
- Edit form validation passes
- Form saves successfully
- User is redirected to dashboard
- Toast notification appears confirming update
- All edit functionality preserved
**Expected:** Edit form works perfectly with new styling
**Screenshot:** 44_edit_form_save.png

### Step 47: Check Console for Errors
**Action:** Review browser console for any JavaScript errors or warnings
**Verify:** No console errors related to styling or rendering
**Expected:** Clean console output

### Step 48: Test All Fields Simultaneously Filled
**Action:** Return to create form and fill all fields with test data
**Verify:**
- All text inputs show dark, readable text simultaneously
- All select fields show dark, readable text
- Textarea shows dark, readable text
- No visual conflicts between fields
- Overall form looks professional and polished
**Expected:** All fields display dark text consistently
**Screenshot:** 45_all_fields_filled.png

### Step 49: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Admin can access both create and edit user forms
- ✅ Name input has "text-gray-900" and "placeholder:text-gray-500" classes
- ✅ Email input has "text-gray-900" and "placeholder:text-gray-500" classes
- ✅ Username input has "text-gray-900" and "placeholder:text-gray-500" classes
- ✅ Role select has "text-gray-900" class
- ✅ Department select has "text-gray-900" class
- ✅ Location select has "text-gray-900" class
- ✅ Status select has "text-gray-900" class
- ✅ Join date input has "text-gray-900" class
- ✅ Bio textarea has "text-gray-900" and "placeholder:text-gray-500" classes
- ✅ All typed text is dark and clearly readable in create form
- ✅ All pre-populated text is dark and clearly readable in edit form
- ✅ Placeholder text is appropriately styled and readable
- ✅ Input text contrast ratio meets WCAG AAA (>7:1)
- ✅ Placeholder text contrast ratio meets WCAG AA (>4.5:1)
- ✅ Text is dark and readable on mobile (375px)
- ✅ Text is dark and readable on tablet (768px)
- ✅ Text is dark and readable on desktop (1280px)
- ✅ Focus states don't affect text color
- ✅ Error states don't affect text color readability
- ✅ No layout regressions
- ✅ Text is readable at 150% and 200% zoom
- ✅ Form submission works correctly
- ✅ Edit form save works correctly
- ✅ No console errors

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Any input field missing "text-gray-900" class
- Text input or textarea fields missing "placeholder:text-gray-500" class
- Text is not dark or difficult to read in any field
- Pre-populated text in edit form is not clearly visible
- Placeholder text is too dark or too light
- Contrast ratios don't meet accessibility standards
- Text is not readable on mobile, tablet, or desktop
- Text color changes with focus states
- Text becomes unreadable in error states
- Layout regressions in form
- Console contains errors
- Form submission is broken
- Edit form save is broken
- Text is not readable at higher zoom levels

## Output Format
```json
{
  "test_name": "Black Text in Edit Form Inputs",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/black_text_edit_form/01_login_success.png",
    "<absolute_path>/media/e2e/<adw_id>/black_text_edit_form/02_create_user_form.png",
    "... (all 45 screenshots)"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
