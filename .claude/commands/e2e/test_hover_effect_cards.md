# E2E Test: Enhanced Hover Effects on User Profile Cards

## User Story
As a user browsing the team directory on the dashboard
I want to see visual feedback when I hover over user profile cards
So that I can clearly identify which card I'm about to interact with and enjoy a more engaging, modern interface

## Test Description
This E2E test validates the enhanced hover effects on user profile cards displayed on the dashboard. The test verifies that cards display coordinated visual effects including shadow elevation, scale transformation, background color changes, and border accents when hovered. It also ensures smooth transitions, accessibility compliance, and consistent behavior across all cards.

## Prerequisites
- Application must be running on the configured port
- Backend API must be accessible and returning user data
- Dashboard must be accessible at `/dashboard`
- Valid login credentials (admin/admin123)

## Test Steps

### Step 1: Navigate to Dashboard
**Action:** Open browser and navigate to dashboard login page
**Verify:**
- Login page loads successfully
- Username and password fields are visible
**Expected:** Login page displays correctly
**Screenshot:** 01_login_page.png

### Step 2: Login as Admin
**Action:** Enter credentials (username: admin, password: admin123) and submit
**Verify:**
- Login succeeds without errors
- Dashboard page loads successfully
- User cards are visible on the page
**Expected:** Successfully logged in and redirected to dashboard
**Screenshot:** 02_dashboard_loaded.png

### Step 3: Verify Initial Card State (Before Hover)
**Action:** Take screenshot of a user card in its default state
**Verify:**
- Cards display with white background (bg-white)
- Cards have medium shadow (shadow-md)
- Cards have transparent border (border-transparent)
- Cards have rounded corners and proper spacing
**Expected:** Cards display in default state with standard styling
**Screenshot:** 03_card_default_state.png

### Step 4: Test Shadow Elevation on Hover
**Action:** Hover over a user card and capture the shadow effect
**Verify:**
- Card shadow increases from shadow-md to shadow-2xl on hover
- Shadow transition is smooth and visible
- Shadow appears more elevated than the default state
**Expected:** Card displays enhanced shadow (shadow-2xl) when hovered
**Screenshot:** 04_card_shadow_hover.png

### Step 5: Test Scale Transformation on Hover
**Action:** Hover over a user card and verify scale effect
**Verify:**
- Card scales up subtly (approximately 2% increase)
- Scale transformation is smooth and does not cause layout shift
- Card remains within grid boundaries during scale
**Expected:** Card scales to 1.02x size smoothly on hover
**Screenshot:** 05_card_scale_hover.png

### Step 6: Test Background Color Change on Hover
**Action:** Hover over a user card and observe background color
**Verify:**
- Card background changes from white (bg-white) to light gray (bg-gray-50)
- Background color transition is smooth
- Text remains readable on the new background
**Expected:** Card background shifts to gray-50 on hover
**Screenshot:** 06_card_background_hover.png

### Step 7: Test Border Accent on Hover
**Action:** Hover over a user card and verify border appearance
**Verify:**
- Card border changes from transparent to indigo-500 on hover
- Border is visible and has appropriate width
- Border transition is smooth
**Expected:** Card displays indigo-500 border on hover
**Screenshot:** 07_card_border_hover.png

### Step 8: Test Combined Hover Effects
**Action:** Hover over a user card and verify all effects work together
**Verify:**
- Shadow elevation, scale, background color, and border all animate together
- Transitions are coordinated and smooth (200ms duration)
- No visual glitches or janky animations
- Card appearance is polished and professional
**Expected:** All hover effects work in harmony
**Screenshot:** 08_card_combined_hover.png

### Step 9: Test Hover Consistency Across Multiple Cards
**Action:** Hover over multiple user cards sequentially (at least 5 different cards)
**Verify:**
- All cards display identical hover effects
- Hover effects are consistent regardless of card position in grid
- No cards have missing or broken hover effects
**Expected:** Consistent hover behavior across all cards
**Screenshot:** 09_multiple_cards_hover.png

### Step 10: Test Hover Exit Transition
**Action:** Hover over a card, then move mouse away
**Verify:**
- Card smoothly transitions back to default state
- Reverse transition has same duration (200ms)
- No visual artifacts or stuck states after mouse leaves
**Expected:** Smooth transition back to default state
**Screenshot:** 10_card_hover_exit.png

### Step 11: Test Email Link Hover Isolation
**Action:** Hover over the email link inside a user card
**Verify:**
- Card hover effects still apply when hovering over email link
- Email link shows its own hover styles (text-indigo-800, underline)
- Email link hover does not conflict with card hover
**Expected:** Card and email link hover states work independently
**Screenshot:** 11_email_link_hover.png

