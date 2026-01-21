# Feature: Make header fixed and responsive, rename to 'User List'

## Metadata
issue_number: `31`
adw_id: `4dbe98e6`
issue_json: `{"number":31,"title":"Make header fixed and responsive, rename to 'User List'","body":"Update the main header to remain fixed while content scrolls and rename the application title.\n\n**Description:**\nThe main header should stay fixed at the top of the page when users scroll through the content. Additionally, change the application name from \"Mock User Dashboard\" to \"User List\".\n\n**Acceptance Criteria:**\n- Header remains fixed at the top of the viewport when scrolling\n- Header is fully responsive (100% width)\n- Content scrolls underneath the fixed header\n- Application title changed from \"Mock User Dashboard\" to \"User List\"\n- Header maintains proper z-index to stay above scrolling content\n- No layout shift or jumping when scrolling\n- Works correctly on all screen sizes (mobile, tablet, desktop)\n\n**Technical Notes:**\n- Likely needs `position: fixed` or `position: sticky` CSS\n- Ensure proper spacing/padding on main content to account for fixed header height\n- Test scrolling behavior across different browsers"}`

## Feature Description
This feature updates the navigation header to remain fixed at the top of the viewport when users scroll through content, providing consistent access to navigation controls regardless of scroll position. Additionally, it rebrands the application from "Mock User Dashboard" to "User List" across all locations where the title appears. The fixed header will maintain proper z-index layering, remain fully responsive across all screen sizes, and ensure content scrolls smoothly underneath without layout shifts or visual glitches.

## User Story
As a user
I want the navigation header to remain visible at the top while I scroll through content and see a clearer application name
So that I can easily access navigation controls at any time and understand the application's purpose at a glance

## Problem Statement
Currently, the navigation header scrolls out of view when users navigate down the page, requiring them to scroll back to the top to access navigation links, user menu, or logout functionality. This creates friction in the user experience, especially on pages with long content like the dashboard with many user cards. Additionally, the application name "Mock User Dashboard" doesn't accurately represent the application's focus on user listing and management.

## Solution Statement
Implement a fixed positioning strategy for the navigation header using CSS `position: fixed` to keep it anchored at the top of the viewport. Add appropriate padding to the main content area to account for the fixed header height, preventing content from being hidden behind the header. Apply a high z-index value to ensure the header stays above all scrolling content. Update all references to "Mock User Dashboard" throughout the application to "User List" for clearer branding. Ensure the solution works seamlessly across all screen sizes (mobile, tablet, desktop) and doesn't introduce layout shifts or scrolling issues.

## Relevant Files
Use these files to implement the feature:

- **app/nextjs/components/Navigation.tsx** - Contains the navigation header component that needs fixed positioning. Currently uses relative positioning with bg-gray-800 styling. The brand link displays "Mock User Dashboard" on line 42.

- **app/nextjs/app/layout.tsx** - Contains the root layout structure with Navigation component. The body uses `flex flex-col min-h-screen` layout and main has `flex-grow` class. May need adjustment to accommodate fixed header spacing.

- **app/nextjs/app/globals.css** - Global styles file where we can add custom CSS for fixed header behavior, including padding/margin adjustments for the body or main content area.

- **app/nextjs/components/Footer.tsx** - Contains "Mock User Dashboard" references on lines 11 and 15 that need to be updated to "User List".

- **app/nextjs/app/layout.tsx** - Contains metadata with title "Mock User Dashboard" on line 11 that needs updating to "User List".

- **.claude/commands/test_e2e.md** - E2E test runner documentation for understanding how to create E2E tests with Playwright.

- **.claude/commands/e2e/test_responsive_navigation.md** - Existing E2E test for responsive navigation that will need to be updated to reflect the new fixed header behavior and "User List" branding.

### New Files
- **.claude/commands/e2e/test_fixed_header_user_list.md** - New E2E test file to validate the fixed header behavior and "User List" branding changes.

## Implementation Plan
### Phase 1: Foundation
Update the Navigation component styling to use fixed positioning and ensure proper z-index layering. This foundational change must be implemented carefully to avoid breaking the existing responsive behavior, mobile menu functionality, and overall layout structure.

### Phase 2: Core Implementation
Add spacing adjustments to the layout to account for the fixed header height, preventing content from being hidden behind the header. Update all occurrences of "Mock User Dashboard" to "User List" throughout the codebase, including the Navigation component, Footer component, and page metadata.

### Phase 3: Integration
Create comprehensive E2E tests to validate the fixed header behavior across different screen sizes and scroll positions. Update existing E2E tests that reference "Mock User Dashboard" to use the new "User List" branding. Ensure all tests pass with zero regressions and the feature works correctly on mobile, tablet, and desktop viewports.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Update Navigation Component to Use Fixed Positioning
- Open `app/nextjs/components/Navigation.tsx`
- Update the `<nav>` element CSS classes to use fixed positioning:
  - Change from `bg-gray-800 text-white` to `fixed top-0 left-0 right-0 bg-gray-800 text-white z-50`
  - The `fixed top-0 left-0 right-0` ensures the header spans the full width and stays at the top
  - The `z-50` ensures the header stays above all scrolling content
- Update the brand link text from "Mock User Dashboard" to "User List" (line 42)
- Verify the navigation remains responsive and mobile menu functionality is not affected

### Task 2: Add Spacing to Layout for Fixed Header
- Open `app/nextjs/app/layout.tsx`
- Add padding to the `<main>` element to account for the fixed header height:
  - Update the main element from `<main className="flex-grow">` to `<main className="flex-grow pt-16">`
  - The `pt-16` (64px) matches the header height (`h-16`) to prevent content from being hidden
