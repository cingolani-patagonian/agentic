# E2E Test: Search Bar Label and Alignment

## Test Metadata
- Test Name: Search Bar Label and Alignment
- Test ID: test_search_bar_alignment
- Application URL: http://localhost:3000
- Purpose: Validate that the search bar has a visible label that matches the department filter label styling and both components are properly aligned

## User Story
As a user viewing the team directory dashboard, I want to see clear labels for both the search and filter controls so that I can immediately understand the purpose of each input and have a more intuitive, accessible experience when searching for team members.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system implemented with mock credentials
- Mock user database with 25 user profiles
- SearchBar component with visible "Search" label
- DepartmentFilter component with visible "Department" label
- Dashboard with side-by-side layout on desktop (md:flex-row)

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
cd app/nextjs && npm run dev > /tmp/nextjs-search-alignment-dev.log 2>&1 &
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

### Step 4: Verify Search Label Exists and Has Correct Text
**Action:** Check that the search bar has a visible label element
**Verify:**
- Label element is visible above the search input
- Label text reads "Search"
- Label is properly positioned above the input field
**Expected:** Search bar has visible label with text "Search"
**Screenshot:** 02_search_label_visible.png

### Step 5: Verify Department Label Exists for Comparison
**Action:** Check that the department filter has a visible label element
**Verify:**
- Label element is visible above the department dropdown
- Label text reads "Department"
- Label is properly positioned above the dropdown
**Expected:** Department filter has visible label with text "Department"
**Screenshot:** 03_department_label_visible.png

### Step 6: Verify Label Styling Matches
**Action:** Inspect the CSS classes and styling of both labels
**Verify:**
- Search label has classes: "block text-sm font-medium text-gray-700 mb-1"
- Department label has classes: "block text-sm font-medium text-gray-700 mb-1"
- Both labels use the same font size, weight, color, and margin
- Labels have consistent visual appearance
**Expected:** Both labels have identical styling
**Screenshot:** 04_label_styling_comparison.png

### Step 7: Verify Vertical Alignment on Desktop View
**Action:** Ensure browser is at desktop width (1280x720 or larger)
**Verify:**
- Search bar and department filter are displayed side-by-side horizontally
- Both labels are at the same vertical position (baseline alignment)
- Both input elements are at the same vertical position
- Gap spacing between the two components is consistent
- No visual misalignment between the components
**Expected:** Components are properly aligned vertically on desktop
**Screenshot:** 05_desktop_alignment.png

### Step 8: Verify Label-to-Input Association (Accessibility)
**Action:** Inspect the HTML structure of the search component
**Verify:**
- Search label has htmlFor attribute set to "search-input"
- Search input has id attribute set to "search-input"
- Label and input are properly linked for accessibility
- Clicking the label focuses the input field
**Expected:** Label is properly associated with input for accessibility
**Screenshot:** 06_label_input_association.png

### Step 9: Test Label Click Behavior
**Action:** Click on the "Search" label
**Verify:**
- Clicking the label focuses the search input field
- Cursor appears in the search input
- Input receives focus styling (ring-2 ring-indigo-500)
**Expected:** Clicking label focuses the input
**Screenshot:** 07_label_click_focus.png

### Step 10: Verify Responsive Behavior - Mobile View
**Action:** Resize browser to mobile size (375x667)
**Verify:**
- Search bar and department filter stack vertically
- Search label remains visible above search input
- Department label remains visible above department dropdown
- Both labels maintain consistent spacing (mb-1) above their inputs
- Labels are properly aligned with their inputs on mobile
- No horizontal layout issues or overlapping
**Expected:** Labels work correctly on mobile with vertical stacking
**Screenshot:** 08_mobile_responsive_labels.png

### Step 11: Verify Consistent Spacing Between Label and Input
**Action:** Measure the spacing between label and input for both components
**Verify:**
- Search label has mb-1 (4px margin bottom) above the input
- Department label has mb-1 (4px margin bottom) above the dropdown
- Spacing is visually consistent between both components
- No extra padding or margin causing misalignment
**Expected:** Consistent spacing between labels and inputs
**Screenshot:** 09_label_spacing.png

### Step 12: Verify Visual Hierarchy and Professional Appearance
**Action:** Take a full screenshot of the dashboard with both labeled components
**Verify:**
- Dashboard looks polished and professional
- Labels provide clear context for each input
- Visual hierarchy is clear (labels → inputs)
- No visual inconsistencies or missing elements
- Both components have equal visual weight
**Expected:** Dashboard has professional appearance with clear labeling
**Screenshot:** 10_overall_visual_hierarchy.png

