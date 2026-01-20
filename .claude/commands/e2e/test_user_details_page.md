# E2E Test: User Details Page

## Test Metadata
- Test Name: User Details Page
- Test ID: test_user_details_page
- Application URL: http://localhost:3000
- Purpose: Validate that the user details page displays comprehensive user information when clicking on a user profile card from the dashboard, including navigation, data display, error handling, back button functionality, shareable URLs, and responsive design

## User Story
As a team member or manager, I want to click on a user profile card and view detailed information about that person, so that I can learn more about my colleagues, their roles, departments, and contact information without cluttering the main dashboard view.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- User details page implemented at app/nextjs/app/users/[id]/page.tsx
- Dashboard page with UserCard components that have onClick handlers
- Mock user database with 25 user profiles
- getUserById API function implemented in lib/api.ts

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, user details page component properly typed

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-userdetails-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Test Unauthenticated Access to User Details Page
**Action:** Navigate directly to http://localhost:3000/users/usr_1a2b3c4d5e6f without authentication
**Verify:**
- Page redirects to /login
- User cannot access user details without authentication
- No user data is exposed
**Expected:** Unauthenticated users are redirected to login page
**Screenshot:** 01_unauthenticated_redirect.png

### Step 4: Login to Dashboard
**Action:** Navigate to http://localhost:3000/login and login with admin credentials (username: "admin", password: "admin123")
**Verify:** Successfully logged in and redirected to /dashboard
**Expected:** Dashboard loads with user cards visible and clickable
**Screenshot:** 02_dashboard_after_login.png

### Step 5: Verify User Cards Are Clickable
**Action:** Hover over various user cards on the dashboard
**Verify:**
- Cards show hover effects (shadow increase, scale, border)
- Cards have cursor-pointer style
- Cards are keyboard focusable (tabIndex={0})
- Cards have visual indication they are interactive
**Expected:** User cards are clearly interactive and clickable
**Screenshot:** 03_clickable_cards.png

### Step 6: Click on First User Card
**Action:** Click on the first user card in the grid
**Verify:**
- Navigation occurs to /users/[id] route
- URL updates to show user ID (e.g., /users/usr_1a2b3c4d5e6f)
- Page transition is smooth
- User details page begins loading
**Expected:** Clicking card navigates to user details page
**Screenshot:** 04_navigation_to_details.png

### Step 7: Verify Loading State Display
**Action:** Observe the page as it loads user data
**Verify:**
- LoadingSpinner component displays
- Loading message shows "Loading user details..."
- Spinner is centered and visible
- No flickering or layout shift
**Expected:** Loading state displays while fetching user data
**Screenshot:** 05_loading_state.png

### Step 8: Verify User Details Page Header
**Action:** After page loads, inspect the header section
**Verify:**
- Back button is visible with arrow icon and "Back to Dashboard" text
- "User Details" heading is present
- Header has white background with shadow
- Back button has proper styling (border, hover effects)
- Back button has aria-label="Back to dashboard"
**Expected:** Header displays with functional back button
**Screenshot:** 06_page_header.png

### Step 9: Verify User Profile Section
**Action:** Inspect the user profile section (gradient background area)
**Verify:**
- Large avatar displays (128x128 pixels) with white border
- User's full name displays prominently in large white text
- Status badge shows (green for active, gray for inactive) in white text
- Role displays next to status badge in white text
- Gradient background is indigo to purple
- Avatar and name are properly aligned
- Profile section is responsive (column on mobile, row on desktop)
**Expected:** Profile section displays user avatar, name, status, and role
**Screenshot:** 07_profile_section.png

### Step 10: Verify Avatar Fallback Mechanism
**Action:** Use browser DevTools to trigger avatar image error
```javascript
const img = document.querySelector('img[alt*="avatar"]');
if (img) img.dispatchEvent(new Event('error'));
```
**Verify:**
- Avatar image is replaced with user initials
- Fallback displays 1-2 uppercase letters from user name
- Fallback has colored circular background (indigo-200)
- Fallback has same dimensions and border as avatar (w-32 h-32, border-4)
- Fallback text is clearly visible
**Expected:** Avatar fallback displays user initials when image fails
**Screenshot:** 08_avatar_fallback.png

