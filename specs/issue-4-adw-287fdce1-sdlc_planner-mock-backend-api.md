# Feature: Mock Backend API Service for User Profiles

## Metadata
issue_number: `4`
adw_id: `287fdce1`
issue_json: `{"number":4,"title":"Implement mock backend API service for user profiles","body":"# Issue #4: Mock Backend API Service\n\n**Title:** Implement mock backend API service for user profiles\n\n**Labels:** feature, backend\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nCreate a mock backend API service that simulates database queries and returns user profile data.\n\n## Requirements\n\n- Create API service in `/lib/api.ts`\n- Implement the following functions:\n  - `getAllUsers()` - Returns all user profiles\n  - `getUserById(id)` - Returns specific user by ID\n  - `searchUsers(query)` - Filters users by name, email, or role\n  - `getUsersByDepartment(department)` - Filters by department\n- Add simulated API delay (500-1000ms) to mimic real API behavior\n- Handle errors gracefully\n- Return data in consistent format\n- TypeScript support for all functions\n- Optional: Add pagination support\n\n## API Response Format\n\n```typescript\ninterface ApiResponse<T> {\n  success: boolean;\n  data?: T;\n  error?: string;\n  timestamp: string;\n}\n```\n\n## Acceptance Criteria\n\n- All API functions work correctly\n- Simulated delays make it feel like real API\n- Error handling is implemented\n- TypeScript types are properly defined\n- Functions can be imported and used in components"}`

## Feature Description
This feature implements a comprehensive mock backend API service layer that sits on top of the existing mock user database. The API service simulates real-world backend behavior by adding realistic delays (500-1000ms), consistent response formatting with success/error states, comprehensive error handling, and advanced query capabilities including search and pagination. This abstraction layer provides a production-like development experience, making it easy to test loading states, error scenarios, and data fetching patterns before integrating with a real backend API.

## User Story
As a developer
I want a realistic mock backend API service with simulated delays and consistent response formatting
So that I can build and test frontend components with production-like API interactions, loading states, and error handling without requiring a real backend server

## Problem Statement
While the mock user database (`lib/mockDb.ts`) provides direct data access, frontend developers need a more realistic API layer that simulates actual backend behavior. Direct data access doesn't allow testing of:
- Asynchronous loading states and spinners
- Network delays and timeout handling
- API error scenarios and error boundaries
- Consistent response formatting across different endpoints
- Search and filtering capabilities with performance considerations
- Pagination logic for large datasets
- Real-world API patterns that will be used in production

Without this abstraction layer, components built during development may not properly handle the asynchronous nature of real API calls, leading to bugs and poor user experience when the real backend is integrated.

## Solution Statement
Create a comprehensive `lib/api.ts` module that wraps the mock database with an API-like interface. The solution provides:
1. **Simulated Network Delays**: Random delays between 500-1000ms to mimic real network latency
2. **Consistent Response Format**: All functions return standardized `ApiResponse<T>` objects with success/error states and timestamps
3. **Comprehensive Error Handling**: Graceful error handling with descriptive error messages for various failure scenarios
4. **Advanced Query Functions**:
   - `getAllUsers()` - Fetch all user profiles with optional pagination
   - `getUserById(id)` - Fetch specific user by ID with validation
   - `searchUsers(query)` - Full-text search across name, email, and role fields
   - `getUsersByDepartment(department)` - Department-based filtering
5. **TypeScript Type Safety**: Full TypeScript support with proper typing for all inputs and outputs
6. **Pagination Support**: Built-in pagination with configurable page size for performance testing
7. **Production-Ready Patterns**: Code structure that makes it easy to swap mock implementation with real API calls

This approach allows frontend developers to build production-quality components while working entirely in the frontend codebase.

## Relevant Files
Use these files to implement the feature:

