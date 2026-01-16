# E2E Test: Responsive Navigation and Layout

## Test Metadata
- Test Name: Responsive Navigation and Layout
- Test ID: test_responsive_navigation
- Application URL: http://localhost:3000
- Purpose: Validate that the responsive navigation system works correctly including mobile menu, user dropdown, footer, and responsive behavior across all screen sizes

## User Story
As a user, I want to navigate easily through the app on any device with clear branding and accessible controls, so that I can efficiently access different sections, view my user information, and have a consistent experience across all pages.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Navigation, UserMenu, MobileMenu, and Footer components implemented

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all navigation components type-safe

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-nav-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Navigate to Login Page (Unauthenticated)
**Action:** Open http://localhost:3000/login in Playwright browser at desktop size (1920x1080)
**Verify:**
- Navigation bar is visible
- App branding "Mock User Dashboard" is displayed
- Home and About links are visible
- Login button is visible
- Mobile hamburger menu is NOT visible (desktop size)
- Footer is visible at bottom with copyright, app name, and GitHub link
**Expected:** Desktop navigation renders correctly for unauthenticated users
**Screenshot:** 01_login_desktop_unauthenticated.png

### Step 4: Test Navigation Links on Login Page
**Action:** Verify navigation links work correctly
**Verify:**
- Click "Home" link and verify navigation to /
- Click "About" link and verify navigation to /about
- Verify no Dashboard link is visible (user not authenticated)
- Verify no user menu is visible
**Expected:** Public navigation links work correctly
**Screenshot:** 02_navigation_links_unauthenticated.png

### Step 5: Test Footer on Login Page
**Action:** Scroll to bottom and verify footer
**Verify:**
- Footer has gray background (bg-gray-800)
- Copyright with current year (2025) is displayed
- "Mock User Dashboard" text is visible
- GitHub link is present and opens in new tab
- Footer is responsive with flex layout
**Expected:** Footer displays correctly on all pages
**Screenshot:** 03_footer_login_page.png

### Step 6: Login with Valid Credentials
**Action:** Login with admin credentials (username: "admin", password: "admin123")
**Verify:**
- Login successful
- Redirects to /dashboard
**Expected:** User is authenticated

### Step 7: Verify Desktop Navigation (Authenticated)
**Action:** Check navigation at desktop size (1920x1080) on dashboard
**Verify:**
- Navigation bar shows "Mock User Dashboard" branding
- Home, About, and Dashboard links are visible
- User dropdown button is visible with user initials
- Hamburger menu is NOT visible (desktop size)
- Login button is NOT visible (user authenticated)
- Footer is visible at bottom
**Expected:** Authenticated desktop navigation renders correctly
**Screenshot:** 04_dashboard_desktop_authenticated.png

### Step 8: Test User Dropdown Menu (Desktop)
**Action:** Click on user dropdown button
**Verify:**
- Dropdown opens below the button
- User's username "admin" is displayed
- User's role "admin" is displayed
- Logout button is present
- Dropdown has white background with shadow
- Arrow icon rotates when menu opens
**Expected:** User dropdown menu opens correctly
**Screenshot:** 05_user_dropdown_open.png

### Step 9: Test User Dropdown Close on Click Outside
**Action:** Click outside the dropdown menu
**Verify:**
- Dropdown closes automatically
- Menu disappears
**Expected:** Click-outside detection works correctly
**Screenshot:** 06_user_dropdown_closed.png

### Step 10: Test User Dropdown Close on Escape Key
**Action:** Open user dropdown, then press Escape key
**Verify:**
- Dropdown closes when Escape is pressed
- Menu disappears
**Expected:** Keyboard navigation works correctly

### Step 11: Test Logout from User Dropdown
**Action:** Open user dropdown and click Logout
**Verify:**
- User is logged out
- Redirects to /login
- Navigation updates to show Login button
- User dropdown is no longer visible
**Expected:** Logout from dropdown works correctly
**Screenshot:** 07_logout_from_dropdown.png

### Step 12: Login Again and Test Mobile View
**Action:** Login again with admin credentials, then resize browser to mobile (375x667)
**Verify:**
- Navigation bar is visible
- App branding is displayed
- Desktop navigation links are HIDDEN
- User dropdown is HIDDEN
- Hamburger menu button IS VISIBLE
- Footer adapts to mobile layout (stacked vertically)
**Expected:** Mobile navigation renders correctly
**Screenshot:** 08_mobile_view_authenticated.png

