# Feature: Add Hover Effect to User Profile Cards

## Metadata
issue_number: `23`
adw_id: `f6170557`
issue_json: `{"number":23,"title":"Add hover effect to user profile cards","body":"Add visual hover effects to user profile cards to improve interactivity and user experience.\n\n**Description:**\nImplement hover states for user profile cards displayed on the dashboard.\n\n**Acceptance Criteria:**\n- Cards should display a visual effect when hovered (e.g., elevation/shadow, scale, or color change)\n- Hover effect should be smooth and performant\n- Effect should be consistent across all user cards\n- Should maintain accessibility standards"}`

## Feature Description
This feature adds visual hover effects to user profile cards on the dashboard to enhance interactivity and user experience. The hover effects will provide immediate visual feedback when users move their mouse over cards, making the interface feel more responsive and modern. The implementation will include smooth transitions for shadows, scale transformations, and subtle color changes while maintaining accessibility and performance standards.

## User Story
As a user browsing the team directory on the dashboard
I want to see visual feedback when I hover over user profile cards
So that I can clearly identify which card I'm about to interact with and enjoy a more engaging, modern interface

## Problem Statement
Currently, the user profile cards on the dashboard have only a basic shadow transition on hover (`hover:shadow-lg transition-shadow`). While functional, this minimal hover effect doesn't provide a sufficiently engaging user experience. The cards lack the visual polish expected in modern web applications, where hover effects typically include multiple coordinated transitions such as elevation changes, subtle scaling, and color transformations. Users would benefit from more prominent visual feedback that makes the interface feel more interactive and responsive.

## Solution Statement
Enhance the UserCard component by adding comprehensive, multi-layered hover effects that combine shadow elevation, subtle scale transformation, and background color transitions. The implementation will use Tailwind CSS utility classes to create smooth, performant animations that work seamlessly across all viewport sizes. The hover effects will be designed to maintain accessibility standards by respecting `prefers-reduced-motion` settings and not interfering with keyboard navigation or screen readers. The solution will extend the existing hover styling without breaking backward compatibility or affecting the card's clickable functionality.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/components/UserCard.tsx` (lines 70-72) - The main UserCard component that needs enhanced hover effects. Currently has basic `hover:shadow-lg transition-shadow` styling that needs to be extended with scale, background color, and border effects.

- `app/nextjs/app/dashboard/page.tsx` (line 246) - The dashboard page that renders UserCard components in a responsive grid. Needs to be tested to ensure hover effects work correctly with the grid layout and don't cause layout shifts.

- `app/nextjs/app/globals.css` - Global styles file that contains the `.transition-smooth` utility class (`transition: all 0.2s ease-in-out`) and animation definitions. May need to add custom transition classes or update existing ones for optimal hover performance.

- `app/nextjs/tailwind.config.ts` - Tailwind configuration file that may need custom theme extensions for hover colors, shadows, or transition timings if standard Tailwind utilities are insufficient.

- `.claude/commands/test_e2e.md` - E2E test runner documentation to understand how to create and structure E2E tests.

- `.claude/commands/e2e/test_user_card_component.md` - Existing E2E test for UserCard component that validates hover effects (line 126-133). This test should be updated or used as reference for the new hover effect validation.

### New Files

- `.claude/commands/e2e/test_hover_effect_cards.md` - New E2E test file to specifically validate the enhanced hover effects on user profile cards, including shadow elevation, scale transformation, background color changes, smooth transitions, and accessibility compliance.

## Implementation Plan
### Phase 1: Foundation
Before implementing the main hover effects, establish the foundation by:

1. **Review Existing Hover Implementation**: Examine the current `hover:shadow-lg transition-shadow` implementation in UserCard.tsx to understand what's already in place and ensure the new effects build on top of it without conflicts.

2. **Identify Accessibility Requirements**: Check the globals.css file for `prefers-reduced-motion` media query support and ensure the hover effects will respect user accessibility preferences.

