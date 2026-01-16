# E2E Test: Loading States and Error Handling

## Test Metadata
- Test Name: Loading States and Error Handling
- Test ID: test_loading_error_handling
- Application URL: http://localhost:3000
- Purpose: Validate that the application properly displays loading states, handles errors gracefully, shows toast notifications, detects offline status, and displays custom error pages

## User Story
As a user, I want to see clear loading indicators during data fetching, receive helpful error messages when things go wrong, get feedback for my actions through notifications, and have the application handle errors gracefully so that I understand the current state of the application and can recover from errors.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Loading states, error handling, and toast notification system implemented

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
cd app/nextjs && npm run dev > /tmp/nextjs-loading-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Test Skeleton Loaders on Dashboard
**Action:** Log in and navigate to dashboard, observe initial loading
**Verify:**
- Skeleton loader cards appear before actual user data loads
- Skeleton loaders have appropriate layout matching user cards
- Skeleton loaders use pulse animation
- Multiple skeleton cards are displayed (8-12)
**Expected:** Smooth loading transition with skeleton placeholders
**Screenshot:** 01_skeleton_loaders.png

### Step 4: Test Toast Notification on Successful Login
**Action:** Log in with valid credentials (admin/admin123)
**Verify:**
- Success toast appears with message "Welcome back, admin!"
- Toast has green background color
- Toast displays checkmark icon (✓)
- Toast includes close button (×)
- Toast auto-dismisses after 5 seconds
**Expected:** Green success toast shows login feedback
**Screenshot:** 02_login_success_toast.png

### Step 5: Test Toast Notification on Login Error
**Action:** Attempt login with invalid credentials
**Verify:**
- Error toast appears with appropriate error message
- Toast has red background color
- Toast displays X icon (✗)
- Toast includes close button
- Error message is user-friendly
**Expected:** Red error toast shows validation feedback
**Screenshot:** 03_login_error_toast.png

### Step 6: Test Manual Toast Dismissal
**Action:** Trigger a toast and manually click the close button
**Verify:**
- Toast dismisses immediately when close button is clicked
- Toast slides out animation plays
- Toast is removed from the screen
**Expected:** Manual dismissal works correctly
**Screenshot:** 04_toast_manual_dismiss.png

### Step 7: Test Multiple Toast Stacking
**Action:** Trigger multiple validation errors quickly (try submitting empty form multiple times)
**Verify:**
- Multiple toasts stack vertically
- Toasts don't overlap or obscure each other
- Each toast has proper spacing
- All toasts are visible and readable
**Expected:** Multiple toasts display correctly without overlap
**Screenshot:** 05_multiple_toasts.png

### Step 8: Test Toast Auto-Dismiss Timer
**Action:** Trigger a toast and observe it for 5 seconds
**Verify:**
- Progress bar depletes over 5 seconds
- Toast auto-dismisses after duration
- Slide-out animation plays on auto-dismiss
**Expected:** Toast auto-dismisses with proper timing
**Screenshot:** 06_toast_auto_dismiss.png

### Step 9: Test Logout Toast Notification
**Action:** Click logout button
**Verify:**
- Info toast appears with message "You have been logged out"
- Toast has blue background color
- Toast displays info icon (ℹ)
- User is redirected to login page
**Expected:** Blue info toast shows logout feedback
**Screenshot:** 07_logout_info_toast.png

### Step 10: Test Offline Banner Appearance
**Action:** Simulate going offline using browser dev tools (set network to offline)
**Verify:**
- Offline banner appears at top of viewport
- Banner has red background with white text
- Banner displays warning icon (⚠)
- Banner message reads "You are currently offline. Some features may not be available."
- Banner has high z-index (above other content)
**Expected:** Offline banner displays when network is lost
**Screenshot:** 08_offline_banner.png

### Step 11: Test Offline Banner Disappearance
**Action:** Simulate going back online (restore network connection)
**Verify:**
- Offline banner disappears smoothly
- No errors occur when network is restored
- Application continues to function normally
**Expected:** Offline banner hides when network is restored
**Screenshot:** 09_online_restored.png

