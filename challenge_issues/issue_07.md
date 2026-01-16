# Issue #7: Search and Filter Functionality

**Title:** Add search and filter capabilities to dashboard

**Labels:** feature, enhancement

**Workflow:** adw_sdlc_iso

---

## Description

Implement search and filtering features to help users find specific profiles quickly.

## Requirements

- Search bar component:
  - Real-time search as user types
  - Search by name, email, or role
  - Debounced to avoid excessive filtering
  - Clear button to reset search
- Department filter:
  - Dropdown with all available departments
  - "All Departments" option to show everyone
  - Updates results immediately
- Active filters indicator showing applied filters
- Results count display
- Combine search and filters (AND logic)
- Preserve filters in URL query params (optional)
- Loading state during filtering

## Acceptance Criteria

- Search filters results in real-time
- Department filter works correctly
- Multiple filters can be combined
- Clear/reset functionality works
- UI feedback shows active filters
- Performance is smooth even with many users
