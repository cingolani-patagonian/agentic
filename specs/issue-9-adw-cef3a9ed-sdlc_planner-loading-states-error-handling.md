# Feature: Comprehensive Loading States and Error Handling

## Metadata
issue_number: `9`
adw_id: `cef3a9ed`
issue_json: `{"number":9,"title":"Implement comprehensive loading states and error handling","body":"# Issue #9: Loading States and Error Handling\n\n**Title:** Implement comprehensive loading states and error handling\n\n**Labels:** feature, ux\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nAdd proper loading states, error handling, and user feedback throughout the application.\n\n## Requirements\n\n- Loading spinner component\n- Skeleton loaders for cards while fetching data\n- Error boundary component for catching React errors\n- Toast notifications for user feedback:\n  - Success messages\n  - Error messages\n  - Info messages\n- Retry functionality for failed API calls\n- Graceful degradation when features fail\n- Offline detection and message\n- 404 page for invalid routes\n\n## Acceptance Criteria\n\n- Loading states are shown during async operations\n- Errors are caught and displayed user-friendly\n- Users receive feedback for their actions\n- Failed operations can be retried\n- 404 page displays for invalid routes"}`

## Feature Description
This feature adds comprehensive loading states, error handling, and user feedback mechanisms throughout the Next.js application. The implementation includes skeleton loaders for smooth content loading transitions, a React Error Boundary component to catch and handle unexpected errors gracefully, toast notifications for user action feedback (success, error, info messages), retry functionality for failed API calls, offline detection to inform users when network connectivity is lost, and a custom 404 page for invalid routes. These enhancements will significantly improve the user experience by providing clear visual feedback during async operations, preventing error crashes, and ensuring users always understand the current state of the application.

## User Story
As a user of the application
I want to see clear loading indicators, receive helpful error messages, and get feedback on my actions
So that I understand what's happening in the application, can recover from errors gracefully, and have confidence that my actions are being processed

## Problem Statement
The current Next.js application has basic loading states (LoadingSpinner and ErrorState components) but lacks comprehensive error handling and user feedback mechanisms. There are no skeleton loaders for smooth loading transitions, no global error boundary to catch unexpected React errors, no toast notification system for action feedback, no retry mechanisms for failed operations, no offline detection, and no custom 404 page. When API calls fail or unexpected errors occur, users may see blank screens or cryptic error messages. The application doesn't provide adequate feedback during async operations, making it difficult for users to understand the current state of the application or recover from errors.