### Step 12: Test Custom 404 Page
**Action:** Navigate to an invalid route (e.g., /invalid-page-xyz)
**Verify:**
- Custom 404 page displays
- Page shows "404" heading
- Page displays "Page Not Found" message
- Page includes search icon emoji (🔍)
- "Go to Dashboard" button is present
- "Go to Home" button is present
**Expected:** Custom 404 page displays for invalid routes
**Screenshot:** 10_custom_404_page.png

### Step 13: Test 404 Page Navigation
**Action:** Click "Go to Dashboard" button on 404 page
**Verify:**
- Button navigates to /dashboard
- Dashboard loads successfully
- No errors occur during navigation
**Expected:** 404 page navigation works correctly
**Screenshot:** 11_navigate_from_404.png

### Step 14: Test Error State with Retry
**Action:** Log in and navigate to dashboard, then simulate API error (if possible)
**Verify:**
- ErrorState component displays when API fails
- Error message is user-friendly
- Retry button is present
- Error icon or illustration is shown
**Expected:** Error state displays with retry option
**Screenshot:** 12_error_state_with_retry.png

### Step 15: Test Dashboard Retry Functionality
**Action:** Click retry button on error state
**Verify:**
- Skeleton loaders appear during retry
- If retry succeeds, user data loads
- Success toast appears on successful retry
- If retry fails, error state persists
**Expected:** Retry functionality works correctly
**Screenshot:** 13_retry_success.png

### Step 16: Test Loading Spinner on Auth Check
**Action:** Reload the dashboard page and observe authentication check
**Verify:**
- LoadingSpinner appears briefly during auth check
- Spinner displays "Checking authentication..." message
- Spinner is centered and visible
**Expected:** Loading spinner shows during auth verification
**Screenshot:** 14_auth_check_loading.png

### Step 17: Test Error Boundary (Simulated Error)
**Action:** Trigger a React rendering error (if test component available, or use browser console to throw error)
**Verify:**
- ErrorBoundary catches the error
- Fallback UI displays with error icon (⚠)
- Error message "Something went wrong" is shown
- "Try Again" button is present
- "Go to Dashboard" button is present
- In development mode, error details are shown
**Expected:** ErrorBoundary displays fallback UI
**Screenshot:** 15_error_boundary_fallback.png

### Step 18: Test Error Boundary Reset
**Action:** Click "Try Again" button on error boundary fallback
**Verify:**
- Error boundary resets
- Application attempts to re-render
- If error is cleared, normal UI displays
**Expected:** Error boundary reset functionality works
**Screenshot:** 16_error_boundary_reset.png

### Step 19: Test Toast Accessibility
**Action:** Inspect toast notifications with accessibility tools
**Verify:**
- Toasts have role="alert" attribute
- Toasts have aria-live="assertive" attribute
- Close button has aria-label="Close notification"
- Toast content is screen reader accessible
**Expected:** Toasts meet accessibility standards

### Step 20: Test Offline Banner Accessibility
**Action:** Inspect offline banner with accessibility tools
**Verify:**
- Banner has role="alert" attribute
- Banner has aria-live="assertive" attribute
- Banner content is screen reader accessible
**Expected:** Offline banner meets accessibility standards

### Step 21: Test Reduced Motion Preference
**Action:** Enable prefers-reduced-motion in browser settings
**Verify:**
- Toast animations respect reduced motion preference
- Animations are minimal or disabled
- Application remains functional without animations
**Expected:** Animations respect accessibility preferences

### Step 22: Test Toast Position on Mobile
**Action:** Resize browser to mobile viewport (375px width)
**Verify:**
- Toasts remain visible and readable
- Toasts are positioned correctly (top-right)
- Toasts don't overflow viewport
- Multiple toasts stack properly on mobile
**Expected:** Toasts work correctly on mobile devices
**Screenshot:** 17_mobile_toasts.png

