# Mock Backend API Service

**ADW ID:** 287fdce1
**Date:** 2026-01-16
**Specification:** specs/issue-4-adw-287fdce1-sdlc_planner-mock-backend-api.md

## Overview

A comprehensive mock backend API service that wraps the existing mock user database with production-like API patterns. The service provides simulated network delays (500-1000ms), consistent response formatting with success/error states, comprehensive error handling, and advanced query capabilities including search and pagination. This abstraction layer enables developers to build and test frontend components with realistic API interactions without requiring a real backend server.

## What Was Built

- **Core API Module** (`app/nextjs/lib/api.ts`): Four main API functions with simulated delays and error handling
- **getAllUsers()**: Paginated user listing with metadata (total users, pages, navigation flags)
- **getUserById()**: Individual user retrieval with validation
- **searchUsers()**: Multi-field search across name, email, and role with case-insensitive matching
- **getUsersByDepartment()**: Department-based filtering
- **E2E Test Suite**: Comprehensive validation test covering all API functions and edge cases
- **TypeScript Types**: Full type safety with `PaginationParams`, `SearchOptions`, and `PaginationMetadata` interfaces

## Technical Implementation

### Files Modified

- `app/nextjs/lib/api.ts`: New 294-line API service module implementing all functions with TypeScript, JSDoc documentation, utility functions for delay simulation and response formatting
- `.claude/commands/e2e/test_api_service.md`: New 540-line E2E test specification covering 20+ test scenarios including pagination, search, error handling, and performance validation
- `.claude/commands/test.md`: Updated to reference the new API service E2E test
- `.mcp.json`: Configuration update
- `playwright-mcp-config.json`: Configuration update
- `scripts/start.sh`: Script update
- `specs/issue-4-adw-287fdce1-sdlc_planner-mock-backend-api.md`: Feature specification (373 lines)

### Key Changes

- **Simulated Network Delays**: `simulateDelay()` utility function generates random delays between 500-1000ms to mimic real API latency, enabling proper testing of loading states
- **Consistent Response Format**: All functions return `ApiResponse<T>` objects with `success` boolean, `data` or `error` fields, and ISO `timestamp`
- **Pagination System**: Implemented with configurable page size (default 10), includes metadata like `totalPages`, `hasNextPage`, `hasPreviousPage` for UI navigation
- **Search Functionality**: Case-insensitive partial matching across three fields (name, email, role) with minimum 2-character query validation
- **Error Handling**: Input validation with descriptive error messages for missing parameters, invalid IDs, short queries, and invalid departments
- **TypeScript Integration**: Full type safety with exported interfaces for parameters and metadata, comprehensive JSDoc examples showing React component usage patterns

## How to Use

### Basic Usage Example

```typescript
import { getAllUsers, getUserById, searchUsers, getUsersByDepartment } from '@/lib/api'

// Get paginated users
const response = await getAllUsers({ page: 1, pageSize: 10 })
if (response.success) {
  console.log(response.data) // Array of 10 users
  console.log(response.totalPages) // 3
}

// Get specific user
const userResponse = await getUserById('usr_1a2b3c4d5e6f')
if (userResponse.success) {
  console.log(userResponse.data.name)
}

// Search users
const searchResponse = await searchUsers('sarah')
console.log(searchResponse.resultCount) // Number of matches

// Filter by department
const deptResponse = await getUsersByDepartment('Engineering')
console.log(deptResponse.data)
```

### React Component Integration

```typescript
import { useState, useEffect } from 'react'
import { getAllUsers } from '@/lib/api'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const response = await getAllUsers({ page: 1, pageSize: 10 })
      if (response.success) {
        setUsers(response.data)
      } else {
        setError(response.error)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

## Configuration

No environment variables or external configuration required. The API service is ready to use immediately after installation.

### Available Departments

The mock database includes users from these departments:
- Engineering
- Design
- Product
- Marketing
- Sales
- HR
- Operations
- Finance
- Customer Success
- Data & Analytics

### Pagination Defaults

- Default page: 1 (1-indexed)
- Default page size: 10 items
- Total users in mock database: 25

### Search Behavior

- Minimum query length: 2 characters
- Case-insensitive by default (configurable via `SearchOptions.caseSensitive`)
- Searches across: name, email, role fields
- Uses partial matching (substring search)

## Testing

### Run E2E Tests

```bash
# Read and execute the E2E test specification
cd /Users/cingolani/Documents/Patagonian/agentic/trees/287fdce1
# Follow instructions in .claude/commands/test_e2e.md
# Execute .claude/commands/e2e/test_api_service.md
```

### Manual Testing

```bash
# TypeScript compilation check
cd app/nextjs && npx tsc --noEmit

# Run linter
cd app/nextjs && npm run lint

# Build the project
cd app/nextjs && npm run build

# Test import and basic functionality
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers } from './lib/api.ts';
const response = await getAllUsers();
console.log('Success:', response.success, 'Users:', response.data.length);
"
```

### Test Coverage

The E2E test suite validates:
- All four API functions with various parameters
- Default and custom pagination
- Valid and invalid user IDs
- Search with different queries (name, email, role)
- All valid departments
- Error scenarios (missing params, invalid inputs)
- Response timing (500-1000ms delay verification)
- Response format consistency
- TypeScript compilation
- ESLint validation
- Production build

## Notes

### Migration Path to Real Backend

When integrating with a real backend API:
1. Replace function implementations with `fetch()` or HTTP client calls
2. Remove `simulateDelay()` calls (real network latency will apply)
3. Keep the same function signatures and `ApiResponse<T>` format
4. All consuming components remain unchanged
5. Consider using an environment variable to toggle between mock and real API

### Design Decisions

- **500-1000ms Delay Range**: Balances realistic API simulation with reasonable development speed, typical for optimized backend APIs
- **Pagination Default (10 items)**: Common API default that balances request count vs. data volume per request
- **Case-Insensitive Search**: Improves UX by matching common search engine behavior
- **Error Objects vs. Exceptions**: Returning error responses instead of throwing allows graceful UI error handling

### Performance Considerations

- Pagination prevents loading all 25 users at once
- Search operates on in-memory data (fast for 25 users, would need optimization at scale)
- Simulated delays don't block Node.js event loop (uses `setTimeout`)

### Future Enhancement Possibilities

- Add mutation operations (`createUser()`, `updateUser()`, `deleteUser()`)
- Implement sorting capabilities (by name, date, department)
- Add request debouncing for search
- Support for advanced filtering (multiple departments, date ranges)
- Add caching layer to simulate API caching behavior
- Implement mock authentication/authorization checks
- Add data persistence to localStorage for stateful testing

### Integration Points

This API service supports:
- User directory pages with pagination and search
- User profile detail views
- Department-based team dashboards
- Admin panels for user management
- Testing loading states and error boundaries
- Component stories in Storybook
- Integration testing with React Testing Library
