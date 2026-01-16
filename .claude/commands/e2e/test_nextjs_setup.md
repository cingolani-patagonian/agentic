# E2E Test: Next.js Setup Validation

## Test Metadata
- Test Name: Next.js Setup Validation
- Test ID: test_nextjs_setup
- Application URL: http://localhost:3000
- Purpose: Validate that the Next.js application is properly configured, builds successfully, and runs with all features working

## User Story
As a developer, I want to verify that the Next.js application is properly set up with TypeScript, Tailwind CSS, and all configuration files in place, so that I can confidently develop and deploy the application to Vercel.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, strict mode enforced

### Step 2: Verify ESLint Configuration
**Action:** Run ESLint to validate code quality
```bash
cd app/nextjs && npm run lint
```
**Verify:** ESLint passes with Next.js standards
**Expected:** No linting errors

### Step 3: Build the Application
**Action:** Create a production build
```bash
cd app/nextjs && npm run build
```
**Verify:** Build completes successfully with optimized output
**Expected:** .next directory created, no build errors, optimization messages displayed

### Step 4: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 5: Navigate to Home Page
**Action:** Open http://localhost:3000 in Playwright browser
**Verify:** Home page loads successfully
**Expected:** Page renders without errors
**Screenshot:** 01_home_page.png

### Step 6: Verify Page Title and Content
**Action:** Check for main heading "Welcome to Next.js"
**Verify:**
- Title contains "Next.js App"
- Heading "Welcome to Next.js" is visible
- Description text is present
**Expected:** All text elements render correctly
**Screenshot:** 02_page_content.png

### Step 7: Verify Navigation Component
**Action:** Check that navigation bar is present
**Verify:**
- Navigation bar is visible at top
- "Next.js App" brand link exists
- "Home" link is present
- "About" link is present
**Expected:** Navigation component renders with all links
**Screenshot:** 03_navigation.png

### Step 8: Verify Tailwind CSS Styling
**Action:** Inspect the page for Tailwind CSS classes
**Verify:**
- Background colors are applied
- Grid layout is visible with 3 cards
- Responsive classes are present
- Dark mode support classes exist
**Expected:** Tailwind CSS styles are properly applied
**Screenshot:** 04_tailwind_styles.png

### Step 9: Verify Feature Cards
**Action:** Check for three feature cards (SSR, TypeScript, Tailwind CSS)
**Verify:**
- "Server-Side Rendering" card is visible
- "TypeScript" card is visible
- "Tailwind CSS" card is visible
- All cards have proper styling
**Expected:** All three feature cards render correctly
**Screenshot:** 05_feature_cards.png

### Step 10: Verify Getting Started Section
**Action:** Scroll to "Getting Started" section
**Verify:**
- "Getting Started" heading is visible
- Commands are displayed with code styling
- npm run dev, npm run build instructions present
**Expected:** Getting started section is complete and styled
**Screenshot:** 06_getting_started.png

### Step 11: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings
**Expected:** Clean console output

### Step 12: Verify Network Requests
**Action:** Check network requests in browser dev tools
**Verify:** All resources load successfully (HTML, CSS, JS)
**Expected:** No 404 or 500 errors

### Step 13: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors with strict mode
- ✅ ESLint validation passes
- ✅ Production build completes successfully
- ✅ Development server starts on port 3000
- ✅ Home page loads and renders correctly
- ✅ Navigation component is visible with all links
- ✅ Tailwind CSS styles are applied correctly
- ✅ All three feature cards are visible
- ✅ Getting Started section renders properly
- ✅ No console errors or warnings
- ✅ All network requests succeed

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- ESLint reports errors
- Build process fails or produces errors
- Development server fails to start or crashes
- Home page returns 404 or 500 error
- Navigation component is missing or broken
- Tailwind CSS styles are not applied
- Console contains errors
- Any feature card is missing
- Page layout is broken or incorrectly rendered

## Output Format
```json
{
  "test_name": "Next.js Setup Validation",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/01_home_page.png",
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/02_page_content.png",
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/03_navigation.png",
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/04_tailwind_styles.png",
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/05_feature_cards.png",
    "<absolute_path>/media/e2e/<adw_id>/nextjs_setup/06_getting_started.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clean up any temporary files or processes