### Step 11: Verify Contact Information Section
**Action:** Inspect the "Contact Information" section
**Verify:**
- Section heading "Contact Information" with indigo bottom border
- Email field displays with label "Email"
- Email is a clickable mailto link (indigo-600 color)
- Email has hover effect (indigo-800, underline)
- Location field displays if present with label "Location"
- Location text is properly styled (gray-900)
- Fields have proper spacing (space-y-4)
**Expected:** Contact information displays email and location
**Screenshot:** 09_contact_section.png

### Step 12: Verify Organization Information Section
**Action:** Inspect the "Organization" section
**Verify:**
- Section heading "Organization" with indigo bottom border
- Department field displays with label "Department"
- Role field displays with label "Role"
- Join date displays with label "Join Date" and formatted text (e.g., "Joined January 15, 2023")
- All fields use proper labels (gray-500) and values (gray-900)
- Fields have proper spacing (space-y-4)
**Expected:** Organization information displays department, role, and join date
**Screenshot:** 10_organization_section.png

### Step 13: Verify Bio Section
**Action:** Inspect the "About" section
**Verify:**
- Section heading "About" with indigo bottom border
- Bio text displays if present
- Bio text supports line breaks (whitespace-pre-wrap)
- Bio text is properly styled (gray-700, leading-relaxed)
- Section only displays if user has a bio
**Expected:** About section displays user bio with proper formatting
**Screenshot:** 11_bio_section.png

### Step 14: Test Back Button Functionality
**Action:** Click the "Back to Dashboard" button
**Verify:**
- Navigation occurs back to /dashboard route
- Dashboard loads with previous state (search, filters preserved if possible)
- User cards display correctly
- No console errors
**Expected:** Back button navigates user back to dashboard
**Screenshot:** 12_back_to_dashboard.png

### Step 15: Test Keyboard Navigation for Back Button
**Action:** Return to a user details page, then use Tab key to focus back button and press Enter
**Verify:**
- Back button is focusable with Tab key
- Visual focus indicator appears (ring-2, ring-indigo-500)
- Pressing Enter triggers navigation to dashboard
**Expected:** Back button is fully keyboard accessible

### Step 16: Test Direct URL Access with Valid User ID
**Action:** Navigate directly to http://localhost:3000/users/usr_1a2b3c4d5e6f (or another valid user ID)
**Verify:**
- Page loads successfully
- Loading state displays briefly
- User details display correctly
- All sections show proper information
- No console errors
**Expected:** Direct URL access works for valid user IDs
**Screenshot:** 13_direct_url_access.png

### Step 17: Test Shareable URL (Copy and Paste)
**Action:** Copy the user details URL from browser address bar, open new tab, paste URL
**Verify:**
- URL is shareable and accessible
- New tab loads same user details page
- User must still be authenticated
- Page displays correctly in new context
**Expected:** URLs are shareable and work across tabs
**Screenshot:** 14_shareable_url.png

### Step 18: Test Invalid User ID Error Handling
**Action:** Navigate to http://localhost:3000/users/invalid-user-id-12345
**Verify:**
- Page shows loading state briefly
- ErrorState component displays
- Error message shows (e.g., "User not found" or "Failed to load user details")
- "Try Again" button is visible
- No page crash or uncaught errors
**Expected:** Invalid user IDs show error state gracefully
**Screenshot:** 15_invalid_user_error.png

### Step 19: Test Error State Retry Functionality
**Action:** Click the "Try Again" button on error state
**Verify:**
- Page attempts to reload user data
- Loading spinner displays
- Error persists if user ID is still invalid
- Retry button remains functional
**Expected:** Retry button attempts to reload user data

### Step 20: Test Responsive Design - Desktop (1920x1080)
**Action:** Set browser viewport to desktop size (1920x1080)
**Verify:**
- Two-column layout displays (contact and organization side by side)
- Avatar is large (128x128) with proper spacing
- Profile section displays avatar and name side by side
- All text is readable and properly spaced
- Page uses max-w-7xl container
**Expected:** Desktop layout displays two-column information sections
**Screenshot:** 16_desktop_responsive.png

