# Feature: Reusable UserCard Component

## Metadata
issue_number: `6`
adw_id: `216fce1d`
issue_json: `{"number":6,"title":"Create reusable UserCard component","body":"# Issue #6: User Profile Card Component\n\n**Title:** Create reusable UserCard component\n\n**Labels:** feature, component\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nBuild a reusable card component to display individual user profiles with consistent styling.\n\n## Requirements\n\n- Create component at `/components/UserCard.tsx`\n- Accept user object as prop\n- Display user information:\n  - Avatar with fallback\n  - Name (bold, larger text)\n  - Role and department\n  - Email (with mailto link)\n  - Location\n  - Status badge with color coding:\n    - Green for active\n    - Gray for inactive\n- Hover effects for better UX\n- Click to view more details (optional modal)\n- Responsive design\n- Accessible (semantic HTML, ARIA labels)\n\n## Acceptance Criteria\n\n- Component is reusable and well-structured\n- All user information displays correctly\n- Status badges have appropriate colors\n- Hover effects work smoothly\n- Component is accessible\n- TypeScript props are properly typed"}`

## Feature Description
Build a comprehensive, reusable UserCard component that displays individual user profile information in a visually appealing card format. The component will accept a user object as a prop and display the user's avatar (with fallback for missing images), name in bold/larger text, role and department, email as a clickable mailto link, location, and a status badge with color coding (green for active, gray for inactive). The card will include smooth hover effects for better UX, be fully responsive across all screen sizes, and follow accessibility best practices with semantic HTML and ARIA labels. The component will also support an optional click handler to view more user details (e.g., opening a modal). This component is designed to be reused throughout the Next.js application wherever user profile information needs to be displayed.

## User Story
As a developer building user-facing features
I want a reusable, accessible UserCard component
So that I can consistently display user profile information across different pages and features without duplicating code

## Problem Statement
The existing UserCard component (`app/nextjs/components/UserCard.tsx`) displays basic user information (avatar, name, status, role, department, and email) but is missing several key features requested in the requirements: location display, fallback handling for missing avatars, click-to-view-details functionality, enhanced accessibility with ARIA labels, and potentially improved responsive design. The current implementation serves the dashboard well but needs enhancement to be truly reusable across different contexts in the application. Additionally, the component should be more flexible and feature-complete to support future use cases beyond the dashboard.

