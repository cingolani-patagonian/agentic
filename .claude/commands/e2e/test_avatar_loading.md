# E2E Test: Avatar Loading Validation

## Test Metadata
- Test Name: Avatar Loading Validation
- Test ID: test_avatar_loading
- Application URL: http://localhost:3000
- Purpose: Validate that user avatar images from ui-avatars.com load successfully without 400 Bad Request errors after adding the unoptimized prop to the Image component

## User Story
As a user, I want to see user avatar images displayed in profile cards on the dashboard, so that I can visually identify users by their profile pictures instead of just initials.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- UserCard component has been updated with unoptimized prop on Image component
- Authentication system implemented with mock credentials

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, UserCard component compiles successfully with unoptimized prop

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-avatar-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000 (or 3001 if 3000 is taken)
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 8 seconds for server to fully start and initialize

### Step 3: Navigate to Login Page
**Action:** Open http://localhost:3000/login in Playwright browser
**Verify:** Login page loads successfully
**Expected:** Login form is visible with username and password fields
**Screenshot:** 01_login_page.png

### Step 4: Login with Valid Credentials
**Action:** Enter valid admin credentials (username: "admin", password: "admin123") and submit
**Verify:**
- Form submits successfully
- Page redirects to /dashboard
- No error messages appear
**Expected:** User is logged in and redirected to dashboard
**Wait:** 3 seconds for redirect and page load

### Step 5: Verify Dashboard Loaded
**Action:** Wait for dashboard page to fully load
**Verify:**
- Dashboard page loads at /dashboard
- User cards are visible on the page
**Expected:** Dashboard displays with user profile cards
**Screenshot:** 02_dashboard_loaded.png
**Wait:** 5 seconds for all images to load

### Step 6: Verify Avatar Images Are Visible
**Action:** Check that avatar images are displayed in user cards
**Verify:**
- At least 10 avatar images are visible in the viewport
- Avatar images use the img tag (not just initials in colored circles)
- Images have the rounded-full class applied
**Expected:** Avatar images are rendered and visible to users
**Screenshot:** 03_avatars_visible.png

### Step 7: Check Network Requests for Avatar Images
**Action:** Review network requests made by the browser
**Verify:**
- **CRITICAL**: Multiple successful requests to ui-avatars.com with 200 status codes
- **CRITICAL**: NO requests to /_next/image endpoint for avatar images (unoptimized bypasses Next.js optimization)
- **CRITICAL**: Zero 400 Bad Request errors in network tab
- Avatar images loaded directly from https://ui-avatars.com/api/
**Expected:** All avatar images load successfully with 200 status codes from ui-avatars.com
**Note:** Capture network requests using Playwright's network tracking

### Step 8: Verify Console Has No Image Loading Errors
**Action:** Check browser console for errors
**Verify:**
- **CRITICAL**: Zero console errors related to image loading
- **CRITICAL**: No 400 Bad Request errors logged
- No "Failed to load resource" errors for avatar images
**Expected:** Clean console output with no image-related errors

### Step 9: Scroll Dashboard to Load More Avatars
**Action:** Scroll down the dashboard page to load more user cards
**Verify:**
- Additional user cards load as page scrolls
- Avatar images in newly visible cards also load successfully
- No 400 errors appear for any newly loaded avatars
**Expected:** All avatar images load successfully regardless of scroll position
**Screenshot:** 04_scrolled_dashboard.png
**Wait:** 3 seconds for images to load after scrolling

### Step 10: Verify Specific Avatar Image Attributes
**Action:** Inspect avatar image elements in the DOM
**Verify:**
- Images have src attribute pointing directly to ui-avatars.com (not /_next/image)
- Images have width="64" and height="64" attributes
- Images have the unoptimized attribute or are loaded without Next.js optimization
**Expected:** Avatar images are loaded directly from ui-avatars.com without Next.js optimization layer

### Step 11: Test Avatar Fallback Still Works
**Action:** Use browser evaluate to simulate an image load error on one avatar
**Verify:**
- Error handler triggers correctly
- Fallback initials display in colored circle
- Other avatar images remain unaffected
**Expected:** Error handling and fallback mechanism still works correctly
**Screenshot:** 05_fallback_mechanism.png

### Step 12: Count Successful Avatar Loads
**Action:** Count how many avatar images successfully loaded
**Verify:**
- **CRITICAL**: At least 20 out of 25 total avatar images loaded successfully (80%+ success rate)
- Most user cards show avatar images, not just initials
**Expected:** High success rate for avatar image loading

### Step 13: Final Network Request Summary
**Action:** Generate final network request summary
**Verify:**
- Total number of requests to ui-avatars.com
- All requests to ui-avatars.com have 200 status codes
- Zero 400 Bad Request errors in entire session
**Expected:** 100% success rate for ui-avatars.com requests

### Step 14: Take Final Dashboard Screenshot
**Action:** Capture final state of dashboard
**Screenshot:** 06_final_dashboard_with_avatars.png

### Step 15: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Development server starts successfully
- ✅ User can log in to the application
- ✅ Dashboard page loads with user cards
- ✅ **CRITICAL**: Avatar images are visible in user cards (not just initials)
- ✅ **CRITICAL**: All requests to ui-avatars.com return 200 status codes
- ✅ **CRITICAL**: Zero 400 Bad Request errors in network tab
- ✅ **CRITICAL**: Avatar images load directly from ui-avatars.com (no /_next/image requests)
- ✅ **CRITICAL**: Zero console errors related to image loading
- ✅ Avatar images load after scrolling
- ✅ Avatar images have correct attributes (width, height, unoptimized)
- ✅ Fallback mechanism still works for error cases
- ✅ At least 80% of avatar images load successfully
- ✅ No image-related errors in browser console

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Development server fails to start
- Cannot login to application
- Dashboard page doesn't load
- **CRITICAL**: Avatar images don't display (only initials show)
- **CRITICAL**: Any 400 Bad Request errors appear in network tab
- **CRITICAL**: Requests to /_next/image endpoint for avatars (indicates optimization is still enabled)
- **CRITICAL**: Console contains image loading errors
- Avatar images fail to load from ui-avatars.com
- Less than 80% of avatars load successfully
- Network requests show failed avatar loads
- Fallback mechanism is broken

## Output Format
```json
{
  "test_name": "Avatar Loading Validation",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/01_login_page.png",
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/02_dashboard_loaded.png",
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/03_avatars_visible.png",
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/04_scrolled_dashboard.png",
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/05_fallback_mechanism.png",
    "<absolute_path>/media/e2e/<adw_id>/avatar_loading/06_final_dashboard_with_avatars.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