### Step 13: Test Search Functionality with Label Present
**Action:** Type "engineer" into the search input
**Verify:**
- Search functionality works correctly with the new label present
- No layout shifts when typing
- Clear button appears as expected
- Label remains properly positioned during interaction
- All existing functionality is preserved
**Expected:** Search works perfectly with the label
**Screenshot:** 11_search_functionality_with_label.png

### Step 14: Test Department Filter with Both Labels Visible
**Action:** Select "Engineering" from the department dropdown
**Verify:**
- Department filter works correctly
- Both labels remain visible and properly aligned
- Active filters indicator appears below
- No layout issues when filters are active
**Expected:** Department filter works with both labels present
**Screenshot:** 12_filters_active_with_labels.png

### Step 15: Verify Tablet View (768px - 1024px)
**Action:** Resize browser to tablet size (768x1024)
**Verify:**
- Components may be side-by-side or stacked depending on breakpoint
- Labels are visible in both cases
- Alignment is maintained
- Layout transitions smoothly between breakpoints
**Expected:** Labels work correctly on tablet sizes
**Screenshot:** 13_tablet_view_labels.png

### Step 16: Verify No Layout Regressions
**Action:** Compare current layout with expected layout
**Verify:**
- Header section unchanged
- User cards display correctly
- Results count shows properly
- Active filters (if any) display correctly
- Footer unchanged
- Only change is the addition of the "Search" label
**Expected:** No regressions in other parts of the dashboard
**Screenshot:** 14_no_layout_regressions.png

### Step 17: Check Console for Errors
**Action:** Review browser console for any JavaScript errors or warnings
**Verify:** No console errors related to the search bar label or rendering
**Expected:** Clean console output

### Step 18: Verify ARIA Attributes Maintained
**Action:** Inspect accessibility attributes on search input
**Verify:**
- Input still has aria-label "Search users"
- Input still has aria-describedby "search-description"
- Hidden description text still present for screen readers
- All existing accessibility features preserved
**Expected:** Accessibility attributes unchanged and working
**Screenshot:** 15_accessibility_maintained.png

### Step 19: Test With Empty Search and Default Filter
**Action:** Clear all filters and return to default state
**Verify:**
- Labels remain visible and properly aligned
- Layout is clean and uncluttered
- Both labels are readable and clear
- Visual balance is maintained
**Expected:** Labels look good in default state
**Screenshot:** 16_default_state_with_labels.png

### Step 20: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Dashboard loads correctly with authentication
- ✅ Search bar has visible label with text "Search"
- ✅ Department filter has visible label with text "Department"
- ✅ Both labels have identical CSS styling: "block text-sm font-medium text-gray-700 mb-1"
- ✅ Labels are properly aligned vertically on desktop view
- ✅ Search label is linked to search input with htmlFor and id attributes
- ✅ Clicking label focuses the input field
- ✅ Labels work correctly on mobile with vertical stacking
- ✅ Consistent spacing (mb-1) between labels and inputs
- ✅ Dashboard has professional appearance with clear visual hierarchy
- ✅ All existing search functionality is preserved
- ✅ All existing filter functionality is preserved
- ✅ Labels work correctly on tablet sizes
- ✅ No layout regressions in other dashboard sections
- ✅ No console errors
- ✅ Accessibility attributes maintained

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Search bar has no visible label
- Search label text is not "Search"
- Labels have different styling
- Labels are not vertically aligned on desktop
- Label is not properly linked to input (no htmlFor/id association)
- Clicking label doesn't focus the input
- Labels don't work on mobile (missing or misaligned)
- Spacing is inconsistent between components
- Search functionality is broken
- Filter functionality is broken
- Layout regressions in other sections
- Console contains errors
- Accessibility attributes are missing or broken

## Output Format
```json
{
  "test_name": "Search Bar Label and Alignment",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/01_login_and_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/02_search_label_visible.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/03_department_label_visible.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/04_label_styling_comparison.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/05_desktop_alignment.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/06_label_input_association.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/07_label_click_focus.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/08_mobile_responsive_labels.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/09_label_spacing.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/10_overall_visual_hierarchy.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/11_search_functionality_with_label.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/12_filters_active_with_labels.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/13_tablet_view_labels.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/14_no_layout_regressions.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/15_accessibility_maintained.png",
    "<absolute_path>/media/e2e/<adw_id>/search_bar_alignment/16_default_state_with_labels.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