## Solution Statement
Enhance the existing UserCard component to include all requested features while maintaining backward compatibility with the current dashboard implementation. Add location display to show where the user is based, implement proper avatar fallback handling for cases where images fail to load, add an optional onClick handler for viewing detailed user information (modal or navigation), improve accessibility by adding comprehensive ARIA labels and semantic HTML attributes, and ensure the component is fully responsive with optimized layouts for mobile, tablet, and desktop views. The enhanced component will maintain the existing visual design language (Tailwind CSS styling, hover effects, status badge colors) while extending functionality to make it a truly reusable building block throughout the application.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/components/UserCard.tsx` - Current UserCard component implementation that displays avatar, name, status, role, department, and email. Needs enhancement to add location, avatar fallback, click handler, and improved accessibility.
- `app/nextjs/types/index.ts` - TypeScript type definitions including the complete User interface with all fields (id, name, email, username, role, avatar, department, location, bio, joinDate, status). Used for proper component typing.
- `app/nextjs/lib/mockDb.ts` - Mock user database containing 25 user profiles with location data. Used for testing the component with realistic data.
- `app/nextjs/app/dashboard/page.tsx` - Dashboard page that currently uses the UserCard component. Will be used to verify backward compatibility and test the enhanced component.
- `app/nextjs/tailwind.config.ts` - Tailwind CSS configuration. Used for styling the component with consistent design tokens.
- `app/nextjs/components/README.md` - Component documentation and best practices guide. Should be referenced to ensure the enhanced component follows established patterns.
- `app/nextjs/next.config.js` - Next.js configuration that includes remote image domain settings for UI Avatars. May need updates if avatar fallback requires additional image sources.
- `.claude/commands/conditional_docs.md` - Documentation guide for checking additional docs needed. Feature matches Next.js component development conditions.
- `.claude/commands/test_e2e.md` - E2E test runner documentation for understanding how to create E2E test specifications.
- `.claude/commands/e2e/test_dashboard_user_cards.md` - Existing E2E test for dashboard that validates UserCard rendering. Will be used as reference for creating the component-specific E2E test.

### New Files

- `.claude/commands/e2e/test_user_card_component.md` - E2E test specification that validates the enhanced UserCard component functionality including location display, avatar fallback handling, click interactions, accessibility features, hover effects, and responsive design across different viewport sizes.

## Implementation Plan

### Phase 1: Foundation
Review the existing UserCard component implementation to understand the current structure, styling patterns, and how it's being used in the dashboard. Analyze the User type interface to identify all available fields and determine which ones need to be added to the display. Study the current accessibility implementation and identify gaps that need to be addressed. Research Next.js Image component best practices for implementing proper avatar fallback handling. This foundational analysis ensures the enhancements are built on a solid understanding of the existing implementation and maintain consistency with the codebase.

### Phase 2: Core Implementation
Enhance the UserCard component by adding the location field display, implementing avatar fallback using the Next.js Image component's onError handler or fallback prop, adding an optional onClick prop for click-to-view-details functionality, improving accessibility with comprehensive ARIA labels (aria-label, aria-describedby, role attributes), ensuring semantic HTML structure, and optimizing the responsive layout for all screen sizes. Update the TypeScript interface for the component props to include the new optional onClick handler. Maintain the existing visual design and Tailwind CSS styling while seamlessly integrating the new features. Ensure all changes are backward compatible with the current dashboard implementation.

### Phase 3: Integration
Test the enhanced UserCard component in the existing dashboard context to verify backward compatibility and ensure no regressions. Validate that location information displays correctly for all 25 mock users, avatar fallback works when images fail to load, hover effects remain smooth and visually appealing, status badges maintain correct color coding, email mailto links function properly, and the component is fully accessible with screen readers. Create a comprehensive E2E test specification that validates all new and existing functionality. Update the components README if needed to document the new features and usage patterns for other developers.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Analyze Current UserCard Implementation
- Read the existing `app/nextjs/components/UserCard.tsx` to understand the current structure
- Review the User type interface in `app/nextjs/types/index.ts` to identify all available fields
- Check how the UserCard is currently used in `app/nextjs/app/dashboard/page.tsx`
- Document what's already implemented and what needs to be added (location, fallback, onClick, ARIA labels)

### 2. Enhance UserCard Props Interface
- Update the TypeScript props interface to add optional onClick handler: `onClick?: (user: User) => void`
- Add proper JSDoc comments to document the props, especially the new onClick handler
- Ensure the user prop remains required and properly typed as User from @/types
- Consider adding an optional className prop for additional styling flexibility if needed

### 3. Add Location Display
- Add location display to the component's information section
- Place location near role and department with similar styling (text-sm, text-gray-600)
- Use a consistent label format: "Location:" followed by the location value
- Ensure proper spacing between location and other fields using Tailwind's space-y utilities

### 4. Implement Avatar Fallback Handling
- Add error handling to the Next.js Image component for avatar loading failures
- Implement onError callback to show a fallback UI (user initials or generic avatar icon)
- Consider using a state variable to track image load failure
- Fallback should display user's initials in a colored circle matching the app design
- Ensure fallback UI has the same dimensions as the avatar (w-16 h-16)

### 5. Add Click-to-View-Details Functionality
- Wrap the card content in a clickable container if onClick prop is provided
- Add cursor-pointer class when onClick is present
- Add keyboard accessibility: make the card focusable with tabIndex={0} when clickable
- Implement onKeyPress handler to support Enter/Space key activation when clickable
- Add visual feedback for focus state (focus:ring-2 focus:ring-indigo-500)
- Ensure the onClick doesn't interfere with the email mailto link (stop propagation on email click)

### 6. Enhance Accessibility with ARIA Labels
- Add role="article" to the card container for semantic structure
- Add aria-label to the card with user name: `aria-label="User profile card for ${user.name}"`
- Add aria-label to the avatar image: `aria-label="${user.name}'s profile picture"`
- Add aria-label to the status badge: `aria-label="Status: ${user.status}"`
- Add aria-label to the email link: `aria-label="Send email to ${user.name}"`
- Ensure all interactive elements are keyboard accessible and screen reader friendly
- Consider adding aria-describedby to link the card to its content sections if complex

### 7. Optimize Responsive Design
- Review current responsive layout and ensure it works well on mobile (320px+), tablet (768px+), and desktop (1024px+)
- Adjust padding and spacing for smaller screens if needed (reduce p-6 to p-4 on mobile)
- Ensure text doesn't overflow on narrow viewports (use truncate or wrap appropriately)
- Test hover effects work on touch devices (consider adding active states)
- Verify status badge and avatar scale appropriately on all screen sizes

### 8. Test Component with Mock Data
- Open the dashboard at `http://localhost:3000/dashboard` in a browser
- Verify location displays for all 25 user cards
- Test avatar fallback by temporarily breaking an avatar URL
- Test hover effects on desktop and touch interactions on mobile
- Verify status badge colors (green for active, gray for inactive)
- Test email mailto links open correctly
- Test keyboard navigation and screen reader compatibility
- Verify responsive layout at different viewport sizes (mobile, tablet, desktop)

