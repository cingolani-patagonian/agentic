# E2E Test: UserCard Component

## Test Metadata
- Test Name: UserCard Component
- Test ID: test_user_card_component
- Application URL: http://localhost:3000
- Purpose: Validate that the enhanced UserCard component displays all user information correctly including location, avatar fallback, click interactions, accessibility features, hover effects, and responsive design

## User Story
As a developer using the UserCard component, I want a reusable, accessible component that displays complete user profile information with fallback handling, optional click interactions, and responsive design, so that I can consistently display user profiles throughout the application with a great user experience.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- No other service running on port 3000
- Enhanced UserCard component implemented at app/nextjs/components/UserCard.tsx
- Mock user database with 25 user profiles including location data
- Dashboard page using the UserCard component

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, component props properly typed with optional onClick and className

### Step 2: Start Development Server
**Action:** Start the Next.js development server in the background
```bash
cd app/nextjs && npm run dev > /tmp/nextjs-usercard-dev.log 2>&1 &
```
**Verify:** Server starts on port 3000
**Expected:** Development server accessible at http://localhost:3000
**Wait:** 5 seconds for server to fully start

### Step 3: Login to Dashboard
**Action:** Navigate to http://localhost:3000/login and login with admin credentials (username: "admin", password: "admin123")
**Verify:** Successfully logged in and redirected to /dashboard
**Expected:** Dashboard loads with user cards visible

### Step 4: Verify Location Display on Cards
**Action:** Inspect user cards on the dashboard
**Verify:**
- Location field is visible on all cards
- Location is displayed with label "Location:" followed by the location value
- Location appears between department and email fields
- Location text styling matches role and department (text-sm, text-gray-600)
**Expected:** All 25 user cards display location information correctly
**Screenshot:** 01_location_display.png

### Step 5: Verify Card Content Structure
**Action:** Inspect the first user card for complete information
**Verify:** Each card displays all required fields:
- Avatar image (circular, 64x64 pixels)
- User name (bold, larger text)
- Status badge (green for active, gray for inactive)
- Role with label
- Department with label
- Location with label (NEW)
- Email as clickable link
**Expected:** All user information displays correctly in proper hierarchy
**Screenshot:** 02_complete_card_content.png

### Step 6: Test Avatar Fallback - Simulate Image Error
**Action:** Use browser DevTools to block the avatar image URL or use browser evaluate to trigger onError
```javascript
// Find an image element and trigger its error handler
const img = document.querySelector('img[alt*="avatar"]');
if (img) img.dispatchEvent(new Event('error'));
```
**Verify:**
- Avatar image is replaced with user initials
- Fallback displays 1-2 uppercase letters from user name
- Fallback has colored circular background (indigo-500)
- Fallback has same dimensions as avatar (w-16 h-16)
- Fallback text is white and clearly visible
**Expected:** Avatar fallback displays user initials when image fails to load
**Screenshot:** 03_avatar_fallback.png

### Step 7: Verify Avatar Accessibility Labels
**Action:** Inspect avatar elements with accessibility tools
**Verify:**
- Avatar image has aria-label: "{user.name}'s profile picture"
- Fallback div has same aria-label format
- Screen reader announces avatar appropriately
**Expected:** Avatar elements have proper ARIA labels

### Step 8: Verify Card ARIA Labels and Semantic HTML
**Action:** Inspect card container and elements
**Verify:**
- Card container has role="article"
- Card has aria-label="User profile card for {user.name}"
- Status badge has aria-label="Status: {user.status}"
- Email link has aria-label="Send email to {user.name}"
- All interactive elements are properly labeled
**Expected:** Comprehensive ARIA labels present on all elements
**Screenshot:** 04_aria_labels.png

### Step 9: Verify Status Badge Colors
**Action:** Identify active and inactive users on dashboard
**Verify:**
- Active users have green status badge (bg-green-100, text-green-800)
- Inactive users have gray status badge (bg-gray-100, text-gray-800)
- Badge text displays "active" or "inactive"
- Badge colors are visually distinct and accessible
- Badge has proper aria-label with status
**Expected:** Status badges display correct colors based on user status
**Screenshot:** 05_status_badge_colors.png

### Step 10: Test Email Link Functionality
**Action:** Inspect and hover over email links
**Verify:**
- Email is styled as a link (text-indigo-600)
- Email has mailto: href attribute with correct email
- Hovering changes color (text-indigo-800) and adds underline
- Email has break-all class for long addresses
- Email click doesn't trigger card onClick (event stops propagation)
- Email has aria-label for screen readers
**Expected:** Email links are functional with proper mailto: and styling
**Screenshot:** 06_email_links.png

