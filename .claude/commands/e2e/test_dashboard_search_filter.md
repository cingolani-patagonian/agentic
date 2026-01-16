# E2E Test: Dashboard Search and Filter Enhancement

## Test Metadata
- Test Name: Dashboard Search and Filter Enhancement
- Test ID: test_dashboard_search_filter
- Application URL: http://localhost:3000
- Purpose: Validate that the dashboard search and filter enhancements work correctly including debouncing, clear button, active filters indicator, URL query parameters, and filter combinations

## User Story
As a logged-in user viewing the team directory dashboard, I want to search for specific users by name, email, or role and filter by department with clear visual feedback, a clear button to reset search, debounced search input, active filters indicator, and URL persistence, so that I can quickly find the people I'm looking for, share filtered views via URL, and have a smooth, responsive experience even with large teams.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/ including use-debounce
- No other service running on port 3000
- Authentication system implemented with mock credentials
- Mock user database with 25 user profiles
- Mock API service with getAllUsers functionality
- SearchBar component with clear button
- ActiveFilters component implemented
- Dashboard with debouncing and URL synchronization

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
cd app/nextjs && npm run dev > /tmp/nextjs-dashboard-search-filter-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Navigate to Dashboard and Login
**Action:** Open http://localhost:3000/dashboard in Playwright browser
**Verify:** Should redirect to /login since user is not authenticated
**Expected:** URL changes to http://localhost:3000/login
**Action:** Enter admin credentials (username: "admin", password: "admin123") and submit
**Verify:** User is logged in and redirected to dashboard
**Expected:** URL is http://localhost:3000/dashboard
**Screenshot:** 01_login_and_dashboard.png

### Step 4: Verify Initial Dashboard State
**Action:** Check dashboard loads with all users
**Verify:**
- All 25 user cards are visible
- Search bar is empty
- Department filter shows "All Departments"
- No active filters indicator is visible
- Count shows "Showing 25 of 25 users"
- URL has no query parameters
**Expected:** Dashboard loads in default state
**Screenshot:** 02_initial_dashboard_state.png

### Step 5: Test Search Bar Clear Button - Button Appears
**Action:** Type "sarah" into the search bar
**Verify:**
- Input updates immediately as typing
- Clear button (X icon) appears on the right side of the search input
- Clear button is visible and styled correctly
**Expected:** Clear button appears when text is entered
**Screenshot:** 03_clear_button_appears.png

### Step 6: Test Search Debouncing
**Action:** Type "eng" quickly and observe
**Verify:**
- Input field updates immediately showing "eng"
- Wait 300ms for debouncing
- After 300ms delay, filtered results appear
- Active filters indicator shows with search chip
- Results count updates
**Expected:** Search is debounced with 300ms delay
**Screenshot:** 04_debounced_search.png

### Step 7: Test Clear Button Functionality
**Action:** Click the clear button (X icon) in the search bar
**Verify:**
- Search input clears immediately
- All 25 user cards return
- Active filters indicator disappears
- Clear button disappears (no text in input)
- URL parameter 'search' is removed
**Expected:** Clear button removes search text and resets results
**Screenshot:** 05_clear_button_clicked.png

### Step 8: Test Active Filters Indicator - Search
**Action:** Enter "engineer" in the search bar and wait for debounce
**Verify:**
- Active filters indicator appears below search/filter bar
- Shows "Active Filters (1):"
- Displays search chip with text "Search: engineer"
- Search chip has an X button to remove it
**Expected:** Active filters indicator shows search filter
**Screenshot:** 06_active_filters_search.png

### Step 9: Test URL Parameter - Search Only
**Action:** Check the URL after search is applied
**Verify:**
- URL updates to include search parameter: /dashboard?search=engineer
- Opening this URL in a new tab applies the search filter automatically
**Expected:** URL persists search query parameter
**Screenshot:** 07_url_search_param.png

### Step 10: Test Department Filter
**Action:** Clear search, then select "Engineering" from department dropdown
**Verify:**
- Only Engineering department users are displayed
- Active filters indicator appears
- Shows "Active Filters (1):"
- Displays department chip with text "Department: Engineering"
- Department chip has an X button
- Results count updates correctly
**Expected:** Department filter works and shows in active filters
**Screenshot:** 08_department_filter_active.png

