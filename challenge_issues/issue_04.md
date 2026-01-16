# Issue #4: Mock Backend API Service

**Title:** Implement mock backend API service for user profiles

**Labels:** feature, backend

**Workflow:** adw_sdlc_iso

---

## Description

Create a mock backend API service that simulates database queries and returns user profile data.

## Requirements

- Create API service in `/lib/api.ts`
- Implement the following functions:
  - `getAllUsers()` - Returns all user profiles
  - `getUserById(id)` - Returns specific user by ID
  - `searchUsers(query)` - Filters users by name, email, or role
  - `getUsersByDepartment(department)` - Filters by department
- Add simulated API delay (500-1000ms) to mimic real API behavior
- Handle errors gracefully
- Return data in consistent format
- TypeScript support for all functions
- Optional: Add pagination support

## API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

## Acceptance Criteria

- All API functions work correctly
- Simulated delays make it feel like real API
- Error handling is implemented
- TypeScript types are properly defined
- Functions can be imported and used in components
