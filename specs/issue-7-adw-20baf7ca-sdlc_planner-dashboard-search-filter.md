# Feature: Dashboard Search and Filter Capabilities

## Metadata
issue_number: `7`
adw_id: `20baf7ca`
issue_json: `{"number":7,"title":"Add search and filter capabilities to dashboard","body":"# Issue #7: Search and Filter Functionality\n\n**Title:** Add search and filter capabilities to dashboard\n\n**Labels:** feature, enhancement\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nImplement search and filtering features to help users find specific profiles quickly.\n\n## Requirements\n\n- Search bar component:\n  - Real-time search as user types\n  - Search by name, email, or role\n  - Debounced to avoid excessive filtering\n  - Clear button to reset search\n- Department filter:\n  - Dropdown with all available departments\n  - \"All Departments\" option to show everyone\n  - Updates results immediately\n- Active filters indicator showing applied filters\n- Results count display\n- Combine search and filters (AND logic)\n- Preserve filters in URL query params (optional)\n- Loading state during filtering\n\n## Acceptance Criteria\n\n- Search filters results in real-time\n- Department filter works correctly\n- Multiple filters can be combined\n- Clear/reset functionality works\n- UI feedback shows active filters\n- Performance is smooth even with many users"}`

## Feature Description
This feature enhances the existing dashboard with advanced search and filter capabilities to help users quickly find specific profiles in the team directory. The implementation adds real-time search with debouncing, a clear button to reset search, active filters indicator showing applied filters, and URL query parameter preservation for shareable filtered views. The search functionality will filter by name, email, or role, while the department filter allows users to narrow results to specific departments. These features work together with AND logic, providing a powerful and intuitive user experience with immediate feedback and smooth performance.

## User Story
As a logged-in user viewing the team directory dashboard
I want to search for specific users by name, email, or role and filter by department with clear visual feedback
So that I can quickly find the people I'm looking for, share filtered views via URL, and have a smooth, responsive experience even with large teams

## Problem Statement
The current dashboard displays all 25 users as cards with basic search and filter functionality already implemented. However, the user experience lacks several important features: there's no clear button to quickly reset the search, no debouncing which could cause performance issues with larger datasets, no visual indicator showing which filters are active, and no way to share filtered views via URL. Users need a more refined and professional search experience that matches modern web application standards.

