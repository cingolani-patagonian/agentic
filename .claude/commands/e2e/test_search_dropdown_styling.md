# E2E Test: Search Bar and Dropdown Styling

## Test Metadata
- Test Name: Search Bar and Dropdown Styling
- Test ID: test_search_dropdown_styling
- Application URL: http://localhost:3000
- Purpose: Validate that the search bar and department filter dropdown have dark, readable text colors with proper contrast ratios, matching heights, and work correctly across all screen sizes

## User Story
As a user viewing the team directory dashboard, I want the search bar and dropdown filter to have clear, dark text that is easy to read so that I can quickly find and filter team members without straining to see the text.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Authentication system implemented with mock credentials
- Mock user database with 25 user profiles
- SearchBar component with text-gray-900 and placeholder:text-gray-500 classes
- DepartmentFilter component with text-gray-900 class
- Both components use py-2 padding for consistent heights

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
cd app/nextjs && npm run dev > /tmp/nextjs-search-dropdown-dev.log 2>&1 &
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

### Step 4: Verify Search Bar Text Color Classes
**Action:** Inspect the search input element's className attribute
**Verify:**
- Search input has "text-gray-900" class applied
- Search input has "placeholder:text-gray-500" class applied
- Classes are in the className string of the input element
**Expected:** Search input has both text-gray-900 and placeholder:text-gray-500 classes
**Screenshot:** 02_search_input_classes.png

### Step 5: Verify Department Filter Text Color Classes
**Action:** Inspect the department select element's className attribute
**Verify:**
- Department select has "text-gray-900" class applied
- Class is in the className string of the select element
**Expected:** Department select has text-gray-900 class
**Screenshot:** 03_department_select_classes.png

### Step 6: Test Search Bar Text Visibility with Input
**Action:** Type "engineer" into the search input field
**Verify:**
- Typed text is dark and clearly visible against white background
- Text appears in a dark color (near black)
- Text is easy to read without straining
- No visual issues with text rendering
**Expected:** Search input text is dark and highly readable
**Screenshot:** 04_search_text_visible.png

### Step 7: Verify Search Bar Placeholder Text
**Action:** Clear the search input and observe the placeholder text
**Verify:**
- Placeholder text "Search..." is visible
- Placeholder is lighter than regular text but still readable
- Placeholder provides good visual hierarchy (less prominent than input text)
- Placeholder is not too dark or too light
**Expected:** Placeholder text is appropriately styled with good contrast
**Screenshot:** 05_search_placeholder.png

### Step 8: Test Department Filter Selected Text Visibility
**Action:** Select "Engineering" from the department dropdown
**Verify:**
- Selected text "Engineering" is dark and clearly visible
- Text appears in a dark color (near black)
- Text is easy to read in the select element
- No visual issues with text rendering
**Expected:** Department filter selected text is dark and highly readable
**Screenshot:** 06_department_text_visible.png

### Step 9: Verify Component Heights Match
**Action:** Measure the rendered heights of both the search input and department select elements
**Verify:**
- Search input element height (including border and padding)
- Department select element height (including border and padding)
- Both elements have the same total height in pixels
- Visual alignment appears consistent
**Expected:** Both components have identical rendered heights
**Screenshot:** 07_matching_heights.png