### Step 11: Test URL Parameter - Department Only
**Action:** Check the URL after department filter is applied
**Verify:**
- URL updates to include department parameter: /dashboard?department=Engineering
- No search parameter in URL
**Expected:** URL persists department query parameter
**Screenshot:** 09_url_department_param.png

### Step 12: Test Combined Filters (Search + Department)
**Action:** With "Engineering" selected, enter "senior" in search bar
**Verify:**
- Both filters apply simultaneously (AND logic)
- Only Engineering users with "senior" in name/email/role are shown
- Active filters indicator shows "Active Filters (2):"
- Both search chip and department chip are displayed
- Results count reflects combined filtering
**Expected:** Search and department filters work together
**Screenshot:** 10_combined_filters.png

### Step 13: Test URL Parameters - Combined Filters
**Action:** Check the URL with both filters applied
**Verify:**
- URL includes both parameters: /dashboard?search=senior&department=Engineering
- Opening this URL in a new tab applies both filters automatically
**Expected:** URL persists multiple query parameters
**Screenshot:** 11_url_combined_params.png

### Step 14: Test Clear Individual Filter - Search Chip
**Action:** Click the X button on the search chip in active filters
**Verify:**
- Search input clears
- Search chip disappears from active filters
- Department chip remains
- Active filters shows "Active Filters (1):"
- Results show all Engineering users (department filter still active)
- URL updates to /dashboard?department=Engineering (search param removed)
**Expected:** Individual filter chip removal works correctly
**Screenshot:** 12_clear_search_chip.png

### Step 15: Test Clear Individual Filter - Department Chip
**Action:** Apply both filters again, then click X button on department chip
**Verify:**
- Department filter resets to "All Departments"
- Department chip disappears from active filters
- Search chip remains
- Active filters shows "Active Filters (1):"
- Results show all users matching search (no department filter)
- URL updates to /dashboard?search=senior (department param removed)
**Expected:** Individual department chip removal works correctly
**Screenshot:** 13_clear_department_chip.png

### Step 16: Test Clear All Filters Button
**Action:** Apply both search and department filters again
**Verify:** Both chips visible in active filters
**Action:** Click "Clear all filters" button
**Verify:**
- Search input clears
- Department dropdown resets to "All Departments"
- Active filters indicator disappears completely
- All 25 user cards return
- Results count shows "Showing 25 of 25 users"
- URL resets to /dashboard (no query parameters)
**Expected:** Clear all filters button resets everything
**Screenshot:** 14_clear_all_filters.png

### Step 17: Test URL Parameter Loading on Page Load
**Action:** Navigate directly to /dashboard?search=sarah&department=Design
**Verify:**
- Page loads with filters already applied
- Search input shows "sarah"
- Department dropdown shows "Design"
- Active filters indicator shows both chips
- Filtered results display correctly
- Results count reflects the filters
**Expected:** URL parameters initialize filters on page load
**Screenshot:** 15_url_params_on_load.png

### Step 18: Test Empty State with Filters
**Action:** Enter "zzzzz" in search (no matches)
**Verify:**
- No user cards are displayed
- Empty state component appears
- Active filters indicator still visible with search chip
- Message says "No users found" with suggestion to adjust filters
- Clear button in search bar is visible
**Expected:** Empty state displays when filters return no results
**Screenshot:** 16_empty_state_with_filters.png

### Step 19: Test Clear Button from Empty State
**Action:** Click the clear button in search bar from empty state
**Verify:**
- Search clears
- All users return
- Active filters indicator disappears
- Empty state disappears
**Expected:** Clear button works from empty state
**Screenshot:** 17_clear_from_empty_state.png

### Step 20: Test Rapid Typing (Debouncing Performance)
**Action:** Type "engineering" quickly without pausing
**Verify:**
- Input field updates immediately with each keystroke
- Filtering does NOT happen after each keystroke
- Only after 300ms of no typing, filtering occurs once
- Only one filter operation happens (not 11 separate filters)
**Expected:** Debouncing prevents excessive filter operations
**Note:** This tests performance optimization