### Existing Files
- `app/nextjs/types/index.ts` - Contains the `User` interface and `ApiResponse<T>` type that will be used for all API responses. The `ApiResponse` type is already defined and matches the requirements.
- `app/nextjs/lib/mockDb.ts` - Contains the mock user database with 25 user profiles and helper functions (`getUserById`, `getUsersByRole`, `getUsersByDepartment`, `getActiveUsers`, `getUsersByLocation`). The API service will consume this data source.
- `README.md` - Project overview and setup instructions, useful for understanding the Next.js application structure and development workflow.
- `.claude/commands/test_e2e.md` - E2E test runner instructions for executing and validating tests.
- `.claude/commands/e2e/test_mock_database.md` - Example E2E test file that validates the mock database structure, provides reference for creating the new E2E test.

### New Files
- `app/nextjs/lib/api.ts` - The main mock API service module that will implement all API functions with simulated delays, error handling, and consistent response formatting. This is the core deliverable.
- `.claude/commands/e2e/test_api_service.md` - E2E test specification to validate that all API functions work correctly with proper delays, error handling, search functionality, and pagination support.

## Implementation Plan
### Phase 1: Foundation
1. Create the `app/nextjs/lib/api.ts` file with TypeScript scaffolding
2. Import necessary dependencies: `User` type from `@/types`, mock database functions from `@/lib/mockDb`, and `ApiResponse<T>` type
3. Implement a utility function `simulateDelay()` that returns a Promise resolving after a random delay between 500-1000ms
4. Implement a utility function `createSuccessResponse<T>()` that wraps data in a standardized `ApiResponse<T>` format with `success: true`, the data, and current ISO timestamp
5. Implement a utility function `createErrorResponse()` that creates standardized error responses with `success: false`, error message, and timestamp

### Phase 2: Core Implementation
1. Implement `getAllUsers()` function:
   - Accept optional pagination parameters: `page` (default: 1) and `pageSize` (default: 10)
   - Add simulated delay using `simulateDelay()`
   - Fetch all users from mock database
   - Calculate pagination: total pages, start/end indices
   - Return paginated results in `ApiResponse` format with metadata (totalUsers, totalPages, currentPage, pageSize)

2. Implement `getUserById(id: string)` function:
   - Validate that `id` parameter is provided (non-empty string)
   - Add simulated delay
   - Call `getUserById()` from mock database
   - Handle not found scenario with error response
   - Return user in success response format

3. Implement `searchUsers(query: string)` function:
   - Validate that `query` parameter is provided and has minimum length (at least 2 characters)
   - Add simulated delay
   - Perform case-insensitive search across name, email, and role fields
   - Return matching users in success response format with result count metadata
   - Return error response if query is invalid

4. Implement `getUsersByDepartment(department: string)` function:
   - Validate that `department` parameter is provided
   - Add simulated delay
   - Call `getUsersByDepartment()` from mock database
   - Return filtered users in success response format
   - Return error response if department is invalid

5. Add comprehensive JSDoc comments to all functions documenting:
   - Function purpose and behavior
   - All parameters with types and descriptions
   - Return value structure with examples
   - Possible error scenarios

### Phase 3: Integration
1. Export all API functions as named exports for easy tree-shaking
2. Create inline documentation examples showing how to use the API in React components
3. Add TypeScript type exports for function parameters (e.g., `PaginationParams`, `SearchParams`)
4. Ensure all functions properly type their return values as `Promise<ApiResponse<T>>`

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Create the Mock API Service Module Foundation
- Create `app/nextjs/lib/api.ts` file
- Add TypeScript imports for `User`, `ApiResponse` from `@/types`
- Import mock database and helper functions from `@/lib/mockDb`
- Add comprehensive file-level JSDoc comment explaining the module's purpose
- Implement `simulateDelay()` utility function that returns a Promise with random delay between 500-1000ms
- Implement `createSuccessResponse<T>(data: T, metadata?: Record<string, any>)` utility function
- Implement `createErrorResponse(message: string)` utility function
- Add TypeScript interface for `PaginationParams` with optional `page` and `pageSize` properties
- Add unit tests for utility functions to verify delay ranges and response formatting