### Step 21: Test Responsive Design - Tablet (768x1024)
**Action:** Resize browser viewport to tablet size (768x1024)
**Verify:**
- Two-column layout may stack or remain side by side depending on design
- Avatar remains large and visible
- All information remains accessible
- No horizontal scrolling required
- Padding adjusts appropriately (px-6, py-8)
**Expected:** Tablet layout adapts sections appropriately
**Screenshot:** 17_tablet_responsive.png

### Step 22: Test Responsive Design - Mobile (375x667)
**Action:** Resize browser viewport to mobile size (375x667)
**Verify:**
- Single column layout (grid-cols-1)
- Avatar and name stack vertically in profile section
- Contact and organization sections stack vertically
- Back button remains fully visible and tappable
- All text remains readable without zooming
- No horizontal scrolling
- Padding adjusts for mobile (px-4)
**Expected:** Mobile layout displays single column with stacked sections
**Screenshot:** 18_mobile_responsive.png

### Step 23: Restore Desktop View
**Action:** Resize browser back to desktop size (1920x1080)
**Verify:** Layout returns to two-column desktop view

### Step 24: Navigate to Different User Details Pages
**Action:** Go back to dashboard and click on 3 different user cards
**Verify:**
- Each navigation loads the correct user's information
- User ID in URL matches the clicked user
- Avatar, name, and all details are unique to each user
- No data mixing or caching issues
- Page resets correctly for each user
**Expected:** Multiple user details pages work correctly
**Screenshot:** 19_multiple_users.png

### Step 25: Test Email Link Functionality
**Action:** On user details page, click the email link
**Verify:**
- Email link has mailto: href with correct email address
- Clicking opens default mail client (or attempts to)
- Email link has hover effects
- Email link has proper aria-label
**Expected:** Email link opens mail client with user's email pre-filled

### Step 26: Test Status Badge Display
**Action:** Navigate to user details for both active and inactive users
**Verify:**
- Active users show green status badge (bg-green-500, text-white)
- Inactive users show gray status badge (bg-gray-400, text-white)
- Status text is capitalized ("Active" or "Inactive")
- Status badge has aria-label
**Expected:** Status badges display correctly with proper colors
**Screenshot:** 20_status_badge_display.png

### Step 27: Test Join Date Formatting
**Action:** Verify join date displays in readable format
**Verify:**
- Join date is formatted as "Joined [Month] [Day], [Year]" (e.g., "Joined January 15, 2023")
- Date format is user-friendly and localized
- Invalid dates fall back to original string
**Expected:** Join dates are formatted in readable format

### Step 28: Test Missing Optional Fields
**Action:** Navigate to a user with missing optional fields (location or bio)
**Verify:**
- Missing location doesn't show empty label
- Missing bio doesn't show "About" section at all
- Page layout adjusts gracefully
- No broken placeholders or "undefined" text
**Expected:** Missing optional fields are handled gracefully

### Step 29: Test Accessibility with Screen Reader
**Action:** Use screen reader or accessibility inspector
**Verify:**
- Page structure is semantic with proper headings (h1, h2, h3)
- Back button announces purpose clearly
- Avatar has aria-label
- Status badge has aria-label
- Email link has descriptive aria-label
- Section headings are properly hierarchical
**Expected:** Page is fully accessible to screen readers
**Screenshot:** 21_accessibility_tree.png

### Step 30: Check Browser Console for Errors
**Action:** Review browser console throughout all previous steps
**Verify:**
- No JavaScript errors
- No React warnings or errors
- No Next.js routing errors
- No failed API requests (except for intentional invalid IDs)
**Expected:** Clean console output during all operations

### Step 31: Test Page Refresh on User Details
**Action:** While on a user details page, refresh the browser
**Verify:**
- Page reloads successfully
- User ID is preserved in URL
- Correct user data loads again
- No authentication loss
- Page displays correctly after refresh
**Expected:** Page refresh maintains state and loads correctly