3. **Analyze Global Styles and Tailwind Config**: Review existing transition utilities (`.transition-smooth`) and Tailwind configuration to determine if custom classes or config extensions are needed for the hover effects.

### Phase 2: Core Implementation
Implement the enhanced hover effects by:

1. **Update UserCard Component Styling**: Modify the className in UserCard.tsx (lines 70-72) to add multiple coordinated hover effects:
   - Enhance shadow elevation from `shadow-md` to `shadow-2xl` on hover (more dramatic than current `shadow-lg`)
   - Add subtle scale transformation (`hover:scale-[1.02]`) for a gentle zoom effect
   - Add background color shift (`hover:bg-gray-50`) for subtle color change
   - Optionally add border accent (`hover:border-indigo-500`) with border width transition
   - Update transition class from `transition-shadow` to `transition-all` or create custom transition class for shadow, transform, and background

2. **Optimize Transitions for Performance**: Ensure transitions are smooth (200-300ms) and use GPU-accelerated properties (transform, opacity) where possible. Update or extend the `.transition-smooth` class in globals.css if needed.

3. **Handle Accessibility**: Add CSS rules in globals.css to disable or reduce hover animations for users with `prefers-reduced-motion: reduce` preference.

### Phase 3: Integration
Integrate and validate the hover effects across the application:

1. **Test with Dashboard Grid Layout**: Verify hover effects work correctly in the responsive grid layout (1/2/3/4 columns) without causing layout shifts or overflow issues.

2. **Verify Clickable vs Non-Clickable Cards**: Ensure hover effects work consistently whether the card has an `onClick` handler or not, and don't interfere with focus states for keyboard navigation.

3. **Cross-Browser and Viewport Testing**: Test hover effects across different viewport sizes (mobile, tablet, desktop) and ensure they degrade gracefully on touch devices.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Research and Analysis
- Read `app/nextjs/components/UserCard.tsx` to understand the current component structure and hover implementation
- Read `app/nextjs/app/dashboard/page.tsx` to understand how cards are rendered in the grid layout
- Read `app/nextjs/app/globals.css` to review existing transition utilities and animation patterns
- Read `app/nextjs/tailwind.config.ts` to check current theme configuration
- Review `.claude/commands/e2e/test_user_card_component.md` (lines 126-133) to understand existing hover effect validation

### 2. Design Hover Effects
- Determine the specific hover effects to implement based on:
  - Shadow elevation: upgrade from `hover:shadow-lg` to `hover:shadow-2xl`
  - Scale transformation: add `hover:scale-[1.02]` for subtle zoom
  - Background color: add `hover:bg-gray-50` for color shift
  - Optional border accent: add `hover:border-2 hover:border-indigo-500`
- Determine optimal transition duration (aim for 200-300ms)
- Plan accessibility considerations for `prefers-reduced-motion`

### 3. Update Global Styles (if needed)
- If the existing `.transition-smooth` class is insufficient, create or update transition utilities in `app/nextjs/app/globals.css`
- Add `@media (prefers-reduced-motion: reduce)` rules to disable or reduce animations for accessibility
- Example:
  ```css
  .transition-card-hover {
    transition: all 0.2s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .transition-card-hover {
      transition: none;
    }
  }
  ```

### 4. Update Tailwind Config (if needed)
- If custom theme extensions are needed (e.g., custom shadow levels, timing functions), update `app/nextjs/tailwind.config.ts`
- Only make changes if standard Tailwind utilities are insufficient

### 5. Implement Enhanced Hover Effects in UserCard Component
- Edit `app/nextjs/components/UserCard.tsx` at lines 70-72
- Update the className to include enhanced hover effects:
  - Replace or extend `transition-shadow` with `transition-all` or custom transition class
  - Add `hover:shadow-2xl` (or keep `hover:shadow-lg` and test which looks better)
  - Add `hover:scale-[1.02]` for subtle zoom effect
  - Add `hover:bg-gray-50` for background color shift
  - Optionally add `hover:border-2 hover:border-indigo-500` with `border border-transparent` as the default state