### Step 13: Test Mobile Menu Open
**Action:** Click hamburger menu button on mobile
**Verify:**
- Mobile menu slides in from the right
- Overlay appears with dimmed background
- Menu has user info at top (avatar with initials, username "admin", role "admin")
- Navigation links are visible (Home, About, Dashboard)
- Logout button is visible at bottom
- Close button (X) is visible at top
- Body scroll is disabled when menu is open
**Expected:** Mobile menu opens smoothly
**Screenshot:** 09_mobile_menu_open.png

### Step 14: Test Mobile Menu Close with Close Button
**Action:** Click the X close button in mobile menu
**Verify:**
- Mobile menu closes
- Overlay disappears
- Body scroll is re-enabled
**Expected:** Close button works correctly
**Screenshot:** 10_mobile_menu_closed.png

### Step 15: Test Mobile Menu Close with Overlay Click
**Action:** Open mobile menu, then click on the overlay
**Verify:**
- Mobile menu closes when clicking overlay
- Menu slides out
**Expected:** Overlay click-to-close works correctly

### Step 16: Test Mobile Menu Close with Escape Key
**Action:** Open mobile menu, then press Escape key
**Verify:**
- Mobile menu closes when Escape is pressed
- Menu disappears
**Expected:** Keyboard navigation works on mobile

### Step 17: Test Mobile Menu Navigation Links
**Action:** Open mobile menu and click "Home" link
**Verify:**
- Navigation to / occurs
- Mobile menu closes after navigation
- Page loads correctly
**Expected:** Navigation links work in mobile menu
**Screenshot:** 11_mobile_home_navigation.png

### Step 18: Test Logout from Mobile Menu
**Action:** Open mobile menu and click Logout button
**Verify:**
- User is logged out
- Redirects to /login
- Mobile menu closes
**Expected:** Logout from mobile menu works correctly
**Screenshot:** 12_mobile_logout.png

### Step 19: Test Mobile View (Unauthenticated)
**Action:** On login page at mobile size (375x667)
**Verify:**
- Hamburger menu is visible
- Open mobile menu and verify no user info section
- Only Home and About links are visible
- No logout button is present
- Footer adapts to mobile layout
**Expected:** Mobile menu works correctly for unauthenticated users
**Screenshot:** 13_mobile_menu_unauthenticated.png

### Step 20: Test Tablet View (768x1024)
**Action:** Login and resize browser to tablet size (768x1024)
**Verify:**
- Hamburger menu is visible (< 1024px)
- Desktop navigation is hidden
- Mobile menu works correctly
- Footer adapts to tablet layout
**Expected:** Tablet view behaves like mobile
**Screenshot:** 14_tablet_view.png

### Step 21: Test Large Desktop View (1920x1080)
**Action:** Resize to large desktop (1920x1080)
**Verify:**
- Desktop navigation is visible
- User dropdown is visible
- Hamburger menu is hidden
- All elements scale appropriately
- Footer layout is horizontal
**Expected:** Large desktop view works correctly
**Screenshot:** 15_large_desktop_view.png

### Step 22: Test Navigation Consistency Across Pages
**Action:** Navigate to Home, About, and Dashboard pages
**Verify:**
- Navigation appears consistently on all pages
- Footer appears on all pages
- Active page doesn't break navigation
- Layout structure is consistent
**Expected:** Navigation is consistent across all pages
**Screenshot:** 16_navigation_consistency.png

### Step 23: Test Footer Responsiveness
**Action:** Test footer at different screen sizes (375px, 768px, 1024px, 1920px)
**Verify:**
- Footer adapts layout (vertical on mobile, horizontal on desktop)
- Copyright, app name, and GitHub link always visible
- Footer stays at bottom of page (flex-grow on main content)
- Footer has consistent styling across all sizes
**Expected:** Footer is fully responsive
**Screenshot:** 17_footer_responsive.png

### Step 24: Test Smooth Animations
**Action:** Test all menu open/close animations
**Verify:**
- User dropdown has smooth transition (fade in/out)
- Mobile menu slides smoothly (transform translate)
- Overlay fades in/out smoothly
- Arrow icon rotates smoothly in user dropdown
- All transitions respect prefers-reduced-motion
**Expected:** All animations are smooth and accessible