### Step 11: Test Card Hover Effects
**Action:** Hover mouse over various user cards
**Verify:**
- Card shadow increases on hover (shadow-md to shadow-lg)
- Hover transition is smooth (transition-shadow)
- Card layout remains stable during hover
- Hover doesn't affect clickable cards differently than non-clickable
**Expected:** Cards have smooth hover effects with shadow transition
**Screenshot:** 07_hover_effects.png

### Step 12: Test Responsive Design - Desktop (1920x1080)
**Action:** Set browser viewport to desktop size (1920x1080)
**Verify:**
- Cards display in grid layout (3-4 columns)
- Cards use p-6 padding on desktop
- Text doesn't overflow or wrap awkwardly
- Avatar and content are properly aligned
- All fields are visible without scrolling within card
**Expected:** Desktop layout displays cards efficiently in multi-column grid
**Screenshot:** 08_desktop_responsive.png

### Step 13: Test Responsive Design - Tablet (768x1024)
**Action:** Resize browser viewport to tablet size (768x1024)
**Verify:**
- Cards adapt to 2-column layout
- Padding remains appropriate (p-6 or adjusted)
- All content remains visible and readable
- Layout doesn't break or overflow
**Expected:** Tablet layout adapts cards to 2 columns
**Screenshot:** 09_tablet_responsive.png

### Step 14: Test Responsive Design - Mobile (375x667)
**Action:** Resize browser viewport to mobile size (375x667)
**Verify:**
- Cards display in single column layout
- Padding adjusts to p-4 on mobile (sm:p-6)
- Long text wraps properly (break-words on name, break-all on email)
- Avatar maintains size and proportion
- Status badge remains visible and readable
- Location, role, department, email all visible without horizontal scroll
**Expected:** Mobile layout displays single column with optimized padding
**Screenshot:** 10_mobile_responsive.png

### Step 15: Restore Desktop View
**Action:** Resize browser back to desktop size (1920x1080)
**Verify:** Grid returns to multi-column layout

### Step 16: Test Keyboard Navigation - Non-Clickable Cards
**Action:** Use Tab key to navigate through page
**Verify:**
- Cards without onClick are not focusable with Tab
- Email links within cards are focusable
- Focus moves from card to card's email link
**Expected:** Non-clickable cards don't receive keyboard focus

### Step 17: Verify Cards Are Currently Non-Clickable
**Action:** Click on a user card (not on the email link)
**Verify:**
- Card click does nothing (no onClick handler provided by dashboard)
- Only email link is clickable
**Expected:** Cards without onClick prop are not interactive except for email link

### Step 18: Test Text Overflow Handling
**Action:** Inspect cards with various name lengths
**Verify:**
- User names with multiple words wrap properly (break-words)
- Long email addresses don't break layout (break-all)
- Department and role text handle long values
- Location text displays without overflow
**Expected:** Long text values wrap or truncate gracefully

### Step 19: Test Cards with Missing Location Data
**Action:** Check if any mock users have no location (or temporarily modify data)
**Verify:**
- Cards without location data don't show location field
- Conditional rendering: {user.location && ...}
- No empty labels or broken layout when location is missing
**Expected:** Cards gracefully handle missing optional location data

### Step 20: Verify Screen Reader Compatibility
**Action:** Use screen reader or accessibility inspector
**Verify:**
- Card announces as "article" with descriptive label
- Card content is announced in logical order: name, status, role, department, location, email
- All ARIA labels are announced correctly
- Interactive elements (email link) are clearly identified
**Expected:** Screen readers navigate card content clearly and logically
**Screenshot:** 11_screen_reader_flow.png

### Step 21: Test Focus Indicators (Preparation for Clickable Cards)
**Action:** Inspect card CSS for focus states
**Verify:**
- When onClick is provided, cards should have focus:outline-none, focus:ring-2, focus:ring-indigo-500, focus:ring-offset-2
- Focus indicator is clearly visible
- Focus state distinguishes card from non-focused state
**Expected:** Cards have proper focus styling when interactive

### Step 22: Verify Optional className Prop Support
**Action:** Inspect component code or temporarily add custom class to dashboard
**Verify:**
- UserCard accepts optional className prop
- Custom classes are applied to card container
- Custom classes don't break existing styling
**Expected:** Component supports additional styling through className prop

### Step 23: Check Console for Errors
**Action:** Review browser console for any JavaScript errors or warnings
**Verify:** No console errors related to UserCard component, Image component, or React
**Expected:** Clean console output

