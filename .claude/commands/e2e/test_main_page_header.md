# E2E Test: Main Page Header

Test that the main page header displays correctly with the title "Natural Language Example".

## User Story

As a user visiting the application
I want to see a clear header with the title "Natural Language Example"
So that I immediately understand what the application is about

## Test Steps

1. Navigate to the `Application URL`
2. Take a screenshot of the initial state showing the full page
3. **Verify** the header element exists with class "main-header"
4. **Verify** the header contains an h1 element with the text "Natural Language Example"
5. **Verify** the header is visible at the top of the page
6. Take a screenshot focused on the header section
7. **Verify** the header has gradient background styling (primary to secondary color)
8. **Verify** the main content heading below the header is an h2 element (not h1)
9. **Verify** the header text is white colored
10. Take a final screenshot showing the complete page layout

## Success Criteria
- Header element with class "main-header" is present
- Header contains h1 with exact text "Natural Language Example"
- Header is positioned at the top of the page
- Header has proper gradient styling
- Main content uses h2 for its heading (proper semantic hierarchy)
- Header is responsive on mobile devices
- 3 screenshots are taken showing header visibility and layout