### Step 10: Test Contrast Ratio for Search Input Text
**Action:** Use browser dev tools or computed styles to verify text color contrast
**Verify:**
- Search input text color is #111827 (text-gray-900) or very close
- Background is white (#FFFFFF)
- Contrast ratio is approximately 18:1 (well above WCAG AAA 7:1)
- Text meets accessibility standards for normal text
**Expected:** Search input text has excellent contrast ratio (>7:1)
**Screenshot:** 08_search_contrast.png

### Step 11: Test Contrast Ratio for Placeholder Text
**Action:** Verify placeholder text color meets accessibility standards
**Verify:**
- Placeholder text color is #6B7280 (text-gray-500) or very close
- Background is white (#FFFFFF)
- Contrast ratio is approximately 4.6:1 (meets WCAG AA 4.5:1)
- Placeholder text is readable while maintaining visual hierarchy
**Expected:** Placeholder text has sufficient contrast ratio (>4.5:1)
**Screenshot:** 09_placeholder_contrast.png

### Step 12: Test Contrast Ratio for Department Filter Text
**Action:** Use browser dev tools to verify select text color contrast
**Verify:**
- Department select text color is #111827 (text-gray-900) or very close
- Background is white (#FFFFFF)
- Contrast ratio is approximately 18:1 (well above WCAG AAA 7:1)
- Text meets accessibility standards
**Expected:** Department filter text has excellent contrast ratio (>7:1)
**Screenshot:** 10_department_contrast.png

### Step 13: Test Mobile View (375px) - Text Readability
**Action:** Resize browser to mobile size (375x667)
**Verify:**
- Search bar text remains dark and readable on mobile
- Department filter text remains dark and readable on mobile
- Both components stack vertically
- Text color is consistent with desktop view
- No layout issues affecting text visibility
**Expected:** Text is dark and readable on mobile devices
**Screenshot:** 11_mobile_text_readable.png

### Step 14: Test Mobile View - Component Heights
**Action:** Measure component heights on mobile view
**Verify:**
- Search input height is consistent with desktop
- Department select height is consistent with desktop
- Both components still have matching heights on mobile
- Vertical spacing is appropriate
**Expected:** Component heights remain consistent on mobile
**Screenshot:** 12_mobile_heights.png

### Step 15: Test Tablet View (768px) - Text and Heights
**Action:** Resize browser to tablet size (768x1024)
**Verify:**
- Search bar text is dark and readable
- Department filter text is dark and readable
- Component heights remain consistent
- Layout may be side-by-side or stacked depending on breakpoint
- No visual regressions on tablet sizes
**Expected:** Text readability and height consistency maintained on tablet
**Screenshot:** 13_tablet_view.png

### Step 16: Test Desktop View (1280px) - Full Layout
**Action:** Resize browser to desktop size (1280x720)
**Verify:**
- Search bar and department filter side-by-side horizontally
- Both components aligned vertically with matching heights
- Text in both components is dark and readable
- Visual consistency between the two components
- Professional appearance
**Expected:** Components have matching heights and dark, readable text on desktop
**Screenshot:** 14_desktop_full_layout.png

### Step 17: Test Combined Filters with Text Visibility
**Action:** Type "jane" in search and select "Marketing" department
**Verify:**
- Both input and select show dark, readable text simultaneously
- No visual conflicts between active filters
- Text remains clearly visible in both components
- Layout remains stable with both filters active
**Expected:** Text is readable in both components when filters are active
**Screenshot:** 15_combined_filters_text.png

### Step 18: Test Focus States Don't Affect Text Color
**Action:** Click into search input to focus it
**Verify:**
- Text color remains dark when focused
- Focus ring appears (indigo-500) without affecting text color
- Text is still clearly readable while focused
**Action:** Tab to department filter and observe
**Verify:**
- Select text color remains dark when focused
- Focus ring appears without affecting text color
**Expected:** Text color is unaffected by focus states
**Screenshot:** 16_focus_states.png

### Step 19: Verify No Layout Regressions
**Action:** Compare current dashboard layout with expected layout
**Verify:**
- Header section unchanged
- User cards display correctly
- Results count shows properly
- Active filters (if any) display correctly
- Only changes are text colors in search and dropdown components
- No unintended side effects
**Expected:** No regressions in other parts of the dashboard
**Screenshot:** 17_no_regressions.png

### Step 20: Test Zoom Levels - 150% and 200%
**Action:** Set browser zoom to 150%
**Verify:**
- Text remains dark and readable at 150% zoom
- Component heights remain consistent
- No layout breakage
**Action:** Set browser zoom to 200%
**Verify:**
- Text remains dark and readable at 200% zoom
- Component heights remain consistent
- Layout scales appropriately
**Expected:** Text readability and height consistency at all zoom levels
**Screenshot:** 18_zoom_levels.png

### Step 21: Check Console for Errors
**Action:** Review browser console for any JavaScript errors or warnings
**Verify:** No console errors related to styling or rendering
**Expected:** Clean console output

### Step 22: Test Search Functionality Still Works
**Action:** Type "developer" and verify filtering works
**Verify:**
- Search functionality is unchanged
- User cards filter correctly
- Clear button works
- All existing search behavior preserved
**Expected:** Search functionality works perfectly with new styling
**Screenshot:** 19_search_functionality.png

### Step 23: Test Department Filter Functionality Still Works
**Action:** Select different departments and verify filtering works
**Verify:**
- Department filter functionality is unchanged
- User cards filter correctly by department
- All existing filter behavior preserved
**Expected:** Department filter works perfectly with new styling
**Screenshot:** 20_filter_functionality.png

### Step 24: Verify Default State Appearance
**Action:** Clear all filters and return to default state
**Verify:**
- Search placeholder is visible and appropriately styled
- Department dropdown shows "All Departments" in dark text
- Both components look professional and polished
- Visual hierarchy is clear
**Expected:** Default state looks clean and professional
**Screenshot:** 21_default_state.png

### Step 25: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Dashboard loads correctly with authentication
- ✅ Search input has "text-gray-900" class applied
- ✅ Search input has "placeholder:text-gray-500" class applied
- ✅ Department select has "text-gray-900" class applied
- ✅ Search input text is dark and clearly visible when typing
- ✅ Search placeholder text is appropriately styled and readable
- ✅ Department filter selected text is dark and clearly visible
- ✅ Search input and department select have identical rendered heights
- ✅ Search input text contrast ratio meets WCAG AAA (>7:1)
- ✅ Placeholder text contrast ratio meets WCAG AA (>4.5:1)
- ✅ Department filter text contrast ratio meets WCAG AAA (>7:1)
- ✅ Text is dark and readable on mobile (375px)
- ✅ Component heights are consistent on mobile
- ✅ Text is dark and readable on tablet (768px)
- ✅ Components have matching heights and readable text on desktop (1280px)
- ✅ Text remains readable when both filters are active
- ✅ Focus states don't affect text color
- ✅ No layout regressions in other dashboard sections
- ✅ Text is readable at 150% and 200% zoom
- ✅ No console errors
- ✅ Search functionality is preserved
- ✅ Department filter functionality is preserved
- ✅ Default state looks professional

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Search input missing "text-gray-900" class
- Search input missing "placeholder:text-gray-500" class
- Department select missing "text-gray-900" class
- Text is not dark or difficult to read
- Placeholder text is too dark or too light
- Component heights don't match
- Contrast ratios don't meet accessibility standards (4.5:1 minimum)
- Text is not readable on mobile, tablet, or desktop
- Text color changes with focus states
- Layout regressions in other sections
- Console contains errors
- Search functionality is broken
- Filter functionality is broken
- Text is not readable at higher zoom levels

## Output Format
```json
{
  "test_name": "Search Bar and Dropdown Styling",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/01_login_and_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/02_search_input_classes.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/03_department_select_classes.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/04_search_text_visible.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/05_search_placeholder.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/06_department_text_visible.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/07_matching_heights.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/08_search_contrast.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/09_placeholder_contrast.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/10_department_contrast.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/11_mobile_text_readable.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/12_mobile_heights.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/13_tablet_view.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/14_desktop_full_layout.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/15_combined_filters_text.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/16_focus_states.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/17_no_regressions.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/18_zoom_levels.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/19_search_functionality.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/20_filter_functionality.png",
    "<absolute_path>/media/e2e/<adw_id>/search_dropdown_styling/21_default_state.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