### Step 24: Verify Component Props TypeScript Types
**Action:** Review UserCard component interface definition
**Verify:**
- user prop is required and typed as User
- onClick prop is optional: onClick?: (user: User) => void
- className prop is optional: className?: string
- JSDoc comments document all props
**Expected:** Props are properly typed with clear documentation

### Step 25: Test Email Click Event Isolation
**Action:** If onClick were provided to cards, clicking email should not trigger it
**Verify:**
- Email click handler has stopPropagation()
- Clicking email only opens mailto, doesn't trigger card onClick
**Expected:** Email click events are isolated from card click events

### Step 26: Verify Hover Effects on Touch Devices (Mobile View)
**Action:** In mobile viewport, test touch interactions
**Verify:**
- Hover styles should work on touch (consider active states)
- Touch doesn't cause stuck hover states
- Cards remain tappable on email link
**Expected:** Touch interactions work smoothly on mobile

### Step 27: Verify All Cards Render Correctly
**Action:** Scroll through all 25 user cards on dashboard
**Verify:**
- All cards render without errors
- All cards show location information
- No missing or broken images (or fallback displays)
- No layout issues or overlapping content
**Expected:** All 25 cards render perfectly with consistent layout
**Screenshot:** 12_all_cards_rendering.png

### Step 28: Run Production Build Test
**Action:** Build the Next.js app for production
```bash
cd app/nextjs && npm run build
```
**Verify:**
- Build completes successfully without errors
- No warnings about UserCard component
- Image optimization warnings are expected/acceptable
**Expected:** Production build succeeds

### Step 29: Test Component Reusability (Future-Proofing)
**Action:** Verify component can be used in different contexts
**Verify:**
- Component has no hard-coded dependencies on dashboard
- Component accepts user object and optional handlers
- Component styling is self-contained (no external dependencies beyond Tailwind)
**Expected:** Component is truly reusable across different pages

### Step 30: Stop Development Server
**Action:** Stop the background development server
```bash
pkill -f "next dev" || killall node || true
```
**Verify:** Server stops cleanly

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Location field displays on all user cards
- ✅ Avatar fallback mechanism works (displays user initials when image fails)
- ✅ All cards show complete information: avatar, name, status, role, department, location, email
- ✅ Comprehensive ARIA labels present on all elements (card, avatar, status, email)
- ✅ Card container uses role="article" for semantic HTML
- ✅ Status badges show correct colors (green for active, gray for inactive)
- ✅ Email links are clickable with proper mailto: attributes
- ✅ Email links have aria-label for accessibility
- ✅ Card hover effects work smoothly with shadow transition
- ✅ Responsive design works correctly at desktop (multi-column), tablet (2-column), mobile (single column)
- ✅ Mobile uses adjusted padding (p-4 sm:p-6)
- ✅ Text overflow handled properly (break-words for names, break-all for emails)
- ✅ Cards handle missing location data gracefully (conditional rendering)
- ✅ Email click events don't trigger card onClick (stopPropagation)
- ✅ Component props are properly typed (user required, onClick and className optional)
- ✅ JSDoc comments document component and props
- ✅ Screen readers navigate card content clearly
- ✅ No console errors during operation
- ✅ Production build succeeds
- ✅ Component maintains backward compatibility with existing dashboard

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Location field is missing or not displayed
- Avatar fallback doesn't work when images fail
- Any required card information is missing
- ARIA labels are missing or incorrect
- Status badge colors are wrong
- Email links don't work or missing mailto:
- Hover effects don't work or are jarring
- Responsive layout breaks at any viewport size
- Text overflows or breaks layout
- Cards crash with missing location data
- Email clicks trigger card onClick when provided
- Component props are not properly typed
- Screen readers can't navigate card content
- Console contains errors
- Production build fails
- Backward compatibility broken (dashboard doesn't work)

## Output Format
```json
{
  "test_name": "UserCard Component",
  "status": "passed|failed",
  "screenshots": [
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/01_location_display.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/02_complete_card_content.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/03_avatar_fallback.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/04_aria_labels.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/05_status_badge_colors.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/06_email_links.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/07_hover_effects.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/08_desktop_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/09_tablet_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/10_mobile_responsive.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/11_screen_reader_flow.png",
    "<absolute_path>/media/e2e/<adw_id>/user_card_component/12_all_cards_rendering.png"
  ],
  "error": null
}
```

## Cleanup
- Ensure development server is stopped
- Clear localStorage
- Clean up any temporary files or processes
- Remove any test screenshots if needed

## Notes
- This test validates the enhanced UserCard component with all new features
- Tests backward compatibility by verifying dashboard still works
- Avatar fallback testing requires simulating image load failures
- Optional onClick functionality is tested for future use cases
- Component reusability and type safety are critical success factors