### Step 25: Test Accessibility Features
**Action:** Navigate through menus using keyboard only
**Verify:**
- Tab key moves focus through navigation links
- Enter key activates links and buttons
- Escape key closes open menus
- Focus styles are visible (outline)
- ARIA labels are present (aria-label, aria-expanded, aria-haspopup)
- Screen reader text is appropriate
**Expected:** Navigation is fully accessible

### Step 26: Test Multiple Rapid Menu Toggles
**Action:** Rapidly click hamburger menu button multiple times
**Verify:**
- Menu state updates correctly
- No visual glitches
- Menu doesn't get stuck in half-open state
**Expected:** Rapid toggles are handled gracefully

### Step 27: Test Opening User Menu While Mobile Menu Open
**Action:** At breakpoint where both might be visible, test menu interactions
**Verify:**
- Only one menu type shows based on screen size
- No conflicts between mobile and desktop menus
**Expected:** Menu states are independent and correct

### Step 28: Check Console for Errors
**Action:** Review browser console for any JavaScript errors
**Verify:** No console errors or warnings related to navigation
**Expected:** Clean console output

### Step 29: Verify Network Requests
**Action:** Check network requests in browser dev tools
**Verify:** All resources load successfully, no 404s
**Expected:** No failed network requests

### Step 30: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Desktop navigation displays correctly for unauthenticated users
- ✅ Desktop navigation displays correctly for authenticated users
- ✅ User dropdown menu opens and closes correctly
- ✅ User dropdown shows username, role, and logout button
- ✅ Click-outside detection works for user dropdown
- ✅ Escape key closes user dropdown
- ✅ Logout works from user dropdown
- ✅ Mobile view shows hamburger menu (< 1024px)
- ✅ Desktop navigation hidden on mobile
- ✅ Mobile menu slides in smoothly with overlay
- ✅ Mobile menu shows user info when authenticated
- ✅ Mobile menu shows navigation links
- ✅ Mobile menu close button works
- ✅ Mobile menu closes on overlay click
- ✅ Mobile menu closes on Escape key
- ✅ Navigation links work in mobile menu
- ✅ Logout works from mobile menu
- ✅ Mobile menu works correctly for unauthenticated users
- ✅ Tablet view (768px) behaves correctly
- ✅ Large desktop view (1920px) works correctly
- ✅ Navigation is consistent across all pages
- ✅ Footer displays on all pages
- ✅ Footer is responsive at all screen sizes
- ✅ Footer contains copyright, app name, and GitHub link
- ✅ All animations are smooth
- ✅ Accessibility features work correctly
- ✅ Rapid menu toggles handled gracefully
- ✅ No console errors
- ✅ All network requests succeed

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Navigation doesn't render correctly on desktop or mobile
- User dropdown doesn't open/close properly
- Click-outside detection doesn't work
- Escape key doesn't close menus
- Logout doesn't work from menus
- Hamburger menu not visible on mobile (< 1024px)
- Desktop navigation visible on mobile
- Mobile menu doesn't slide in/out smoothly
- Mobile menu user info not displayed correctly
- Mobile menu navigation links don't work
- Mobile menu doesn't close properly
- Footer not visible on all pages
- Footer not responsive
- Footer missing required elements
- Layout structure broken on any screen size
- Animations are janky or broken
- Accessibility features don't work
- Console contains errors
- Navigation inconsistent across pages
- Body scroll not disabled when mobile menu open
- Menu states get stuck or glitched

## Output Format
```json
{
  "test_name": "Responsive Navigation and Layout",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/01_login_desktop_unauthenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/02_navigation_links_unauthenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/03_footer_login_page.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/04_dashboard_desktop_authenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/05_user_dropdown_open.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/06_user_dropdown_closed.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/07_logout_from_dropdown.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/08_mobile_view_authenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/09_mobile_menu_open.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/10_mobile_menu_closed.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/11_mobile_home_navigation.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/12_mobile_logout.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/13_mobile_menu_unauthenticated.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/14_tablet_view.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/15_large_desktop_view.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/16_navigation_consistency.png",
    "<absolute_path>/media/e2e/<adw_id>/responsive_navigation/17_footer_responsive.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