### Step 2: Implement getAllUsers Function with Pagination
- Implement `getAllUsers(params?: PaginationParams)` function signature with proper TypeScript typing
- Add input validation and default values (page: 1, pageSize: 10)
- Add simulated delay using `simulateDelay()`
- Fetch all users from `mockUsers` array
- Implement pagination logic: calculate `totalPages`, `startIndex`, `endIndex`
- Slice the users array based on pagination parameters
- Return paginated results in `ApiResponse` format with metadata (totalUsers, totalPages, currentPage, pageSize, hasNextPage, hasPreviousPage)
- Add comprehensive JSDoc with usage example
- Add unit tests verifying pagination logic, metadata accuracy, and edge cases (page out of bounds, negative page numbers)

### Step 3: Implement getUserById Function with Validation
- Implement `getUserById(id: string)` function signature
- Add input validation: check if `id` is provided and non-empty
- Return error response immediately if validation fails
- Add simulated delay using `simulateDelay()`
- Call `getUserById()` from mock database
- Check if user was found
- Return error response with "User not found" message if user doesn't exist
- Return success response with user data if found
- Add comprehensive JSDoc with usage example
- Add unit tests for: valid ID, invalid ID, empty string, non-existent ID, all 25 existing user IDs

### Step 4: Implement searchUsers Function with Multi-field Search
- Implement `searchUsers(query: string, options?: { caseSensitive?: boolean })` function signature
- Add input validation: check if query is provided and has minimum length (2 characters)
- Return error response if validation fails with helpful message
- Add simulated delay using `simulateDelay()`
- Convert query to lowercase for case-insensitive search (unless `caseSensitive` option is true)
- Filter users where query matches name, email, or role (using `.includes()` for partial matching)
- Return success response with matching users and result count in metadata
- Add comprehensive JSDoc with usage examples for different search scenarios
- Add unit tests for: name search, email search, role search, partial matches, case sensitivity, minimum length validation, special characters, no results found

### Step 5: Implement getUsersByDepartment Function with Validation
- Implement `getUsersByDepartment(department: string)` function signature
- Add input validation: check if department parameter is provided and non-empty
- Return error response if validation fails
- Add simulated delay using `simulateDelay()`
- Call `getUsersByDepartment()` from mock database
- Return success response with filtered users and count in metadata
- Add comprehensive JSDoc with usage example showing available departments
- Add unit tests for: all existing departments (Engineering, Design, Product, Marketing, Sales, HR, Operations, Finance, Customer Success, Data & Analytics), invalid department, empty string, case sensitivity

### Step 6: Add TypeScript Type Definitions and Documentation
- Create `SearchOptions` interface with optional `caseSensitive` boolean property
- Create `PaginationMetadata` interface defining the metadata structure returned with paginated results
- Add inline code examples in JSDoc showing React component usage patterns (with useState, useEffect)
- Add module-level JSDoc comment with overview of all available functions
- Export all interfaces and types for external use
- Verify all functions have complete TypeScript typing with no `any` types
- Run TypeScript compilation check: `cd app/nextjs && npx tsc --noEmit`

### Step 7: Create E2E Test Specification
- Read `.claude/commands/test_e2e.md` to understand E2E test structure and format
- Read `.claude/commands/e2e/test_mock_database.md` as reference for test file structure
- Create `.claude/commands/e2e/test_api_service.md` with comprehensive test steps:
  - Test metadata (test name, ID, application URL, purpose)
  - User story describing the API service validation goals
  - Prerequisites section listing dependencies and setup requirements
  - Test steps covering:
    1. TypeScript compilation check
    2. Import validation for all API functions
    3. Test `getAllUsers()` with default pagination
    4. Test `getAllUsers()` with custom pagination parameters (page 2, pageSize 5)
    5. Test `getAllUsers()` pagination metadata accuracy
    6. Test `getUserById()` with valid user ID
    7. Test `getUserById()` with invalid user ID (expect error)
    8. Test `getUserById()` with empty string (expect error)
    9. Test `searchUsers()` with name query
    10. Test `searchUsers()` with email query
    11. Test `searchUsers()` with role query
    12. Test `searchUsers()` with short query (expect error)
    13. Test `getUsersByDepartment()` with valid department
    14. Test `getUsersByDepartment()` with invalid department
    15. Measure and verify API delay is between 500-1000ms
    16. Test response format consistency (all responses have success, timestamp)
    17. Test error response format (error responses have error message)
    18. Run ESLint: `cd app/nextjs && npm run lint`
    19. Run TypeScript check: `cd app/nextjs && npx tsc --noEmit`
    20. Run Next.js build: `cd app/nextjs && npm run build`
  - Success criteria listing all assertions that must pass
  - Failure scenarios describing what should cause test failure
  - Output format as JSON with test results
  - Cleanup section (no cleanup needed)