### Step 21: Test Active Filters Indicator Visibility
**Action:** Clear all filters
**Verify:** Active filters indicator is NOT visible
**Action:** Add only search query
**Verify:** Active filters indicator appears
**Action:** Clear search, add only department filter
**Verify:** Active filters indicator appears
**Action:** Select "All Departments"
**Verify:** Active filters indicator disappears
**Expected:** Active filters only shows when filters are active
**Screenshot:** 18_active_filters_visibility.png

### Step 22: Test URL Cleanup - Default Values
**Action:** Navigate to /dashboard?search=test&department=Engineering
**Action:** Clear search and reset department to "All Departments"
**Verify:**
- URL updates to /dashboard (no query parameters)
- Empty or default filter values don't appear in URL
**Expected:** URL parameters removed when filters are cleared
**Screenshot:** 19_url_cleanup.png

### Step 23: Test Special Characters in Search
**Action:** Enter "sarah.johnson@" in search bar
**Verify:**
- Search works correctly with special characters
- URL encodes special characters properly
- Results filter correctly (should match email)
- Active filters shows search with special characters
**Expected:** Special characters in search are handled correctly
**Screenshot:** 20_special_chars_search.png

### Step 24: Test Search Across Multiple Fields
**Action:** Clear all filters
**Action:** Search for "sarah" (matches name)
**Verify:** User with name Sarah is shown
**Action:** Clear and search for "engineer" (matches role)
**Verify:** Users with role containing engineer are shown
**Action:** Clear and search for "@example.com" (matches email)
**Verify:** Users with @example.com in email are shown
**Expected:** Search works across name, email, and role fields
**Screenshots:** 21_search_by_name.png, 22_search_by_role.png, 23_search_by_email.png

### Step 25: Test Browser Back/Forward with URL Parameters
**Action:** Apply search filter, then department filter (each creates URL history)
**Action:** Click browser back button
**Verify:**
- Filters update to match previous URL state
- Active filters indicator updates
- Results update correctly
**Action:** Click browser forward button
**Verify:**
- Filters restore to forward state
- Everything updates correctly
**Expected:** Browser navigation works with URL parameters
**Screenshot:** 24_browser_navigation.png

### Step 26: Test Responsive Design - Mobile View
**Action:** Resize browser to mobile size (375x667)
**Verify:**
- Search bar and department filter stack vertically
- Active filters indicator displays properly on mobile
- Filter chips wrap appropriately
- "Clear all filters" button is accessible
- Results still display correctly
**Expected:** Responsive design works on mobile
**Screenshot:** 25_mobile_responsive.png

### Step 27: Test Accessibility - Keyboard Navigation
**Action:** Use Tab key to navigate through page
**Verify:**
- Can tab to search input, department dropdown, filter chips, clear buttons
- Focus indicators are visible
- Can clear individual filters using Enter/Space on X buttons
- Can clear search using keyboard on clear button
**Expected:** Full keyboard accessibility
**Note:** Test with keyboard only, no mouse

### Step 28: Test Accessibility - ARIA Labels
**Action:** Inspect elements with accessibility tools
**Verify:**
- Search input has aria-label "Search users"
- Clear button in search bar has aria-label "Clear search"
- Department filter has aria-label "Filter by department"
- Filter chip X buttons have descriptive aria-labels
**Expected:** All interactive elements have proper ARIA labels
**Screenshot:** 26_accessibility_labels.png

### Step 29: Test Results Count Accuracy
**Action:** Test various filter combinations
**Verify:**
- Count is accurate for: no filters (25 of 25)
- Count is accurate for: search only
- Count is accurate for: department only
- Count is accurate for: combined filters
- Count is accurate for: no results (0 of 25)
**Expected:** Results count is always accurate
**Screenshot:** 27_results_count_accuracy.png

