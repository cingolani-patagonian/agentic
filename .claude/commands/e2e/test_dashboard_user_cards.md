# E2E Test: Dashboard User Profile Cards

## Test Metadata
- Test Name: Dashboard User Profile Cards
- Test ID: test_dashboard_user_cards
- Application URL: http://localhost:3000
- Purpose: Validate that the dashboard displays user profile cards correctly with search, filter, loading states, error states, and responsive design

## User Story
As a logged-in user, I want to view all user profiles in a card-based dashboard with search and filter capabilities, so that I can easily browse the team directory, find specific users, and view their professional information at a glance.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system implemented with mock credentials
- Mock user database with 25 user profiles
- Mock API service with getAllUsers functionality

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all components and types properly defined

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-dashboard-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Navigate to Dashboard Without Authentication
**Action:** Open http://localhost:3000/dashboard in Playwright browser
**Verify:** Should redirect to /login since user is not authenticated
**Expected:** URL changes to http://localhost:3000/login
**Screenshot:** 01_redirect_to_login.png

### Step 4: Login with Valid Credentials
**Action:** Enter admin credentials (username: "admin", password: "admin123") and submit
**Verify:**
- Form submits successfully
- Page redirects to /dashboard
**Expected:** User is logged in and redirected to dashboard
**Screenshot:** 02_login_success.png

### Step 5: Verify Dashboard Redirects After Login
**Action:** Check current URL after login
**Verify:** URL is http://localhost:3000/dashboard
**Expected:** Successfully redirected to dashboard

### Step 6: Verify Dashboard Header
**Action:** Check dashboard header elements
**Verify:**
- Page heading "Team Directory" is visible
- Logged-in user info shows "admin" username
- User role "admin" is displayed
- Logout button is present and visible
**Expected:** Header displays all required elements correctly
**Screenshot:** 03_dashboard_header.png

### Step 7: Verify Loading State
**Action:** Observe page immediately after redirect (may need to throttle network)
**Verify:** Loading spinner appears briefly with "Loading users..." message
**Expected:** Loading state displays while fetching data
**Screenshot:** 04_loading_state.png (if captured in time)

### Step 8: Verify User Cards Load
**Action:** Wait for user cards to appear (API has 500-1000ms delay)
**Verify:**
- User cards are visible on the page
- Multiple cards are displayed in a grid layout
- Count shows "Showing 25 of 25 users"
**Expected:** All 25 user cards load successfully
**Screenshot:** 05_user_cards_loaded.png

### Step 9: Verify Individual Card Content
**Action:** Inspect the first few user cards for required information
**Verify:** Each card displays:
- Avatar image (circular)
- User name (prominent heading)
- Status badge (green for active, gray for inactive)
- Role label and value
- Department label and value
- Email address (as clickable link)
**Expected:** All required user information is displayed on cards
**Screenshot:** 06_card_details.png

### Step 10: Verify Responsive Grid Layout - Desktop
**Action:** Set browser viewport to desktop size (1920x1080)
**Verify:** Grid shows 3-4 columns of cards
**Expected:** Desktop layout displays multiple columns efficiently
**Screenshot:** 07_desktop_layout.png

### Step 11: Verify Responsive Grid Layout - Tablet
**Action:** Resize browser viewport to tablet size (768x1024)
**Verify:** Grid shows 2 columns of cards
**Expected:** Tablet layout adapts to 2 columns
**Screenshot:** 08_tablet_layout.png

### Step 12: Verify Responsive Grid Layout - Mobile
**Action:** Resize browser viewport to mobile size (375x667)
**Verify:** Grid shows 1 column of cards
**Expected:** Mobile layout displays single column
**Screenshot:** 09_mobile_layout.png

### Step 13: Restore Desktop View
**Action:** Resize browser back to desktop size (1920x1080)
**Verify:** Grid returns to 3-4 column layout

### Step 14: Test Search Functionality - Valid Query
**Action:** Enter "sarah" in the search bar
**Verify:**
- Cards filter in real-time as typing
- Only users matching "sarah" are displayed
- Count updates to show filtered results (e.g., "Showing 1 of 25 users")
- Empty cards are not shown, only matching ones
**Expected:** Search filters users by name correctly
**Screenshot:** 10_search_sarah.png

### Step 15: Verify Search Matches Multiple Fields
**Action:** Clear search and enter "engineer"
**Verify:**
- Users with "engineer" in their role are displayed
- Multiple cards remain visible (all engineers)
- Count shows correct number of matches
**Expected:** Search works across name, email, and role fields
**Screenshot:** 11_search_engineer.png

### Step 16: Clear Search Query
**Action:** Clear the search input field
**Verify:**
- All 25 user cards return to view
- Count shows "Showing 25 of 25 users"
**Expected:** Clearing search restores all cards

### Step 17: Test Department Filter
**Action:** Open department dropdown and select "Engineering"
**Verify:**
- Only users from Engineering department are displayed
- Other department users are hidden
- Count updates to show filtered results
**Expected:** Department filter works correctly
**Screenshot:** 12_filter_engineering.png

### Step 18: Test Combined Search and Filter
**Action:** With "Engineering" still selected, enter "senior" in search
**Verify:**
- Only Engineering users with "senior" in their name/role/email are shown
- Both filters apply simultaneously
- Count reflects combined filtering
**Expected:** Search and filter work together correctly
**Screenshot:** 13_combined_filters.png