- Include specific verification steps with expected values
- Add timing measurements to validate 500-1000ms delay range

### Step 8: Run All Validation Commands
- Read `.claude/commands/test_e2e.md` for E2E test execution instructions
- Execute the E2E test file `.claude/commands/e2e/test_api_service.md` to validate all API functionality
- Run TypeScript compilation: `cd app/nextjs && npx tsc --noEmit` (must pass with zero errors)
- Run ESLint: `cd app/nextjs && npm run lint` (must pass with zero errors)
- Run Next.js build: `cd app/nextjs && npm run build` (must complete successfully)
- Verify all functions work correctly with proper delays, error handling, and response formatting
- Confirm no regressions in existing mock database functionality

## Testing Strategy
### Unit Tests
- **Utility Functions**:
  - Test `simulateDelay()` resolves within 500-1000ms range
  - Test `createSuccessResponse()` formats data correctly with timestamp
  - Test `createErrorResponse()` creates proper error structure

- **getAllUsers()**:
  - Test default pagination (page 1, pageSize 10)
  - Test custom pagination parameters
  - Test first page, middle page, last page
  - Test page out of bounds returns empty results
  - Test metadata accuracy (totalUsers, totalPages, hasNextPage, hasPreviousPage)
  - Test with pageSize larger than total users
  - Test with pageSize of 1 (edge case)

- **getUserById()**:
  - Test all 25 valid user IDs return correct user
  - Test invalid ID returns error response
  - Test empty string returns error response
  - Test null/undefined handling
  - Test response format matches ApiResponse structure

- **searchUsers()**:
  - Test full name match (exact)
  - Test partial name match (substring)
  - Test email search
  - Test role search
  - Test case-insensitive search
  - Test multi-word search
  - Test special characters in query
  - Test minimum length validation (< 2 characters)
  - Test no results returns empty array with success: true
  - Test result count metadata

- **getUsersByDepartment()**:
  - Test all valid departments (Engineering, Design, Product, Marketing, Sales, HR, Operations, Finance, Customer Success, Data & Analytics)
  - Test invalid department returns error
  - Test empty string returns error
  - Test case sensitivity
  - Test result count metadata

### Edge Cases
- **Pagination Edge Cases**:
  - Request page 0 (should default to page 1 or return error)
  - Request negative page number (should return error)
  - Request page beyond available pages (should return empty results)
  - Request pageSize of 0 (should return error or default to 10)
  - Request pageSize larger than total dataset (should return all data)
  - Request pageSize of 1 (verify single item per page)

- **Search Edge Cases**:
  - Empty search query (should return error)
  - Single character search (should return error)
  - Very long search query (should handle gracefully)
  - Special characters (should not break search)
  - Search query with only spaces (should return error)
  - Unicode characters in search (should handle gracefully)

- **Error Handling**:
  - Missing required parameters (id, query, department)
  - null/undefined parameter values
  - Invalid data types (number instead of string)
  - Empty strings for required fields

- **Performance**:
  - Verify delay is always between 500-1000ms
  - Verify search performance with various query lengths
  - Verify pagination doesn't load unnecessary data

- **Response Format Consistency**:
  - All success responses have `success: true`
  - All success responses have `data` property
  - All success responses have `timestamp` in ISO format
  - All error responses have `success: false`
  - All error responses have `error` property with string message
  - All error responses have `timestamp` in ISO format
  - No responses have `null` or `undefined` for required properties