## Solution Statement
Enhance the existing SearchBar and dashboard components by adding a clear button with X icon to reset search instantly, implementing input debouncing (300ms) to reduce excessive filtering operations, creating an active filters indicator that shows search query and selected department as removable chips, and adding URL query parameter synchronization using Next.js useSearchParams and useRouter. The solution leverages existing React state management patterns and component architecture, requiring minimal changes to the codebase while significantly improving user experience and performance.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/app/dashboard/page.tsx` - Main dashboard page component that manages user data, search, and filter state. This file will be modified to add debouncing logic, URL query parameter synchronization, and integration with the active filters indicator component.

- `app/nextjs/components/SearchBar.tsx` - Search input component that currently handles real-time search. Will be enhanced with a clear button (X icon) that appears when there's text in the input, allowing users to quickly reset the search.

- `app/nextjs/components/DepartmentFilter.tsx` - Department dropdown filter component. May need minor updates to work seamlessly with the active filters indicator and URL parameters.

- `app/nextjs/lib/api.ts` - Mock API service providing user data. No changes needed but important for understanding data flow and ensuring debouncing works with the API delay simulation.

- `app/nextjs/types/index.ts` - TypeScript type definitions for User, ApiResponse, and other types. May need to add types for filter state if needed.

- `README.md` - Project documentation that describes the application structure. Reference for understanding the Next.js application architecture.

- `.claude/commands/conditional_docs.md` - Documentation guide for determining which docs to read based on task type.

- `.claude/commands/test_e2e.md` - E2E test runner instructions for executing Playwright tests.

- `.claude/commands/e2e/test_dashboard_user_cards.md` - Existing E2E test file for dashboard validation. Reference for understanding test structure and patterns.

### New Files

- `app/nextjs/components/ActiveFilters.tsx` - New component that displays active search query and department filter as removable chips. Shows count of applied filters and allows users to clear individual filters or all at once. Only visible when filters are active.

- `.claude/commands/e2e/test_dashboard_search_filter.md` - New E2E test specification that validates search debouncing, clear button functionality, active filters indicator, URL query parameter persistence, and filter combination behavior. Tests should cover user interactions, visual feedback, and shareable URLs.

## Implementation Plan
### Phase 1: Foundation
Before implementing the main feature, we need to set up the foundation by understanding the existing codebase structure and patterns. Read the relevant documentation files listed in the conditional_docs section, specifically the Next.js application docs, dashboard implementation, and mock API service docs. Review the existing SearchBar and DepartmentFilter components to understand their props and state management patterns. Examine how the dashboard currently handles filtering logic and identify where to add debouncing and URL synchronization. Install any necessary dependencies like `use-debounce` for React hooks-based debouncing if not already available.

### Phase 2: Core Implementation
Implement the clear button in the SearchBar component with conditional rendering (only shows when search has text), styled with an X icon that's accessible and properly positioned. Add debouncing to the dashboard search input using a React hook (useDebounce or useDebouncedValue) with a 300ms delay to prevent excessive re-filtering. Create the ActiveFilters component that displays chips for active search query and selected department, with individual remove buttons and a "Clear all filters" option. Integrate the component into the dashboard page below the search/filter bar. Implement URL query parameter synchronization using Next.js useSearchParams and useRouter to read and write search and department parameters, ensuring the dashboard initializes with URL values on page load.

### Phase 3: Integration
Connect all the pieces together by updating the dashboard page to read URL parameters on mount and set initial filter state, sync filter changes to URL without causing unnecessary re-renders or API calls. Ensure the debounced search works correctly with the active filters indicator, updating the chip when the debounced value changes. Test that clearing filters (via clear button, removing chips, or "Clear all") properly updates both state and URL. Verify that the user count display updates correctly as filters are applied and removed. Ensure backward compatibility with existing functionality - all current features should work exactly as before.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Review existing codebase and documentation
- Read `app_docs/feature-4c8ea440-dashboard-user-profiles.md` to understand current dashboard implementation
- Read `app_docs/feature-287fdce1-mock-backend-api.md` to understand API patterns and delay simulation
- Read `app_docs/feature-216fce1d-user-card-component.md` to understand component patterns
- Read `.claude/commands/e2e/test_dashboard_user_cards.md` to understand existing test structure
- Review the current SearchBar component implementation to understand props and styling patterns
- Review the current DepartmentFilter component implementation
- Review how the dashboard page currently manages filter state and applies filtering logic

### 2. Install dependencies for debouncing
- Check if `use-debounce` or similar debouncing library is already installed in `app/nextjs/package.json`
- If not installed, run `cd app/nextjs && npm install use-debounce --save`
- Verify installation succeeded

### 3. Enhance SearchBar component with clear button
- Open `app/nextjs/components/SearchBar.tsx`
- Add conditional rendering for a clear button (X icon) that only appears when `value.length > 0`
- Position the clear button absolutely on the right side of the input, before the padding ends
- Style the button with gray color that darkens on hover, ensuring it's accessible
- Add an onClick handler that calls `onChange('')` to clear the search
- Include proper ARIA attributes for accessibility (aria-label="Clear search")
- Test that the button appears/disappears correctly as user types

### 4. Create ActiveFilters component
- Create new file `app/nextjs/components/ActiveFilters.tsx`
- Define props interface: `searchQuery: string`, `selectedDepartment: string`, `onClearSearch: () => void`, `onClearDepartment: () => void`, `onClearAll: () => void`
- Implement component that only renders when filters are active (`searchQuery.trim() || selectedDepartment !== 'All Departments'`)
- Display "Active Filters:" heading with count of active filters
- Render chips for search query (if present) and department (if not "All Departments")
- Each chip should have the filter label and an X button to remove it
- Add a "Clear all filters" link/button that calls `onClearAll`
- Style chips with rounded backgrounds, proper spacing, and hover effects matching the app design
- Ensure component is responsive and works on mobile screens

### 5. Add debouncing to dashboard search
- Open `app/nextjs/app/dashboard/page.tsx`
- Import `useDebounce` from 'use-debounce' library
- Create a new state variable `searchInput` for the immediate input value
- Apply `useDebounce` to `searchInput` with 300ms delay to create `debouncedSearchQuery`
- Update the filter effect to use `debouncedSearchQuery` instead of `searchQuery`
- Pass `searchInput` and `setSearchInput` to the SearchBar component instead of `searchQuery`
- Ensure the debounced value is used in the filtering logic but the input responds immediately

### 6. Add URL query parameter synchronization
- Import `useSearchParams` and `useRouter` from 'next/navigation'
- Read URL parameters on component mount and set initial filter state (search, department)
- Create a function `updateURLParams` that takes filter values and updates the URL using router.push with query parameters
- Call `updateURLParams` whenever debouncedSearchQuery or selectedDepartment changes (in useEffect)
- Use `router.replace` instead of `router.push` to avoid adding to browser history for every filter change
- Handle edge cases: empty search should remove the query param, "All Departments" should remove department param

### 7. Integrate ActiveFilters component into dashboard
- Import the new ActiveFilters component in `app/nextjs/app/dashboard/page.tsx`
- Add handlers for clearing individual filters: `handleClearSearch`, `handleClearDepartment`, `handleClearAll`
- Place the ActiveFilters component after the search/filter bar but before the results count
- Pass appropriate props: debouncedSearchQuery (for display), selectedDepartment, and clear handlers
- Add proper spacing (margin-bottom) to separate it from search bar and results

### 8. Create E2E test specification
- Create new file `.claude/commands/e2e/test_dashboard_search_filter.md`
- Follow the format from `test_dashboard_user_cards.md` as a template
- Include test metadata: test name, ID, application URL, purpose
- Write a clear user story for the search and filter enhancement features
- Document prerequisites (Next.js app running, authentication, mock data)
- Define comprehensive test steps covering:
  1. TypeScript compilation check
  2. Start development server
  3. Login to dashboard
  4. Verify search bar has clear button when text is entered
  5. Test clear button removes search text and resets results
  6. Verify search is debounced (type quickly, verify filtering happens after delay)
  7. Apply department filter and verify active filters indicator appears
  8. Verify active filters shows search query chip and department chip
  9. Test removing individual filters via chips
  10. Test "Clear all filters" button
  11. Verify URL parameters update when filters change
  12. Test sharing URL - copy URL with filters, open in new tab, verify filters are applied
  13. Test combining search and department filter (AND logic)
  14. Verify results count updates correctly
  15. Test responsive behavior on mobile
- Include screenshot instructions for each major step
- Define success criteria and expected behaviors

### 9. Run validation commands
- Execute TypeScript compilation: `cd app/nextjs && npx tsc --noEmit`
- Run ESLint: `cd app/nextjs && npm run lint`
- Run production build: `cd app/nextjs && npm run build`
- All commands must complete without errors

### 10. Execute E2E test
- Read `.claude/commands/test_e2e.md` to understand E2E test execution process
- Execute the new E2E test: `.claude/commands/e2e/test_dashboard_search_filter.md`
- Verify all test steps pass and screenshots are captured
- If any test fails, fix the issue and re-run until all tests pass
- Ensure test output is saved to the correct directory structure

## Testing Strategy
### Unit Tests
Since this is a Next.js application without a formal unit test framework configured, we'll rely on TypeScript type checking and ESLint for static validation. However, the following logic should be manually verified during development:

- SearchBar clear button: Verify it only renders when `value.length > 0`, clicking it calls `onChange('')`, and the icon is properly styled
- ActiveFilters component: Verify it only renders when filters are active, displays correct filter count, shows appropriate chips, and all clear handlers work correctly
- Debouncing logic: Verify the search input updates immediately in the UI but the actual filtering happens after 300ms delay
- URL synchronization: Verify reading URL params on mount sets correct initial state, changes to filters update URL without causing infinite loops, and empty/default values are removed from URL

### Edge Cases
- Empty search query: Clear button should not appear, active filters should not show search chip, URL should not have search parameter
- "All Departments" selected: Active filters should not show department chip, URL should not have department parameter
- Rapid typing in search: Debouncing should prevent multiple filter operations, only the final debounced value should trigger filtering
- Direct URL navigation: Opening a URL like `/dashboard?search=john&department=Engineering` should apply both filters immediately on page load
- Special characters in search: URL encoding should handle spaces, quotes, and special characters correctly
- No results: Active filters should still be visible with correct chips, allowing users to clear filters to see results again
- Browser back/forward: Using browser navigation should update filters based on URL parameters
- Long search queries: Active filter chip should truncate long text with ellipsis and show full text on hover
- Invalid department in URL: If URL has department not in the list, should default to "All Departments"
- Concurrent filter changes: Changing search and department simultaneously should update URL with both parameters correctly

## Acceptance Criteria
- Search bar displays a clear button (X icon) on the right side when search text is present
- Clicking the clear button instantly removes all search text and resets filtered results
- Search input responds immediately to typing but filtering is debounced with 300ms delay
- Active filters indicator appears below search/filter bar when any filter is active
- Active filters displays chips for search query and selected department (excluding defaults)
- Each filter chip has an X button that removes that specific filter when clicked
- "Clear all filters" button/link removes all filters and updates URL accordingly
- Results count display shows "Showing X of Y users" and updates as filters change
- URL query parameters update when filters change: `?search=query&department=dept`
- Opening dashboard with URL parameters applies those filters automatically on page load
- Sharing a filtered dashboard URL preserves the filters when opened by others
- Search and department filters work together with AND logic (both must match)
- Performance is smooth and responsive even with rapid typing or filter changes
- All existing dashboard functionality continues to work without regression
- TypeScript compilation, ESLint, and production build all complete without errors
- E2E test suite validates all new functionality and captures verification screenshots

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_dashboard_search_filter.md` to validate this functionality works.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation to validate no type errors
- `cd app/nextjs && npm run lint` - Run ESLint to validate code quality and catch potential issues
- `cd app/nextjs && npm run build` - Run production build to validate the app builds successfully with all optimizations