### Step 19: Test Empty State - No Results
**Action:** Clear department filter, then search for "zzzzz" (no matches)
**Verify:**
- No user cards are displayed
- Empty state component appears
- Empty state shows appropriate message "No users found"
- Empty state includes icon or illustration
**Expected:** Empty state displays when no users match filters
**Screenshot:** 14_empty_state.png

### Step 20: Clear All Filters
**Action:** Clear search query and reset department to "All Departments"
**Verify:**
- All 25 cards return
- Count shows "Showing 25 of 25 users"
**Expected:** All filters clear successfully

### Step 21: Verify Status Badges
**Action:** Inspect status badges on various cards
**Verify:**
- Active users have green status badge with "active" text
- Inactive users have gray status badge with "inactive" text
- Badge colors are visually distinct
**Expected:** Status badges display correct colors based on user status
**Screenshot:** 15_status_badges.png

### Step 22: Verify Email Links
**Action:** Check email links on user cards
**Verify:**
- Email addresses are styled as links (blue/indigo color)
- Email has mailto: href attribute
- Hovering shows link styling (underline, color change)
**Expected:** Email links are clickable with proper mailto: links
**Screenshot:** 16_email_links.png

### Step 23: Verify Card Hover Effects
**Action:** Hover over user cards
**Verify:**
- Card shadow increases on hover
- Hover effect is smooth with transition
- Card remains properly formatted during hover
**Expected:** Cards have interactive hover effects

### Step 24: Test Search Bar Accessibility
**Action:** Inspect search bar element
**Verify:**
- Search icon is visible inside input
- Placeholder text is present
- Input has proper aria-label
- Input is keyboard accessible
**Expected:** Search bar follows accessibility best practices

### Step 25: Test Department Filter Accessibility
**Action:** Inspect department dropdown
**Verify:**
- Label "Department" is visible
- Select element has proper aria-label
- "All Departments" is the default option
- All unique departments are listed as options
**Expected:** Department filter is accessible and properly labeled

### Step 26: Test Logout Button
**Action:** Click the logout button in the header
**Verify:**
- User is logged out
- Redirects to /login page
- Dashboard is no longer accessible without re-authentication
**Expected:** Logout works correctly from dashboard
**Screenshot:** 17_logout_from_dashboard.png

### Step 27: Test Protected Route After Logout
**Action:** Try to navigate back to /dashboard
**Verify:** Redirects to /login page
**Expected:** Dashboard remains protected after logout
**Screenshot:** 18_protected_after_logout.png

### Step 28: Re-login and Verify Data Persistence
**Action:** Login again with admin credentials
**Verify:**
- Dashboard loads with all 25 cards
- Search and filter work as expected
- No data is lost or corrupted
**Expected:** Dashboard functions correctly after re-login

### Step 29: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings related to dashboard, components, or API
**Expected:** Clean console output

### Step 30: Verify Network Requests
**Action:** Check network requests for API calls
**Verify:**
- getAllUsers API is called on dashboard load
- API response is successful
- No failed network requests
**Expected:** API integration works correctly

### Step 31: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Dashboard requires authentication and redirects when not logged in
- ✅ Dashboard header displays correctly with title, user info, and logout button
- ✅ Loading state appears while fetching data
- ✅ All 25 user cards load and display correctly
- ✅ Each card shows avatar, name, role, department, email, and status badge
- ✅ Responsive grid layout works (1 col mobile, 2 col tablet, 3-4 col desktop)
- ✅ Search functionality filters users by name, email, and role
- ✅ Search is case-insensitive and works with partial matches
- ✅ Department filter correctly filters users by department
- ✅ Search and filter work together correctly
- ✅ Empty state displays when no users match filters
- ✅ Status badges show correct colors (green for active, gray for inactive)
- ✅ Email links are clickable with proper mailto: attributes
- ✅ Cards have hover effects
- ✅ Search bar and department filter are accessible
- ✅ Logout button works from dashboard
- ✅ Dashboard remains protected after logout
- ✅ No console errors during operation
- ✅ API requests succeed

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Dashboard is accessible without authentication
- User cards fail to load or display incorrectly
- Any required card information is missing (avatar, name, role, department, email, status)
- Responsive layout doesn't adapt to different screen sizes
- Search functionality doesn't filter users correctly
- Search is case-sensitive (should be case-insensitive)
- Department filter doesn't work
- Combined search and filter don't work together
- Empty state doesn't appear when no results match
- Status badge colors are incorrect
- Email links are not clickable or missing mailto:
- Loading state doesn't appear
- Error state doesn't handle API failures
- Logout button doesn't work
- Dashboard accessible after logout
- Console contains errors
- API requests fail

## Output Format
```json
{
  "test_name": "Dashboard User Profile Cards",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/01_redirect_to_login.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/02_login_success.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/03_dashboard_header.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/04_loading_state.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/05_user_cards_loaded.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/06_card_details.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/07_desktop_layout.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/08_tablet_layout.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/09_mobile_layout.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/10_search_sarah.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/11_search_engineer.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/12_filter_engineering.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/13_combined_filters.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/14_empty_state.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/15_status_badges.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/16_email_links.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/17_logout_from_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_user_cards/18_protected_after_logout.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
- Remove any test screenshots if needed