### Step 12: Test No Layout Shift on Hover
**Action:** Hover over cards at the edges of the grid
**Verify:**
- Hover effects do not cause cards to overflow grid container
- No horizontal or vertical scrollbars appear due to hover
- Adjacent cards do not shift position when one card is hovered
- Grid layout remains stable during all hover interactions
**Expected:** No layout shifts or overflow on hover
**Screenshot:** 12_no_layout_shift.png

### Step 13: Test Rapid Hover Events
**Action:** Rapidly move mouse over multiple cards (5+ cards in quick succession)
**Verify:**
- Hover effects trigger and reverse smoothly for each card
- No performance degradation or janky animations
- Transitions complete properly even with rapid mouse movement
**Expected:** Smooth performance during rapid hover events
**Screenshot:** 13_rapid_hover.png

### Step 14: Test Desktop Viewport (1920x1080)
**Action:** Resize browser to 1920x1080 and test hover effects
**Verify:**
- Hover effects work correctly on desktop viewport
- Cards display in 4-column grid (xl:grid-cols-4)
- All hover effects are smooth and visible
**Expected:** Hover effects work perfectly on desktop
**Screenshot:** 14_desktop_viewport_hover.png

### Step 15: Test Tablet Viewport (768x1024)
**Action:** Resize browser to 768x1024 and test hover effects
**Verify:**
- Hover effects work correctly on tablet viewport
- Cards display in appropriate grid (2 or 3 columns)
- Hover effects remain smooth on medium screen
**Expected:** Hover effects work on tablet viewport
**Screenshot:** 15_tablet_viewport_hover.png

### Step 16: Test Mobile Viewport (375x667)
**Action:** Resize browser to 375x667 and test hover effects
**Verify:**
- Hover effects work correctly on mobile viewport
- Cards display in single column (grid-cols-1)
- Hover effects remain visible and smooth on small screen
**Expected:** Hover effects work on mobile viewport
**Screenshot:** 16_mobile_viewport_hover.png

### Step 17: Test Focus States (Keyboard Navigation)
**Action:** Use Tab key to navigate to user cards
**Verify:**
- Focus ring appears correctly (focus:ring-2 focus:ring-indigo-500)
- Focus styles do not conflict with hover styles
- Cards are keyboard accessible with visible focus indicators
**Expected:** Focus states work independently of hover states
**Screenshot:** 17_focus_states.png

### Step 18: Test Long Content Cards
**Action:** Find and hover over cards with long names, emails, or departments
**Verify:**
- Hover effects work correctly even with text overflow
- Long content does not break hover animations
- Cards maintain proper dimensions during hover
**Expected:** Hover effects work with long content
**Screenshot:** 18_long_content_hover.png

### Step 19: Verify Transition Duration
**Action:** Observe hover transition timing
**Verify:**
- Transition duration is approximately 200ms (not too fast, not too slow)
- Timing function is ease-in-out (smooth acceleration and deceleration)
- Transitions feel polished and professional
**Expected:** Transitions use duration-200 with ease-in-out timing
**Screenshot:** 19_transition_timing.png

### Step 20: Final State Verification
**Action:** Return to default viewport (1920x1080) and review overall appearance
**Verify:**
- All hover effects are working correctly
- Dashboard layout is stable and professional
- No visual regressions or broken styles
**Expected:** Feature is fully functional and polished
**Screenshot:** 20_final_state.png

## Success Criteria
- ✅ User cards display enhanced shadow elevation on hover (shadow-2xl)
- ✅ User cards scale up subtly on hover (scale-[1.02])
- ✅ User cards show background color change on hover (bg-gray-50)
- ✅ User cards display border accent on hover (border-indigo-500)
- ✅ Hover transitions are smooth with 200ms duration using ease-in-out timing
- ✅ Hover effects are consistent across all user cards
- ✅ Hover effects work correctly on all viewport sizes (mobile, tablet, desktop)
- ✅ Hover effects do not cause layout shifts or overflow
- ✅ Hover effects do not interfere with email link hover states
- ✅ Hover effects do not interfere with keyboard focus states
- ✅ Hover effects perform smoothly during rapid mouse movements
- ✅ Cards transition smoothly back to default state when hover ends

## Output Format
```json
{
  "test_name": "Enhanced Hover Effects on User Profile Cards",
  "status": "passed|failed",
  "screenshots": [
    "<absolute path to codebase>/media/e2e/<adw_id>/hover_effect_cards/01_login_page.png",
    "<absolute path to codebase>/media/e2e/<adw_id>/hover_effect_cards/02_dashboard_loaded.png",
    "... (all screenshots as per test steps)"
  ],
  "error": null
}
```