- Example className structure:
  ```tsx
  className={`bg-white rounded-lg shadow-md p-4 sm:p-6 border border-transparent
    hover:shadow-2xl hover:scale-[1.02] hover:bg-gray-50 hover:border-indigo-500
    transition-all duration-200 ease-in-out
    ${isClickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : ''}
    ${className}`}
  ```

### 6. Create E2E Test for Hover Effects
- Create a new E2E test file: `.claude/commands/e2e/test_hover_effect_cards.md`
- Read `.claude/commands/test_e2e.md` for E2E test structure and format
- Read `.claude/commands/e2e/test_user_card_component.md` as a reference for test structure
- Include test steps to validate:
  - Cards display enhanced shadow on hover (shadow-2xl)
  - Cards scale up subtly on hover (scale-[1.02])
  - Cards change background color on hover (bg-gray-50)
  - Border appears on hover if implemented (border-indigo-500)
  - Transitions are smooth (200-300ms duration)
  - Hover effects work on all viewport sizes (desktop, tablet, mobile)
  - Hover effects respect `prefers-reduced-motion` preference
  - Hover effects don't cause layout shifts or overflow
  - Hover effects work consistently across all 25 user cards
  - Hover effects don't interfere with email link hover states
  - Take screenshots at various stages: before hover, during hover, after hover

### 7. Run TypeScript Compilation Check
- Execute: `cd app/nextjs && npx tsc --noEmit`
- Verify TypeScript compiles without errors
- Fix any type errors if they occur

### 8. Run Frontend Build
- Execute: `cd app/nextjs && npm run build`
- Verify the build completes successfully
- Fix any build errors if they occur

### 9. Manual Visual Testing
- Start the Next.js development server: `cd app/nextjs && npm run dev`
- Navigate to http://localhost:3000/dashboard (login with admin/admin123)
- Manually test hover effects on user cards:
  - Verify shadow elevation increases on hover
  - Verify cards scale up subtly on hover
  - Verify background color changes on hover
  - Verify transitions are smooth and performant
  - Test on different viewport sizes (resize browser window)
  - Verify no layout shifts occur on hover
- Stop the development server

### 10. Run Validation Commands
- Execute all validation commands listed in the "Validation Commands" section below
- Ensure zero regressions across the entire application
- Fix any issues that arise during validation

## Testing Strategy
### Unit Tests
No new unit tests are required for this feature, as hover effects are visual CSS changes. The existing Next.js component structure and TypeScript type checking provide sufficient coverage for the code changes.

### E2E Tests
Create a comprehensive E2E test file (`.claude/commands/e2e/test_hover_effect_cards.md`) that validates:

1. **Visual Hover Effects**: Verify shadow, scale, and background color changes appear on hover using Playwright's hover action and screenshot comparison
2. **Smooth Transitions**: Confirm animations are smooth and use the correct duration (200-300ms)
3. **Multi-Viewport Testing**: Test hover effects on desktop (1920x1080), tablet (768x1024), and mobile (375x667) viewports
4. **Accessibility Compliance**: Validate that `prefers-reduced-motion` preference is respected by testing with and without the media query
5. **No Layout Shifts**: Ensure hover effects don't cause unexpected layout changes, overflow, or content shifting
6. **Consistency**: Verify all 25 user cards have identical hover effects
7. **Focus States**: Ensure keyboard focus states remain intact and visible alongside hover effects
8. **Email Link Isolation**: Confirm email link hover states aren't affected by card hover effects