### 9. Create E2E Test Specification
- Create `.claude/commands/e2e/test_user_card_component.md` based on test_dashboard_user_cards.md structure
- Include test steps for verifying location display on cards
- Add test steps for avatar fallback functionality (simulate image load failure)
- Add test steps for click-to-view-details functionality (if onClick is provided)
- Include accessibility validation steps (ARIA labels, keyboard navigation, screen reader compatibility)
- Add test steps for hover effects and responsive design at different viewports
- Include test steps for status badge color validation (green/gray)
- Add test steps for email mailto link functionality
- Specify screenshot capture at key validation points

### 10. Update Dashboard to Test Click Functionality (Optional)
- Optionally add an onClick handler in the dashboard page to demonstrate the click-to-view-details feature
- Could implement a simple modal or console.log to show the feature works
- This step is optional but demonstrates the new functionality for testing purposes
- If implemented, include in the E2E test validation

### 11. Validate TypeScript Compilation
- Run `cd app/nextjs && npx tsc --noEmit` to ensure no TypeScript errors
- Fix any type errors that arise from the changes
- Ensure all props are properly typed and JSDoc comments are complete
- Verify the component exports correctly and can be imported without issues

### 12. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any errors that arise from linting, type checking, or build process
- Verify the dashboard still renders correctly with the enhanced UserCard
- Ensure all 25 user cards display properly with the new location field

## Testing Strategy

### Unit Tests
While this feature focuses on component enhancement and E2E testing, consider these unit test scenarios for future implementation:
- Test that UserCard renders with all required user fields
- Test that location displays correctly when provided
- Test that avatar fallback renders when image fails to load
- Test that onClick handler is called when card is clicked (if provided)
- Test that email link has correct mailto: href
- Test that status badge applies correct color classes based on status
- Test that component doesn't crash with missing optional fields
- Test that keyboard events trigger onClick handler when provided
- Test that ARIA labels are applied correctly to all elements

