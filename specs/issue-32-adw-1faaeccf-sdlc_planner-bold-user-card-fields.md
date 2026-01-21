# Feature: Make role, department, and location bold in user cards

## Metadata
issue_number: `32`
adw_id: `1faaeccf`
issue_json: `{"number":32,"title":"Make role, department, and location bold in user cards","body":"Improve visual hierarchy in user profile cards by making key information fields stand out.\n\n**Description:**\nIn the dashboard user profile cards, the role, department, and location fields should be displayed in bold font weight to make them more prominent and easier to scan.\n\n**Acceptance Criteria:**\n- Role field is displayed in bold\n- Department field is displayed in bold\n- Location field is displayed in bold\n- Bold styling is consistent across all user cards\n- Text remains readable and maintains good contrast\n- Styling works on all screen sizes\n\n**Affected Component:**\n- `components/UserCard.tsx` or similar component that displays user information\n\n**Technical Notes:**\n- Apply `font-weight: bold` or Tailwind class `font-bold` to these specific fields\n- Ensure the change doesn't break the card layout"}`

## Feature Description
Enhance the visual hierarchy in the UserCard component by making the role, department, and location field values bold. This improvement will make key information fields stand out more prominently, making it easier for users to quickly scan and identify important user attributes on the dashboard. Currently, all text fields have the same font weight, which makes it harder to distinguish between labels and critical information.

## User Story
As a user viewing the team directory dashboard
I want the role, department, and location information to be displayed in bold
So that I can quickly scan and identify key user attributes without having to read every detail on each card

## Problem Statement
The current UserCard component displays all user information with uniform font weight (text-gray-600 for labels, same weight for values). This creates a flat visual hierarchy where important information like role, department, and location doesn't stand out sufficiently. Users have to carefully read each card to identify these key attributes, reducing scanning efficiency and overall user experience when browsing multiple user cards on the dashboard.