## Notes
- This feature builds on top of the existing dashboard implementation from feature 4c8ea440, which already has basic search and filter functionality. We're enhancing it with debouncing, clear buttons, active filters indicator, and URL persistence.

- The debouncing implementation uses the `use-debounce` library which is a lightweight, well-maintained React hook specifically designed for this purpose. The 300ms delay is a sweet spot that feels responsive while preventing excessive filtering operations.

- URL query parameter synchronization uses Next.js App Router's `useSearchParams` and `useRouter` hooks, which are the recommended approach for client-side routing in Next.js 14+. We use `router.replace` instead of `router.push` to avoid filling browser history with every filter change.

- The active filters indicator is inspired by modern web applications like GitHub's issue filters and Google's advanced search. It provides clear visual feedback about what filters are active and makes it easy to remove them.

- The clear button in the search bar uses an X icon (times/close icon) positioned absolutely within the input container. This is a common UX pattern that users expect from modern search interfaces.

- Performance considerations: Debouncing prevents excessive filtering operations, which is especially important if the dataset grows beyond 25 users or if we eventually connect to a real backend API. Client-side filtering remains fast for small datasets but the debouncing pattern ensures scalability.

- The feature is designed to be non-breaking: all existing functionality continues to work exactly as before. The new features are additive enhancements that improve the user experience without changing the core behavior.

- Future enhancements could include: saving filter preferences to localStorage, adding more filter options (role, status, location), implementing filter presets, adding keyboard shortcuts (Cmd+K to focus search, Escape to clear filters), and showing filter suggestions as user types.

- The URL parameter feature makes the dashboard more shareable: users can now copy a URL with specific filters and share it with colleagues. This is particularly useful for use cases like "Show me all engineers" or "Find everyone in the Marketing department."