### Step 30: Test Long Search Query Display
**Action:** Enter a very long search query (50+ characters)
**Verify:**
- Search input handles long text correctly
- Active filters chip truncates long text appropriately
- Clear button remains accessible
- URL encoding handles long query
**Expected:** Long queries are handled gracefully
**Screenshot:** 28_long_search_query.png

### Step 31: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings related to search, filters, debouncing, or URL updates
**Expected:** Clean console output

### Step 32: Verify Network Requests
**Action:** Check network requests during search and filter operations
**Verify:**
- getAllUsers API is called once on dashboard load
- No additional API calls when typing (client-side filtering)
- No excessive API calls during debouncing
**Expected:** Efficient network usage

### Step 33: Test Logout and Re-login with Filters
**Action:** Apply filters, then logout
**Verify:** Redirects to login
**Action:** Login again
**Verify:**
- Dashboard loads in default state
- Filters from previous session are NOT persisted
- URL has no query parameters
**Expected:** Filters reset after logout/login cycle
**Screenshot:** 29_filters_after_relogin.png

### Step 34: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Dashboard loads correctly with authentication
- ✅ Search bar displays clear button when text is entered
- ✅ Clear button removes search text and resets results
- ✅ Search input is debounced with 300ms delay
- ✅ Filtering happens after debounce delay, not on every keystroke
- ✅ Active filters indicator appears when filters are active
- ✅ Active filters shows correct count and filter chips
- ✅ Each filter chip has working X button to remove filter
- ✅ "Clear all filters" button removes all filters
- ✅ Search works across name, email, and role fields
- ✅ Department filter works correctly
- ✅ Search and department filters work together (AND logic)
- ✅ URL parameters update when filters change
- ✅ URL parameters initialize filters on page load
- ✅ Sharing filtered URL preserves filters
- ✅ Empty or default values are removed from URL
- ✅ Special characters in search are handled correctly
- ✅ Results count updates accurately with filters
- ✅ Empty state displays when no results match filters
- ✅ Browser back/forward navigation works with URL parameters
- ✅ Responsive design works on mobile
- ✅ Full keyboard accessibility
- ✅ Proper ARIA labels on all elements
- ✅ No console errors during operation
- ✅ Efficient network usage (no excessive API calls)
- ✅ Filters reset after logout/login

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Clear button doesn't appear when typing
- Clear button doesn't work or doesn't clear search
- Search is not debounced (filters on every keystroke)
- Active filters indicator doesn't appear when filters are active
- Active filters shows incorrect count or missing chips
- Filter chip X buttons don't work
- "Clear all filters" button doesn't work
- Search doesn't work across all fields (name, email, role)
- Department filter doesn't work correctly
- Combined filters don't work together (AND logic fails)
- URL parameters don't update when filters change
- URL parameters don't initialize filters on page load
- URL includes empty or default values incorrectly
- Special characters break search or URL encoding
- Results count is inaccurate
- Empty state doesn't appear for no results
- Browser back/forward navigation doesn't work
- Responsive design breaks on mobile
- Keyboard navigation doesn't work
- ARIA labels are missing or incorrect
- Console contains errors
- Excessive API calls during filtering or typing
- Dashboard is accessible without authentication

## Output Format
```json
{
  "test_name": "Dashboard Search and Filter Enhancement",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/01_login_and_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/02_initial_dashboard_state.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/03_clear_button_appears.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/04_debounced_search.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/05_clear_button_clicked.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/06_active_filters_search.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/07_url_search_param.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/08_department_filter_active.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/09_url_department_param.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/10_combined_filters.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/11_url_combined_params.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/12_clear_search_chip.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/13_clear_department_chip.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/14_clear_all_filters.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/15_url_params_on_load.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/16_empty_state_with_filters.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/17_clear_from_empty_state.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/18_active_filters_visibility.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/19_url_cleanup.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/20_special_chars_search.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/21_search_by_name.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/22_search_by_role.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/23_search_by_email.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/24_browser_navigation.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/25_mobile_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/26_accessibility_labels.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/27_results_count_accuracy.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/28_long_search_query.png",
    "<absolute_path>/media/e2e/<adw_id>/dashboard_search_filter/29_filters_after_relogin.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
- Remove any test screenshots if needed