- Verify the layout doesn't have any visual shifts or content overlap

### Task 3: Update Page Metadata Title
- Open `app/nextjs/app/layout.tsx`
- Update the metadata title from "Mock User Dashboard" to "User List" (line 11)
- Update the metadata description to reflect the new branding

### Task 4: Update Footer Component Branding
- Open `app/nextjs/components/Footer.tsx`
- Update the copyright text from "Mock User Dashboard" to "User List" (line 11)
- Update the center brand text from "Mock User Dashboard" to "User List" (line 15)

### Task 5: Create E2E Test for Fixed Header and User List Branding
- Read `.claude/commands/test_e2e.md` to understand the E2E test structure
- Read `.claude/commands/e2e/test_responsive_navigation.md` as a reference example
- Create `.claude/commands/e2e/test_fixed_header_user_list.md` with test steps to validate:
  - Header remains fixed at the top when scrolling on the dashboard page
  - Header displays "User List" branding instead of "Mock User Dashboard"
  - Content scrolls smoothly underneath the fixed header
  - No layout shifts or content overlap occurs
  - Fixed header works correctly on mobile, tablet, and desktop screen sizes
  - Footer displays "User List" branding
  - Page metadata title is "User List"
- Include screenshots at key scroll positions and different viewport sizes

### Task 6: Test Fixed Header Behavior Manually
- Navigate to the dashboard page with multiple user cards (ensuring scrollable content)
- Scroll down the page and verify the header remains fixed at the top
- Verify content scrolls underneath the header without being hidden
- Test on different viewport sizes (mobile 375px, tablet 768px, desktop 1920px)
- Verify no layout shifts or jumps occur when scrolling
- Verify the mobile menu still works correctly with the fixed header

### Task 7: Verify Branding Changes
- Check all pages (home, about, dashboard, login, user details) to verify "User List" appears in:
  - Navigation header brand link
  - Footer copyright text
  - Footer center brand text
  - Browser tab title (metadata)
- Use grep to search for any remaining instances of "Mock User Dashboard" and update if found

### Task 8: Run All Validation Commands
- Execute all commands in the `Validation Commands` section below
- Verify zero errors and all tests pass
- Fix any issues that arise and re-run validation

## Testing Strategy
### Unit Tests
No new unit tests are required for this feature as it primarily involves CSS styling changes and text updates. The existing component rendering tests in the server test suite will validate that components render without errors.

### Edge Cases
- **Very long content**: Test scrolling behavior on pages with extensive content to ensure the header remains fixed and doesn't flicker or jump
- **Mobile menu interaction**: Verify the mobile menu overlay and drawer still work correctly with the fixed header, including proper z-index stacking
- **Keyboard navigation**: Test that tab navigation and focus states work correctly with the fixed header
- **Page transitions**: Verify the fixed header doesn't cause layout shifts when navigating between pages
- **Empty pages**: Test on pages with minimal content to ensure the layout doesn't break when there's no scrolling
- **Rapid scrolling**: Test rapid scroll events to ensure smooth performance without jank
- **Browser zoom**: Test at different browser zoom levels (50%, 100%, 150%) to ensure the header remains properly positioned

## Acceptance Criteria
- ✅ Header remains fixed at the top of the viewport when scrolling on all pages
- ✅ Header is fully responsive and spans 100% width at all screen sizes
- ✅ Content scrolls smoothly underneath the fixed header without being hidden
- ✅ Application title is changed from "Mock User Dashboard" to "User List" in Navigation component
- ✅ Application title is changed to "User List" in Footer component (2 locations)
- ✅ Application title is changed to "User List" in page metadata
- ✅ Header maintains proper z-index (z-50) to stay above all scrolling content
- ✅ No layout shift or jumping occurs when scrolling
- ✅ Main content has proper padding (pt-16) to account for fixed header height
- ✅ Fixed header works correctly on mobile (375px), tablet (768px), and desktop (1920px+) screen sizes
- ✅ Mobile menu functionality is not affected by fixed header positioning
- ✅ User dropdown menu works correctly with fixed header
- ✅ Footer remains at the bottom of the page with proper spacing
- ✅ All existing E2E tests pass with updated branding
- ✅ New E2E test validates fixed header behavior and "User List" branding
- ✅ TypeScript compiles without errors
- ✅ Frontend build succeeds without errors

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- Read `.claude/commands/test_e2e.md`, then read and execute your new E2E `.claude/commands/e2e/test_fixed_header_user_list.md` test file to validate the fixed header behavior and "User List" branding
- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation to validate no type errors
- `cd app/nextjs && npm run build` - Run frontend build to validate the feature works with zero regressions
- `cd app/nextjs && grep -r "Mock User Dashboard" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules --exclude-dir=.next` - Verify no remaining references to old branding

## Notes
- The fixed header uses `position: fixed` with `top-0 left-0 right-0` to span the full viewport width and remain at the top
- The z-index value of 50 (`z-50`) is sufficiently high to stay above regular content while not conflicting with modal overlays or mobile menus (which typically use higher z-index values)
- The padding-top of 64px (`pt-16`) on the main content matches the header height of 64px (`h-16`) to prevent content from being hidden behind the fixed header
- The fixed positioning doesn't affect the mobile menu overlay or user dropdown functionality as they have independent positioning and z-index management
- The "User List" branding is more accurate as the application focuses on displaying and managing a list of users rather than being a comprehensive dashboard
- Existing E2E tests for responsive navigation will continue to work but may need minor updates to account for the fixed header behavior
- Consider future enhancements: adding a subtle shadow to the header when scrolling to indicate depth, implementing a "scroll to top" button for long pages, or adding a progress indicator showing scroll position