## Solution Statement
Apply bold font weight (font-bold Tailwind class) to the text content of the role, department, and location fields in the UserCard component. This change will be implemented by wrapping the field values in a span element with the font-bold class, while keeping the labels at their current font weight. This creates a clear visual distinction that improves scannability without compromising readability or breaking the existing card layout. The solution maintains all existing functionality, accessibility features, and responsive design while enhancing visual hierarchy.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/components/UserCard.tsx` - The UserCard component that displays user profile information. This is the primary file that needs to be modified to add bold styling to role, department, and location field values (lines 115-124).
- `app/nextjs/types/index.ts` - Contains the User interface definition to understand the data structure (lines 5-17).
- `app_docs/feature-216fce1d-user-card-component.md` - Documentation for the UserCard component to understand existing features and implementation details.
- `.claude/commands/test_e2e.md` - E2E test runner instructions for understanding how to create and execute E2E tests.
- `.claude/commands/e2e/test_user_card_component.md` - Existing E2E test for UserCard component to understand testing patterns and structure.

### New Files
- `.claude/commands/e2e/test_bold_user_card_fields.md` - New E2E test specification to validate that role, department, and location fields are displayed in bold across all user cards and screen sizes.

## Implementation Plan
### Phase 1: Foundation
Review the existing UserCard component implementation to understand the current styling structure for role, department, and location fields. Identify the exact lines of code where these fields are rendered and determine the best approach to apply bold styling without disrupting the existing layout, accessibility features, or responsive behavior.

### Phase 2: Core Implementation
Modify the UserCard component to wrap the role, department, and location field values in span elements with the font-bold Tailwind class. This will create a visual distinction between the labels (which remain at normal weight) and the values (which become bold). Ensure that the bold text maintains proper contrast ratios for accessibility and doesn't break the text wrapping behavior for long values.

### Phase 3: Integration
Test the updated UserCard component on the dashboard page to verify that all 25 user cards display bold role, department, and location fields consistently. Validate that the styling works correctly across desktop, tablet, and mobile viewport sizes. Ensure that the change doesn't affect any other component functionality such as click handlers, keyboard navigation, or screen reader compatibility.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Review Existing UserCard Implementation
- Read the UserCard component at `app/nextjs/components/UserCard.tsx` to understand current implementation
- Identify lines 115-124 where role, department, and location fields are rendered
- Review the current styling classes used for these fields (text-sm, text-gray-600)
- Confirm the structure: labels use font-medium text-gray-700, values use text-gray-600

### Step 2: Create E2E Test Specification
- Create a new E2E test file at `.claude/commands/e2e/test_bold_user_card_fields.md`
- Base the test structure on existing E2E tests like `test_user_card_component.md`
- Include test steps to verify:
  - Role field value is displayed in bold (font-bold class applied)
  - Department field value is displayed in bold (font-bold class applied)
  - Location field value is displayed in bold (font-bold class applied)
  - Bold styling is consistent across all 25 user cards
  - Text remains readable with good contrast
  - Bold styling works on desktop (1920x1080), tablet (768x1024), and mobile (375x667) viewports
  - Long role/department/location values still wrap properly with bold styling
  - Screen readers still announce the content correctly
  - Card layout is not broken by the bold text
- Include screenshots at each viewport size showing bold fields
- Specify success criteria that all three fields must be bold on all cards

### Step 3: Modify UserCard Component Styling
- Edit `app/nextjs/components/UserCard.tsx` at lines 115-124
- For the role field (line 116), wrap `{user.role}` in a span with font-bold class
- For the department field (line 119), wrap `{user.department}` in a span with font-bold class
- For the location field (line 123), wrap `{user.location}` in a span with font-bold class
- Ensure the span elements are inline and don't disrupt the existing text flow
- Example pattern: `<span className="font-bold">{user.role}</span>`
- Verify that labels (Role:, Department:, Location:) remain at font-medium weight

### Step 4: Validate TypeScript Compilation
- Navigate to `app/nextjs` directory
- Run `npx tsc --noEmit` to ensure TypeScript compiles without errors
- Confirm no type errors introduced by the span wrapper changes
- Fix any TypeScript issues if they arise

### Step 5: Test in Development Environment
- Start the Next.js development server: `cd app/nextjs && npm run dev`
- Navigate to http://localhost:3000/dashboard
- Login with mock credentials (admin/admin123)
- Visually inspect user cards to verify role, department, and location values appear bold
- Check that labels remain at normal font weight
- Scroll through all 25 user cards to ensure consistency
- Verify text contrast and readability

### Step 6: Test Responsive Behavior
- Test desktop viewport (1920x1080): Verify bold fields display correctly in multi-column grid
- Test tablet viewport (768x1024): Verify bold fields display correctly in 2-column layout
- Test mobile viewport (375x667): Verify bold fields display correctly in single column with adjusted padding
- Ensure bold text doesn't cause layout overflow or wrapping issues
- Confirm hover effects still work smoothly with bold text

### Step 7: Test Long Field Values
- Identify or create test scenarios with long role, department, or location values
- Verify that bold text wraps properly without breaking the card layout
- Ensure break-words and break-all classes still function correctly
- Confirm no horizontal scrolling occurs on mobile devices

### Step 8: Test Accessibility Features
- Use browser accessibility inspector to verify ARIA labels are unchanged
- Test with screen reader to ensure bold text is announced correctly
- Verify keyboard navigation still works (Tab, Enter, Space)
- Confirm focus indicators are not affected by bold text
- Check that text contrast ratios still meet WCAG standards with bold weight

### Step 9: Test Click and Email Functionality
- Click on user cards to verify navigation to user details page still works
- Click on email links to verify mailto functionality still works
- Confirm email click event isolation (stopPropagation) is not affected
- Test keyboard activation of cards (Enter/Space keys)

### Step 10: Run Validation Commands
- Execute all validation commands specified in the "Validation Commands" section
- Run TypeScript compilation check: `cd app/nextjs && npx tsc --noEmit`
- Run frontend build: `cd app/nextjs && npm run build`
- Read `.claude/commands/test_e2e.md` to understand E2E test execution
- Read and execute the new E2E test: `.claude/commands/e2e/test_bold_user_card_fields.md`
- Verify all tests pass with zero errors
- Confirm production build succeeds

## Testing Strategy
### Unit Tests
- Visual inspection: Verify that role, department, and location values have font-bold class applied in the DOM
- Class verification: Use browser DevTools to inspect elements and confirm font-bold is present on field values only, not labels
- Consistency check: Verify all 25 user cards on the dashboard have consistent bold styling
- Responsive testing: Verify bold styling renders correctly at desktop, tablet, and mobile viewport sizes
- Text wrapping: Test with long field values to ensure bold text wraps properly without breaking layout

### Edge Cases
- Very long role names (e.g., "Senior Vice President of Engineering and Product Development"): Verify text wraps with bold styling
- Very long department names (e.g., "Global Customer Success and Support Operations"): Verify no layout overflow
- Very long location names (e.g., "San Francisco, California, United States"): Verify proper wrapping on mobile
- Cards with missing location data: Verify conditional rendering still works correctly
- Cards in different states (active vs inactive): Verify bold styling consistent across status types
- High zoom levels (200%): Verify bold text remains readable and doesn't cause layout issues
- Low vision mode / Windows high contrast: Verify bold text maintains sufficient contrast

## Acceptance Criteria
- Role field value is displayed in bold font weight using font-bold Tailwind class
- Department field value is displayed in bold font weight using font-bold Tailwind class
- Location field value is displayed in bold font weight using font-bold Tailwind class
- Labels ("Role:", "Department:", "Location:") remain at normal font-medium weight
- Bold styling is consistent across all 25 user cards on the dashboard
- Text remains readable with good contrast ratios (WCAG AA compliant)
- Styling works correctly on all screen sizes (desktop, tablet, mobile)
- Long field values wrap properly without breaking card layout
- Bold text doesn't cause horizontal scrolling on mobile devices
- TypeScript compilation succeeds without errors
- Frontend build completes successfully
- All existing functionality preserved (click handlers, keyboard navigation, accessibility)
- E2E test passes validating bold fields across all viewport sizes
- No console errors or warnings introduced
- Screen readers announce bold text correctly without issues
- Card hover effects still work smoothly

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation check to validate no type errors
- `cd app/nextjs && npm run build` - Run frontend build to validate production build succeeds
- Read `.claude/commands/test_e2e.md` to understand how to execute E2E tests
- Read `.claude/commands/e2e/test_bold_user_card_fields.md` and execute the E2E test to validate bold fields display correctly across all user cards and viewport sizes
- Manually navigate to http://localhost:3000/dashboard and visually inspect at least 5 user cards to verify bold styling on role, department, and location fields
- Test responsive behavior by resizing browser to mobile (375px), tablet (768px), and desktop (1920px) widths
- Use browser DevTools inspect element to verify font-bold class is applied to field values, not labels

## Notes
- This is a purely visual enhancement that improves user experience through better visual hierarchy
- The change should have zero impact on component functionality, accessibility, or performance
- Only the field values should be bold; the labels should remain at their current font-medium weight
- The existing text-gray-600 color class should remain on the field values; we're only adding font-bold
- Consider using an inline span wrapper: `<span className="font-bold">{user.role}</span>`
- This pattern maintains backward compatibility and doesn't require changes to the User type or API
- Future consideration: If this pattern is successful, consider applying similar bold styling to other key fields in detail views or other components
- The bold styling should be subtle enough to improve hierarchy without overwhelming the card design
- Tailwind's font-bold class applies font-weight: 700, which provides clear visual distinction without being too heavy
- No additional dependencies or libraries are needed for this change