### Edge Cases
- User with no location (should handle gracefully, don't show location field or show "N/A")
- Avatar URL fails to load (fallback should display user initials)
- Very long user names (should truncate or wrap without breaking layout)
- Email addresses without @ symbol (should still create valid mailto link)
- User with inactive status (should show gray badge)
- Clicking email link when onClick handler is present (should not trigger onClick, only open email)
- Keyboard navigation with Enter/Space keys when onClick is provided
- Screen reader navigation through card content
- Touch interactions on mobile devices (hover effects should not interfere)
- Multiple cards on page with different states (active/inactive)

## Acceptance Criteria
- Enhanced UserCard component displays all user information: avatar, name, role, department, email, location, and status badge
- Location field is visible and displays correctly for all users in the dashboard
- Avatar fallback mechanism works when images fail to load (displays user initials or generic icon)
- Optional onClick handler enables click-to-view-details functionality without breaking existing dashboard usage
- Comprehensive ARIA labels are present on all elements (card, avatar, status badge, email link)
- Component uses semantic HTML with proper role attributes
- Hover effects work smoothly with visual shadow transition
- Status badges display correct colors: green for active users, gray for inactive users
- Email mailto links function correctly and open email client
- Component is fully responsive across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports
- Keyboard navigation works correctly when card is clickable (Tab, Enter, Space keys)
- Screen reader announces card content clearly and logically
- TypeScript compilation succeeds with no errors
- No regressions in dashboard page rendering or functionality
- E2E test specification covers all new and existing functionality
- Component maintains backward compatibility with current dashboard implementation

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute your new E2E `.claude/commands/e2e/test_user_card_component.md` test file to validate this functionality works.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation to validate types are correct with zero errors
- `cd app/nextjs && npm run lint` - Run ESLint to ensure code quality standards are met
- `cd app/nextjs && npm run build` - Run production build to validate the component works in production mode with zero errors

## Notes

### Design Decisions
- **Location Placement**: Location is displayed in the information section alongside role and department, maintaining a consistent field layout
- **Avatar Fallback**: Uses user initials in a colored circle as fallback, providing a visually consistent experience when images fail
- **Optional Click Handler**: Made optional to maintain backward compatibility; only adds click behavior when explicitly provided
- **ARIA Labels**: Comprehensive labels ensure screen readers announce card content clearly and provide context for all interactive elements
- **Email Link Protection**: Email click events stop propagation to prevent triggering card onClick when clicking email
- **Semantic HTML**: Uses role="article" and proper structure to convey card semantics to assistive technologies

### Integration Points
- Integrates seamlessly with existing dashboard implementation in `app/nextjs/app/dashboard/page.tsx`
- Uses User type interface from `app/nextjs/types/index.ts` for type safety
- Follows component patterns and best practices documented in `app/nextjs/components/README.md`
- Works with Next.js Image component and remote image configuration in `next.config.js`
- Can be reused in future features like user detail pages, search results, team directories, admin panels

### Performance Considerations
- Next.js Image component handles automatic image optimization
- Avatar fallback prevents broken image icons from displaying
- Hover effects use CSS transitions for smooth performance
- Component is lightweight with no external dependencies beyond React and Next.js
- Responsive design uses Tailwind's mobile-first approach for optimal rendering

### Accessibility Highlights
- Full keyboard navigation support when card is clickable
- Comprehensive ARIA labels provide context for screen readers
- Semantic HTML structure improves navigation for assistive technologies
- Color contrast meets WCAG standards for status badges and text
- Focus indicators clearly show keyboard navigation state
- Email link is clearly identified as a link for screen readers

### Future Enhancements
- Add animation when card is added/removed from DOM
- Support different card sizes (compact, default, expanded)
- Add a "favorite" or "bookmark" button to cards
- Include social media links or contact buttons
- Add user presence indicator (online/offline/away)
- Support custom avatar upload and management
- Add skeleton loading state for cards while data loads
- Implement virtualization for large lists of cards
- Add card selection mode for bulk operations
- Support card drag-and-drop for reordering or organizing