## Acceptance Criteria
- ✅ All API functions are implemented in `app/nextjs/lib/api.ts`
- ✅ All functions include simulated delays between 500-1000ms
- ✅ All functions return data in consistent `ApiResponse<T>` format
- ✅ All responses include ISO timestamp
- ✅ TypeScript compilation passes with zero errors
- ✅ All functions have comprehensive JSDoc documentation with examples
- ✅ All functions have proper TypeScript type annotations (no `any` types)
- ✅ `getAllUsers()` supports pagination with metadata (totalUsers, totalPages, currentPage, pageSize, hasNextPage, hasPreviousPage)
- ✅ `getUserById()` validates input and returns appropriate error for invalid/missing IDs
- ✅ `searchUsers()` performs case-insensitive search across name, email, and role fields
- ✅ `searchUsers()` validates minimum query length (2 characters)
- ✅ `getUsersByDepartment()` validates input and returns filtered results
- ✅ Error handling is comprehensive with descriptive error messages
- ✅ All functions can be imported and used in React components
- ✅ E2E test specification is created and validates all functionality
- ✅ All E2E tests pass successfully
- ✅ ESLint passes with zero errors
- ✅ Next.js build completes successfully
- ✅ No regressions in existing mock database functionality
- ✅ Code follows existing project patterns and conventions

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_api_service.md` to validate all API functionality works correctly with proper delays, error handling, search functionality, and pagination support
- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation to validate types are correct with zero errors
- `cd app/nextjs && npm run lint` - Run ESLint to validate code quality with zero errors
- `cd app/nextjs && npm run build` - Run Next.js build to validate the feature works with zero build errors

## Notes

### Design Decisions
- **Delay Range (500-1000ms)**: Chosen to simulate realistic API latency without making development painfully slow. This range is typical for well-optimized backend APIs.
- **Response Format**: Using the existing `ApiResponse<T>` type from `types/index.ts` ensures consistency across the codebase and matches the requirements exactly.
- **Pagination Defaults**: Page size of 10 is a common default for list APIs, balancing between too many requests and too much data per request.
- **Case-Insensitive Search**: Provides better user experience for search functionality, matching common search engine behavior.
- **Minimum Search Length**: 2-character minimum prevents performance issues from single-character searches and reduces false positives.
- **Error Response Strategy**: Always return `success: false` with descriptive error messages rather than throwing exceptions, allowing components to handle errors gracefully in the UI.
- **Metadata in Responses**: Including metadata like result counts and pagination info in the response helps components show meaningful feedback to users (e.g., "Showing 10 of 25 users").

### Integration Points
This mock API service can be used for:
- User directory pages with pagination and search
- User profile detail views
- Department-based team dashboards
- Search functionality in navigation bars
- Admin panels for user management
- Testing loading states and spinners
- Testing error boundaries and error handling
- Demonstrating API integration patterns to new developers
- Building component stories in Storybook
- Integration testing with React Testing Library

### Migration Path to Real Backend
When ready to integrate with a real backend:
1. Update the function implementations to use `fetch()` or your HTTP client library
2. Replace `simulateDelay()` calls with actual HTTP requests
3. Keep the same function signatures and response format
4. The rest of the application code remains unchanged
5. Consider creating an environment variable to toggle between mock and real API

### Future Enhancements
Potential improvements for future iterations:
- Add `updateUser()` and `deleteUser()` functions for mutation operations
- Implement `createUser()` for adding new users
- Add sorting capabilities (by name, date, department)
- Implement advanced filtering (multiple departments, date ranges)
- Add caching layer to simulate API caching behavior
- Implement request debouncing for search
- Add mock authentication/authorization checks
- Implement rate limiting simulation
- Add request/response logging for debugging
- Support for GraphQL-style queries
- Add webhook simulation for real-time updates
- Implement optimistic updates pattern
- Add data persistence to localStorage for stateful testing