## Solution Statement
Implement a comprehensive loading and error handling system by:
1. Creating skeleton loader components for user cards to provide smooth loading transitions
2. Implementing a React Error Boundary component to catch rendering errors and display user-friendly fallback UI
3. Building a toast notification system with ToastProvider context and Toast component for success, error, and info messages
4. Adding retry functionality to the API layer for automatic retry of failed requests with exponential backoff
5. Creating a custom useOnlineStatus hook to detect network connectivity changes
6. Building an offline banner component that displays when the user loses network connection
7. Creating a custom 404 page (not-found.tsx) with helpful navigation options
8. Enhancing existing error handling in dashboard and login pages to use toast notifications
9. Integrating skeleton loaders into the dashboard page during initial data loading
10. Adding error boundaries at strategic points in the component tree (layout, pages)
11. Ensuring all user actions (login, logout, data fetch) provide appropriate feedback via toasts
12. Implementing graceful degradation patterns where features can fail without breaking the entire app

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/components/LoadingSpinner.tsx` - Existing loading spinner component, will be enhanced with additional size options
- `app/nextjs/components/ErrorState.tsx` - Existing error state component, will be used as reference for error display patterns
- `app/nextjs/components/EmptyState.tsx` - Existing empty state component, provides pattern for user feedback
- `app/nextjs/app/dashboard/page.tsx` - Dashboard page that fetches user data, will integrate skeleton loaders and toast notifications
- `app/nextjs/app/login/page.tsx` - Login page that handles authentication, will integrate toast notifications for feedback
- `app/nextjs/lib/api.ts` - API service layer, will be enhanced with retry logic and better error handling
- `app/nextjs/contexts/AuthContext.tsx` - Auth context, will integrate toast notifications for auth feedback
- `app/nextjs/types/index.ts` - Type definitions, will include types for toast notifications and error boundaries
- `app/nextjs/app/layout.tsx` - Root layout, will integrate ToastProvider and ErrorBoundary
- `app/nextjs/app/globals.css` - Global CSS for toast animations and transitions
- `app/nextjs/tailwind.config.ts` - Tailwind config for toast styling utilities
- `.claude/commands/test_e2e.md` - E2E test runner documentation
- `.claude/commands/e2e/test_auth_login.md` - Example E2E test structure for authentication flows
- `.claude/commands/e2e/test_dashboard_user_cards.md` - Example E2E test for dashboard functionality

### New Files

- `app/nextjs/components/SkeletonLoader.tsx` - Skeleton loader component for smooth loading transitions (card and text variants)
- `app/nextjs/components/Toast.tsx` - Toast notification component with support for success, error, info, and warning types
- `app/nextjs/components/ToastContainer.tsx` - Container component that manages toast display and positioning
- `app/nextjs/components/ErrorBoundary.tsx` - React Error Boundary component to catch rendering errors
- `app/nextjs/components/OfflineBanner.tsx` - Banner component that displays when user goes offline
- `app/nextjs/contexts/ToastContext.tsx` - Toast context provider for global toast management
- `app/nextjs/hooks/useToast.tsx` - Custom hook to access toast functionality from any component
- `app/nextjs/hooks/useOnlineStatus.tsx` - Custom hook to detect network connectivity status
- `app/nextjs/app/not-found.tsx` - Custom 404 page for invalid routes
- `app/nextjs/lib/errorHandling.ts` - Utility functions for error handling and logging
- `app/nextjs/lib/retryLogic.ts` - Retry logic with exponential backoff for API calls
- `.claude/commands/e2e/test_loading_error_handling.md` - E2E test file to validate loading states and error handling functionality

## Implementation Plan

### Phase 1: Foundation
1. Create type definitions for toast notifications, error boundaries, and retry configurations
2. Build utility functions for error handling and retry logic
3. Set up custom hooks for toast management and online status detection
4. Create base skeleton loader and toast components
5. Add CSS animations for smooth toast transitions

### Phase 2: Core Implementation
1. Implement ToastContext and ToastProvider for global toast management
2. Build Toast and ToastContainer components with support for multiple notification types
3. Create ErrorBoundary component with fallback UI
4. Implement OfflineBanner component with useOnlineStatus hook
5. Create SkeletonLoader component with multiple variants (card, text, avatar)
6. Build custom 404 page with helpful navigation
7. Enhance API service with retry logic and better error handling

### Phase 3: Integration
1. Integrate ToastProvider into root layout
2. Add ErrorBoundary at layout and page levels
3. Integrate OfflineBanner into root layout
4. Update dashboard page to use skeleton loaders during data fetch
5. Update login page to show toast notifications for success/error
6. Update AuthContext to use toast notifications
7. Update API service to use retry logic
8. Test all loading states and error scenarios end-to-end
9. Verify graceful degradation patterns work correctly

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Define TypeScript types for toast and error handling
- Update `app/nextjs/types/index.ts`
- Add ToastType enum with values: 'success', 'error', 'info', 'warning'
- Add Toast interface with id, type, message, duration properties
- Add ToastContextType interface with addToast, removeToast, toasts methods
- Add ErrorBoundaryState interface with hasError and error properties
- Add RetryConfig interface with maxRetries, delay, backoffMultiplier properties
- Add OnlineStatus type for network connectivity state
- Export all new types for use across the application

### 2. Create error handling utilities
- Create `app/nextjs/lib/errorHandling.ts`
- Implement formatErrorMessage function to convert errors to user-friendly messages
- Implement logError function for error logging (console in development, could integrate analytics later)
- Implement isNetworkError function to detect network-related errors
- Implement getErrorType function to categorize errors (network, auth, validation, unknown)
- Add utility to extract error message from various error formats (Error, string, unknown)
- Export all utility functions

### 3. Create retry logic utilities
- Create `app/nextjs/lib/retryLogic.ts`
- Implement withRetry function that wraps async functions with retry logic
- Use exponential backoff algorithm (delay * Math.pow(backoffMultiplier, attempt))
- Default config: maxRetries=3, delay=1000ms, backoffMultiplier=2
- Only retry on network errors, not on validation or auth errors
- Add timeout mechanism to prevent infinite retries
- Return typed response with success/error state
- Export withRetry function and RetryConfig type

### 4. Create useOnlineStatus hook
- Create `app/nextjs/hooks/useOnlineStatus.tsx`
- Use useState to track online/offline state
- Use useEffect to add window 'online' and 'offline' event listeners
- Initialize state with navigator.onLine
- Clean up event listeners on unmount
- Return online status boolean
- Add TypeScript types for the hook

### 5. Create Toast component
- Create `app/nextjs/components/Toast.tsx`
- Accept id, type, message, onClose, duration props
- Implement auto-dismiss after duration (default 5000ms)
- Use different colors for each type (success: green, error: red, info: blue, warning: yellow)
- Add icon for each type (✓ for success, ✗ for error, ℹ for info, ⚠ for warning)
- Include close button (X) for manual dismissal
- Use Tailwind CSS for styling with rounded corners, shadow, padding
- Add slide-in animation from right side
- Add fade-out animation on dismiss
- Include progress bar that depletes over duration
- Add ARIA live region for accessibility (role="alert")
- Export Toast component

### 6. Create ToastContainer component
- Create `app/nextjs/components/ToastContainer.tsx`
- Accept toasts array as prop
- Position container fixed at top-right of viewport (top-4 right-4)
- Stack toasts vertically with spacing (space-y-2)
- Set z-index high (z-50) to appear above other content
- Map over toasts array and render Toast component for each
- Add fade-in animation for new toasts
- Use Tailwind CSS for responsive positioning
- Export ToastContainer component

### 7. Create ToastContext and provider
- Create `app/nextjs/contexts/ToastContext.tsx`
- Use createContext to create ToastContext
- Implement ToastProvider component with toast state management
- Use useState to manage toasts array
- Implement addToast function that generates unique ID and adds toast
- Implement removeToast function that filters out toast by ID
- Auto-generate unique IDs using crypto.randomUUID() or timestamp + random
- Pass addToast, removeToast, toasts in context value
- Include ToastContainer in provider render
- Export ToastContext and ToastProvider

### 8. Create useToast hook
- Create `app/nextjs/hooks/useToast.tsx`
- Use useContext to access ToastContext
- Throw error if used outside ToastProvider
- Create convenience methods: showSuccess, showError, showInfo, showWarning
- Each convenience method calls addToast with appropriate type
- Return object with showSuccess, showError, showInfo, showWarning, addToast, removeToast
- Add TypeScript types for the hook return value
- Export useToast hook

### 9. Create SkeletonLoader component
- Create `app/nextjs/components/SkeletonLoader.tsx`
- Accept variant prop: 'card', 'text', 'avatar', 'line'
- Accept count prop for multiple skeleton items (default 1)
- Implement card variant: full user card skeleton with avatar, title, subtitle sections
- Implement text variant: text line skeleton with varying widths
- Implement avatar variant: circular skeleton for avatar images
- Implement line variant: simple rectangular skeleton
- Use animate-pulse class for pulsing animation
- Use bg-gray-200 and bg-gray-300 for skeleton colors
- Match dimensions and layout of actual content being loaded
- Add proper spacing and border radius
- Export SkeletonLoader component with SkeletonLoaderProps interface

### 10. Create ErrorBoundary component
- Create `app/nextjs/components/ErrorBoundary.tsx`
- Implement React Error Boundary using class component (required for error boundaries)
- Use getDerivedStateFromError to update state when error is caught
- Implement componentDidCatch for error logging
- Add fallback UI with error message, icon, and reset button
- Include resetErrorBoundary method to reset error state
- Accept fallback prop for custom fallback UI (optional)
- Accept onError callback prop for custom error handling (optional)
- Style fallback UI with centered layout, error icon, descriptive text
- Include "Go to Dashboard" and "Try Again" buttons
- Use ErrorState component pattern for consistent styling
- Export ErrorBoundary component

### 11. Create OfflineBanner component
- Create `app/nextjs/components/OfflineBanner.tsx`
- Use useOnlineStatus hook to detect connectivity
- Render banner only when offline
- Position banner fixed at top of viewport (top-0)
- Use bg-red-600 with white text for visibility
- Display "You are currently offline" message with icon
- Add z-index (z-50) to appear above other content
- Add slide-down animation when appearing
- Add ARIA live region for accessibility
- Export OfflineBanner component

### 12. Create custom 404 page
- Create `app/nextjs/app/not-found.tsx`
- Display "404 - Page Not Found" heading with large text
- Include descriptive message: "The page you're looking for doesn't exist"
- Add 404 emoji or illustration (🔍 or 📄)
- Include navigation buttons: "Go to Dashboard", "Go to Home"
- Use Next.js Link component for navigation
- Style with centered layout, similar to EmptyState pattern
- Add proper TypeScript types
- Export as default Next.js page component

### 13. Enhance API service with retry logic
- Update `app/nextjs/lib/api.ts`
- Import withRetry from retryLogic utility
- Wrap getAllUsers function with retry logic
- Wrap getUserById function with retry logic
- Wrap searchUsers function with retry logic
- Wrap getUsersByDepartment function with retry logic
- Configure retry only for network errors (not 404 or validation)
- Keep simulateDelay but ensure retry doesn't compound delays excessively
- Update error responses to include more detailed error info
- Add timeout handling for long-running requests
- Test retry logic with simulated network failures

### 14. Integrate ToastProvider into root layout
- Update `app/nextjs/app/layout.tsx`
- Import ToastProvider from contexts
- Wrap existing content with ToastProvider
- Ensure ToastProvider is inside AuthProvider
- Verify ToastContainer renders at correct z-index
- Test toast notifications appear correctly across all pages

### 15. Add ErrorBoundary to root layout
- Update `app/nextjs/app/layout.tsx`
- Import ErrorBoundary component
- Wrap main content with ErrorBoundary
- Add custom error handler that logs to console
- Ensure ErrorBoundary is inside ToastProvider and AuthProvider
- Test error boundary catches rendering errors

### 16. Add OfflineBanner to root layout
- Update `app/nextjs/app/layout.tsx`
- Import OfflineBanner component
- Add OfflineBanner at the top of the body, before Navigation
- Ensure banner appears above all other content when offline
- Test banner shows/hides when toggling network connectivity

### 17. Update AuthContext to use toast notifications
- Update `app/nextjs/contexts/AuthContext.tsx`
- Import useToast hook (from within ToastProvider context)
- Show success toast on successful login: "Welcome back, {username}!"
- Show error toast on login failure with error message
- Show info toast on logout: "You have been logged out"
- Handle errors gracefully in login/logout functions
- Update error messages to be user-friendly
- Test toasts appear for all auth actions

### 18. Update login page with toast notifications
- Update `app/nextjs/app/login/page.tsx`
- Import useToast hook
- Show error toast for empty credentials
- Show error toast for invalid credentials
- Show success toast on successful login (handled by AuthContext)
- Remove inline error messages in favor of toast notifications
- Keep form validation for immediate feedback
- Ensure error handling is comprehensive
- Test all error scenarios display appropriate toasts

### 19. Update dashboard with skeleton loaders
- Update `app/nextjs/app/dashboard/page.tsx`
- Import SkeletonLoader component
- Replace LoadingSpinner with SkeletonLoader during initial load
- Show grid of skeleton cards (matching user card layout) while loading
- Use 'card' variant for user card skeletons
- Show appropriate number of skeletons (8-12 cards)
- Ensure skeleton layout matches actual user card grid
- Keep LoadingSpinner for auth check loading
- Test loading state with skeleton loaders

### 20. Update dashboard with toast notifications
- Update `app/nextjs/app/dashboard/page.tsx`
- Import useToast hook
- Show error toast when user fetch fails instead of inline error
- Show info toast when search returns no results (optional)
- Keep ErrorState component for critical errors
- Add retry button that shows success toast on successful retry
- Test all error scenarios with toast notifications

### 21. Add CSS animations for toasts
- Update `app/nextjs/app/globals.css`
- Add keyframes for toast slide-in animation from right
- Add keyframes for toast slide-out animation to right
- Add keyframes for progress bar animation
- Add transition classes for smooth animations
- Ensure animations respect prefers-reduced-motion
- Test animations are smooth and performant

### 22. Update Tailwind config for toast utilities
- Update `app/nextjs/tailwind.config.ts`
- Add custom colors for toast types if needed (success, error, info, warning)
- Add custom animation timings for toast transitions
- Add custom z-index values for toast layering
- Ensure all toast utilities are available
- Test configuration changes work correctly

### 23. Create E2E test file for loading and error handling
- Create `.claude/commands/e2e/test_loading_error_handling.md`
- Read `.claude/commands/test_e2e.md` to understand E2E test format
- Read `.claude/commands/e2e/test_auth_login.md` for reference structure
- Define test steps for loading spinner visibility
- Include steps to test skeleton loaders during dashboard load
- Include steps to test toast notifications for success/error/info messages
- Include steps to test error boundary catches rendering errors
- Include steps to test offline banner appears when network is disconnected
- Include steps to test 404 page for invalid routes
- Include steps to test retry functionality on failed API calls
- Define success criteria and failure scenarios
- Specify screenshots to capture at each step (loading states, toasts, error boundary, offline banner, 404 page)
- Include test for simulated network failure and recovery
- Include test for toast auto-dismiss and manual dismiss

### 24. Test skeleton loaders comprehensively
- Test skeleton loaders appear during dashboard data fetch
- Verify skeleton layout matches actual user card grid
- Test skeleton count is appropriate (8-12 cards)
- Verify skeleton animation is smooth
- Test transition from skeleton to actual content
- Verify no layout shift when content loads
- Test skeleton loaders on different screen sizes

### 25. Test toast notifications comprehensively
- Test success toast on successful login
- Test error toast on failed login
- Test info toast on logout
- Test warning toast (if implemented for any scenario)
- Test multiple toasts stack correctly
- Test toast auto-dismiss after duration
- Test toast manual dismiss with close button
- Test toast accessibility (screen reader announcements)
- Test toast animations (slide-in, fade-out)
- Verify toasts don't overlap or obscure important UI
- Test toast positioning at different viewport sizes

### 26. Test error boundary comprehensively
- Trigger rendering error to test error boundary
- Verify error boundary catches error and shows fallback UI
- Test "Try Again" button resets error boundary
- Test "Go to Dashboard" button navigates correctly
- Verify error is logged to console
- Test error boundary doesn't break other parts of the app
- Test nested error boundaries (if multiple levels)
- Verify graceful degradation when errors occur

### 27. Test offline detection comprehensively
- Simulate going offline (browser dev tools or network toggle)
- Verify offline banner appears at top of viewport
- Test banner message is clear and visible
- Verify banner has appropriate color (red) and icon
- Simulate going back online
- Verify offline banner disappears smoothly
- Test offline state persists across page navigation
- Test offline banner doesn't interfere with other UI elements

### 28. Test 404 page comprehensively
- Navigate to invalid route (e.g., /invalid-page)
- Verify custom 404 page displays
- Test 404 message is clear and helpful
- Verify "Go to Dashboard" button works
- Verify "Go to Home" button works
- Test 404 page styling matches application theme
- Test 404 page is responsive on all screen sizes

### 29. Test retry logic comprehensively
- Simulate API failure (network error)
- Verify retry logic attempts request again
- Test exponential backoff delays increase appropriately
- Verify toast notification shows retry status (optional)
- Test successful retry recovers from error
- Test max retries limit prevents infinite loops
- Verify non-retryable errors (404, validation) don't retry
- Test timeout prevents indefinite waiting

### 30. Test graceful degradation
- Test dashboard still functions when API is slow
- Verify error states don't crash the entire app
- Test partial failures (some data loads, some fails)
- Verify user can still navigate when features fail
- Test logout works even if API calls fail
- Verify critical functions remain accessible during errors
- Test application recovers from errors gracefully

### 31. Run validation commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any TypeScript errors that arise
- Fix any linting errors
- Ensure build succeeds
- Fix any E2E test failures
- Verify all existing functionality still works

## Testing Strategy

### Unit Tests
- Test formatErrorMessage handles various error types correctly
- Test isNetworkError identifies network errors accurately
- Test withRetry retries correct number of times with proper delays
- Test useOnlineStatus hook updates on network changes
- Test useToast hook methods create toasts with correct properties
- Test Toast component auto-dismisses after duration
- Test ToastContainer renders multiple toasts correctly
- Test ErrorBoundary catches errors and displays fallback
- Test OfflineBanner shows/hides based on online status
- Test SkeletonLoader renders correct variant

### Edge Cases
- Very long error messages that might overflow toast
- Multiple rapid toast notifications (should stack without overlap)
- Toast notifications while offline (should queue and show when online)
- Error boundary triggered during navigation
- Network going offline during API call
- Network going online during retry attempts
- Multiple simultaneous API failures
- Very slow API responses (should show loading, not timeout immediately)
- Error boundary error during error state (nested errors)
- Toast notification dismissed before auto-dismiss timer completes
- Skeleton loaders with varying content lengths
- 404 page accessed while offline
- Retry logic with intermittent network issues
- Error messages with HTML or special characters
- Toast notifications on mobile devices (small viewport)
- Multiple error boundaries at different nesting levels
- User closing browser tab during async operation
- Page refresh during toast notification display
- API returning malformed error responses
- Extremely fast network responses (skeleton barely visible)

## Acceptance Criteria
- LoadingSpinner component renders during auth checks and long operations
- SkeletonLoader component displays during dashboard data fetch with appropriate layout
- ErrorBoundary component catches rendering errors and displays fallback UI
- ErrorBoundary "Try Again" button successfully resets error state
- ErrorBoundary "Go to Dashboard" button navigates to dashboard
- Toast notifications appear for user actions (login, logout, errors)
- Success toasts are green with checkmark icon
- Error toasts are red with X icon
- Info toasts are blue with info icon
- Warning toasts are yellow with warning icon (if implemented)
- Toasts auto-dismiss after 5 seconds by default
- Toasts can be manually dismissed with close button
- Multiple toasts stack vertically without overlapping
- Toast animations are smooth (slide-in, fade-out)
- Toast notifications are accessible (ARIA live regions)
- OfflineBanner appears when network connection is lost
- OfflineBanner disappears when network connection is restored
- OfflineBanner is clearly visible with red background and white text
- Custom 404 page displays for invalid routes
- 404 page has clear message and navigation options
- 404 page buttons navigate to correct pages
- API retry logic attempts failed requests 3 times with exponential backoff
- Retry logic only retries network errors, not validation or auth errors
- Retry logic respects timeout limits
- Error messages are user-friendly and descriptive
- All loading states provide clear visual feedback
- All error states allow user to retry or navigate away
- Dashboard shows skeleton loaders during initial data fetch
- Dashboard transitions smoothly from skeleton to actual content
- Login page shows toast notifications for success and errors
- AuthContext shows toast notifications for auth actions
- No console errors during normal operation
- Application recovers gracefully from errors
- Critical functionality remains accessible during errors
- TypeScript compilation succeeds with no errors
- ESLint passes with no errors
- Production build succeeds
- All E2E tests pass
- All existing functionality continues to work without regressions

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- Read `.claude/commands/test_e2e.md`, then read and execute the new E2E test file `.claude/commands/e2e/test_loading_error_handling.md` to validate loading states and error handling functionality works end-to-end
- `cd app/nextjs && npx tsc --noEmit` - Validate TypeScript compilation with no errors
- `cd app/nextjs && npm run lint` - Validate ESLint passes with no errors
- `cd app/nextjs && npm run build` - Validate production build succeeds

## Notes
- This feature significantly improves user experience by providing clear feedback during all application states (loading, success, error)
- The toast notification system is implemented as a global context to allow any component to trigger notifications
- Error boundaries use React class components as required by React's error boundary API
- Retry logic uses exponential backoff to avoid overwhelming the server during outages
- Skeleton loaders provide better UX than spinners by showing content structure during loading
- Offline detection uses browser native APIs (navigator.onLine and window events)
- The 404 page follows Next.js conventions (not-found.tsx) for automatic routing
- Toast notifications include accessibility features (ARIA live regions) for screen readers
- All animations respect user preferences (prefers-reduced-motion)
- Error handling utilities are designed to be extensible for future analytics integration
- The implementation follows existing patterns in the codebase (ErrorState, LoadingSpinner)
- Toast auto-dismiss timer can be configured per toast for different use cases
- Error boundary fallback UI matches the application's design system
- Skeleton loaders are designed to match actual content dimensions to prevent layout shift
- The retry logic is smart about which errors to retry (network) vs which to fail immediately (validation)
- Future enhancements could include:
  - Analytics integration for error tracking
  - Sentry or similar service for error reporting
  - Toast notification queue with priority system
  - Customizable toast positions (top-right, top-left, bottom-right, etc.)
  - Toast notification history/log
  - Loading progress indicators for long operations
  - Optimistic UI updates with rollback on failure
  - Service worker for true offline functionality
  - Push notifications for background operations
  - Network speed detection and adaptive loading strategies
  - Error recovery suggestions based on error type
  - Undo functionality for certain actions
  - Multiple error boundary levels with different fallback strategies
  - Loading skeleton customization based on content type
  - Toast notification theming to match dark/light mode (future)