### Step 32: Test Browser Back/Forward Buttons
**Action:** Navigate dashboard -> user details -> dashboard -> user details, then use browser back/forward buttons
**Verify:**
- Browser back button returns to previous page
- Browser forward button moves forward in history
- Page state is preserved correctly
- No navigation errors or loops
**Expected:** Browser back/forward buttons work correctly

### Step 33: Verify All User Fields Display
**Action:** On user details page, verify all User type fields are displayed
**Verify:**
- id (used in URL)
- name (large heading)
- email (contact section)
- role (profile section and organization section)
- avatar (profile image)
- department (organization section)
- location (contact section, if present)
- bio (about section, if present)
- joinDate (organization section, formatted)
- status (status badge)
**Expected:** All user fields are displayed or appropriately handled

### Step 34: Run Production Build Test
**Action:** Build the Next.js app for production
```bash
cd app/nextjs && npm run build
```
**Verify:**
- Build completes successfully without errors
- No warnings about user details page
- Dynamic route is properly generated
- Image optimization warnings are expected/acceptable
**Expected:** Production build succeeds

### Step 35: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Unauthenticated users are redirected to login
- ✅ User cards on dashboard are clickable and navigate to user details
- ✅ User details page displays loading state while fetching data
- ✅ Page header displays with functional back button
- ✅ User profile section displays large avatar, name, status badge, and role
- ✅ Avatar fallback displays user initials when image fails
- ✅ Contact information section displays email and location
- ✅ Organization section displays department, role, and formatted join date
- ✅ About section displays user bio with proper formatting
- ✅ Back button navigates to dashboard
- ✅ Back button is keyboard accessible (Tab, Enter)
- ✅ Direct URL access works with valid user IDs
- ✅ URLs are shareable across browser tabs
- ✅ Invalid user IDs show error state gracefully
- ✅ Error state retry button attempts to reload data
- ✅ Responsive design works at desktop, tablet, and mobile sizes
- ✅ Multiple user details pages work correctly
- ✅ Email links work and open mail client
- ✅ Status badges display correct colors (green for active, gray for inactive)
- ✅ Join dates are formatted in readable format
- ✅ Missing optional fields (location, bio) are handled gracefully
- ✅ Page is fully accessible to screen readers
- ✅ No console errors during operation
- ✅ Page refresh maintains state and loads correctly
- ✅ Browser back/forward buttons work correctly
- ✅ All User type fields are displayed appropriately
- ✅ Production build succeeds

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Unauthenticated users can access user details page
- User cards are not clickable or don't navigate
- Loading state doesn't display or flickers
- Back button is missing or doesn't work
- User information is missing or incorrect
- Avatar fallback doesn't work
- Contact or organization sections are missing fields
- Invalid user IDs cause page crash
- Responsive design breaks at any viewport size
- Navigation between multiple users fails or mixes data
- Email links don't work
- Status badges have wrong colors
- Join dates are not formatted properly
- Missing optional fields break layout or show errors
- Screen readers can't navigate page
- Console contains errors
- Page refresh fails or loses state
- Browser back/forward buttons break navigation
- Production build fails

## Output Format
```json
{
  "test_name": "User Details Page",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/01_unauthenticated_redirect.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/02_dashboard_after_login.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/03_clickable_cards.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/04_navigation_to_details.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/05_loading_state.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/06_page_header.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/07_profile_section.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/08_avatar_fallback.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/09_contact_section.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/10_organization_section.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/11_bio_section.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/12_back_to_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/13_direct_url_access.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/14_shareable_url.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/15_invalid_user_error.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/16_desktop_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/17_tablet_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/18_mobile_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/19_multiple_users.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/20_status_badge_display.png",
    "<absolute_path>/media/e2e/<adw_id>/user_details_page/21_accessibility_tree.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
- Remove any test screenshots if needed

## Notes
- This test validates the complete user details page feature
- Tests integration with dashboard via onClick handlers on UserCard
- Validates authentication protection and error handling
- Tests shareable URLs and direct access patterns
- Validates responsive design across all screen sizes
- Ensures accessibility and keyboard navigation
- Tests multiple navigation scenarios and edge cases