### Step 23: Test Skeleton Loader Responsiveness
**Action:** Resize browser to various viewport sizes
**Verify:**
- Skeleton loaders adapt to different screen sizes
- Skeleton grid layout is responsive
- Skeleton cards maintain proper aspect ratio
**Expected:** Skeleton loaders are responsive
**Screenshot:** 18_responsive_skeletons.png

### Step 24: Test Dashboard Error Recovery
**Action:** Trigger an error, then retry successfully
**Verify:**
- Error toast appears on initial failure
- Success toast appears on successful retry
- Dashboard displays user data after retry
- No residual error state remains
**Expected:** Application recovers gracefully from errors
**Screenshot:** 19_error_recovery.png

### Step 25: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings related to loading/error handling
**Expected:** Clean console output

### Step 26: Verify Network Requests
**Action:** Check network requests in browser dev tools
**Verify:**
- Retry logic attempts failed requests multiple times
- API requests include proper error handling
- No unexpected network errors
**Expected:** Network requests handle errors properly

### Step 27: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Skeleton loaders appear during data fetch
- ✅ Skeleton loaders match actual content layout
- ✅ Success toast appears on login with green background and checkmark
- ✅ Error toast appears on validation errors with red background and X icon
- ✅ Info toast appears on logout with blue background and info icon
- ✅ Toasts can be manually dismissed with close button
- ✅ Multiple toasts stack vertically without overlap
- ✅ Toast progress bar depletes correctly
- ✅ Toasts auto-dismiss after duration
- ✅ Offline banner appears when network is lost
- ✅ Offline banner disappears when network is restored
- ✅ Custom 404 page displays for invalid routes
- ✅ 404 page navigation buttons work correctly
- ✅ ErrorState component displays on API failures
- ✅ Retry functionality works correctly
- ✅ LoadingSpinner appears during auth check
- ✅ ErrorBoundary catches rendering errors
- ✅ ErrorBoundary displays fallback UI
- ✅ ErrorBoundary reset functionality works
- ✅ Toasts meet accessibility standards (ARIA attributes)
- ✅ Offline banner meets accessibility standards
- ✅ Animations respect reduced motion preference
- ✅ Toasts work correctly on mobile viewports
- ✅ Skeleton loaders are responsive
- ✅ Application recovers gracefully from errors
- ✅ No console errors during loading/error scenarios
- ✅ Network requests handle errors properly with retry logic

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Skeleton loaders don't appear or have wrong layout
- Toasts don't appear for user actions
- Toast colors or icons are incorrect
- Toasts overlap or obscure content
- Toast auto-dismiss doesn't work
- Manual dismiss doesn't work
- Offline banner doesn't appear when offline
- Offline banner doesn't disappear when online
- Custom 404 page doesn't display
- 404 navigation buttons don't work
- ErrorState component doesn't display on errors
- Retry functionality doesn't work
- LoadingSpinner doesn't appear during auth check
- ErrorBoundary doesn't catch rendering errors
- ErrorBoundary fallback UI doesn't display
- Toasts lack accessibility attributes
- Animations don't respect reduced motion
- Toasts overflow on mobile
- Console contains errors related to loading/error handling
- Application crashes or becomes unusable after errors

## Output Format
```json
{
  "test_name": "Loading States and Error Handling",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/01_skeleton_loaders.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/02_login_success_toast.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/03_login_error_toast.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/04_toast_manual_dismiss.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/05_multiple_toasts.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/06_toast_auto_dismiss.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/07_logout_info_toast.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/08_offline_banner.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/09_online_restored.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/10_custom_404_page.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/11_navigate_from_404.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/12_error_state_with_retry.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/13_retry_success.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/14_auth_check_loading.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/15_error_boundary_fallback.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/16_error_boundary_reset.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/17_mobile_toasts.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/18_responsive_skeletons.png",
    "<absolute_path>/media/e2e/<adw_id>/loading_error_handling/19_error_recovery.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Restore network connection to online
- Clean up any temporary files or processes