### Edge Cases
- **Touch Devices**: Hover effects should not cause stuck states on touch devices (mobile/tablet). Test by simulating touch interactions in mobile viewport.
- **Rapid Hover Events**: Rapidly moving the mouse over multiple cards should not cause performance issues or janky animations.
- **Cards with Missing Data**: Cards that lack certain fields (e.g., missing location) should still display hover effects correctly.
- **Long Content**: Cards with long user names, emails, or departments should maintain hover effects without text overflow or layout breaks.
- **Browser Zoom Levels**: Test hover effects at different browser zoom levels (50%, 100%, 150%, 200%) to ensure scaling works correctly.
- **Reduced Motion Preference**: Users with `prefers-reduced-motion: reduce` should see no animations or instant state changes.
- **Clickable vs Non-Clickable**: Cards with and without `onClick` handlers should have identical hover effects (focus states differ).
- **Email Link Hover**: Hovering over the email link within a card should show email link hover styles (indigo-800, underline) without conflicting with card hover effects.

## Acceptance Criteria
- ✅ User cards display enhanced shadow elevation on hover (shadow-2xl or improved from current shadow-lg)
- ✅ User cards scale up subtly on hover (approximately 2% scale increase)
- ✅ User cards show background color change on hover (subtle shift to gray-50 or similar)
- ✅ Optional: User cards show border accent on hover (indigo-500 border)
- ✅ Hover transitions are smooth with 200-300ms duration using ease-in-out timing
- ✅ Hover effects are consistent across all user cards on the dashboard
- ✅ Hover effects work correctly on all viewport sizes (mobile, tablet, desktop)
- ✅ Hover effects respect `prefers-reduced-motion` accessibility preference
- ✅ Hover effects do not cause layout shifts, content overflow, or grid disruption
- ✅ Hover effects do not interfere with email link hover states
- ✅ Hover effects do not interfere with keyboard focus states for clickable cards
- ✅ Hover effects perform smoothly without janky animations or frame drops
- ✅ TypeScript compiles without errors after changes
- ✅ Frontend build completes successfully without errors
- ✅ All existing E2E tests continue to pass (no regressions)
- ✅ New E2E test for hover effects passes successfully

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/nextjs && npx tsc --noEmit` - Verify TypeScript compilation succeeds with no errors
- `cd app/nextjs && npm run build` - Verify frontend build completes successfully
- Read `.claude/commands/test_e2e.md`, then read and execute the new E2E test file `.claude/commands/e2e/test_hover_effect_cards.md` to validate hover effects work correctly across all scenarios
- Optionally re-run existing UserCard E2E test: Read `.claude/commands/test_e2e.md`, then execute `.claude/commands/e2e/test_user_card_component.md` to ensure no regressions in card functionality

## Notes
- **Design Philosophy**: The hover effects should enhance the user experience without being distracting or overwhelming. Aim for subtle, professional animations that make the interface feel polished and modern.

- **Performance Considerations**: Use GPU-accelerated CSS properties (transform, opacity) for animations. Avoid animating properties that trigger layout recalculations (width, height, padding, margin).

- **Accessibility First**: Always respect `prefers-reduced-motion` settings. Some users find animations disorienting or have vestibular disorders that make motion effects uncomfortable.

- **Browser Compatibility**: The `scale-[1.02]` Tailwind utility uses CSS transform, which is widely supported. If targeting very old browsers, consider fallback strategies.

- **Touch Device Behavior**: On touch devices, hover states typically appear on tap/touch. Ensure this doesn't create a poor experience by testing on actual mobile devices or using browser dev tools.

- **Future Enhancements**: Consider adding more advanced effects in future iterations, such as:
  - Card content sliding animations on hover (avatar slight movement, etc.)
  - Gradient overlays or background transitions
  - Animated status badges or role indicators
  - Parallax effects for avatar images

- **Tailwind JIT Compiler**: The Next.js build uses Tailwind's JIT (Just-In-Time) compiler, which generates CSS on-demand. Arbitrary values like `scale-[1.02]` are fully supported.

- **Existing Hover State**: The current implementation already has `hover:shadow-lg transition-shadow`, which is a good foundation. This feature extends that to create a more comprehensive hover experience.

- **No External Dependencies**: This feature uses only Tailwind CSS utility classes and standard CSS, requiring no additional npm packages or libraries.
