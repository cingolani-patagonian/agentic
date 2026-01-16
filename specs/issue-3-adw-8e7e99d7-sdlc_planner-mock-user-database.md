# Feature: Mock User Database

## Metadata
issue_number: `3`
adw_id: `8e7e99d7`
issue_json: `{"number":3,"title":"Create mock database with user profile data","body":"# Issue #3: Mock Database for User Profiles\n\n**Title:** Create mock database with user profile data\n\n**Labels:** feature, database\n\n**Workflow:** adw_sdlc_iso\n\n---\n\n## Description\n\nImplement a mock database service with realistic user profile data.\n\n## Requirements\n\n- Create mock database file in `/lib/mockDb.ts`\n- Generate 20-30 user profiles with realistic data:\n  - id (unique identifier)\n  - name (full name)\n  - email\n  - avatar (URL to placeholder image service like UI Avatars)\n  - role (e.g., Developer, Designer, Manager, etc.)\n  - department\n  - location\n  - bio (short description)\n  - joinDate\n  - status (active/inactive)\n- Use a placeholder image service for avatars (e.g., `https://ui-avatars.com/api/?name=...`)\n- Export database as array of user objects\n- Add TypeScript interface for User type\n\n## Example User Object\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  avatar: string;\n  role: string;\n  department: string;\n  location: string;\n  bio: string;\n  joinDate: string;\n  status: 'active' | 'inactive';\n}\n```\n\n## Acceptance Criteria\n\n- Mock database contains 20-30 user profiles\n- All fields are populated with realistic data\n- TypeScript types are properly defined\n- Data is easily accessible from other modules"}`

## Feature Description
This feature implements a mock user database service for the Next.js application, containing 20-30 realistic user profiles with comprehensive data fields. The database will serve as a data source for displaying user information throughout the application, providing a foundation for features like user directories, profile pages, and team management interfaces. Each user profile includes essential information such as name, email, avatar, role, department, location, bio, join date, and status, all properly typed with TypeScript interfaces for type safety.

## User Story
As a developer
I want a mock database with realistic user profile data
So that I can build and test user-related features without requiring a real backend database

## Problem Statement
The Next.js application currently has authentication with hardcoded credentials but lacks a comprehensive user database with realistic profile data. To build features like user directories, profile pages, team dashboards, and other user-centric functionality, developers need a rich set of user data with multiple fields beyond just username and role. This mock database will provide realistic user profiles that can be used immediately for development and testing purposes.

## Solution Statement
Create a TypeScript module at `app/nextjs/lib/mockDb.ts` that exports a collection of 20-30 user profiles with realistic, diverse data. The module will define a proper TypeScript interface for the User type (extending the existing User interface in `types/index.ts`) and provide a curated dataset with varied roles (Developer, Designer, Manager, Product Manager, QA Engineer, etc.), departments (Engineering, Design, Product, Marketing, etc.), locations, professional bios, and join dates spanning multiple years. Avatar URLs will use the UI Avatars service with user names to generate consistent, visually appealing profile images.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/types/index.ts` - Contains existing TypeScript type definitions including a basic User interface. We'll extend this interface to include all required fields for the mock database (role, department, location, bio, joinDate, status).

- `app/nextjs/lib/auth.ts` - Contains the authentication service with mock users. We can reference this file to understand the existing user structure and ensure consistency with the auth system's username/role pattern.

- `app/nextjs/lib/utils.ts` - Contains utility functions. We may add helper functions here if needed for working with the user database (filtering, searching, etc.).

- `README.md` - Contains project overview and instructions. We should reference this to understand the project structure and ensure our implementation aligns with existing patterns.

- `app/nextjs/README.md` - Contains Next.js specific documentation. We should review this to understand the Next.js application structure and best practices.

- `.claude/commands/test_e2e.md` - E2E test runner documentation to understand how to create E2E tests.

- `.claude/commands/e2e/test_auth_login.md` - Example E2E test file to understand the format and structure.

### New Files

- `app/nextjs/lib/mockDb.ts` - The main mock database module that will export the user profiles array and any helper functions for querying the data. This file will contain 20-30 realistic user profiles with all required fields properly typed.

- `.claude/commands/e2e/test_mock_database.md` - E2E test file that validates the mock database functionality, including data integrity, TypeScript types, data accessibility, and avatar URL generation.

## Implementation Plan

### Phase 1: Foundation
First, we'll extend the existing TypeScript type definitions to support the rich user profile structure required by the mock database. The existing `User` interface in `types/index.ts` already has basic fields (id, name, email, username, role) but needs additional fields for department, location, bio, joinDate, status, and avatar. We'll enhance this interface to be comprehensive while maintaining backward compatibility with existing code that uses the simpler structure.

### Phase 2: Core Implementation
Next, we'll create the mock database module at `app/nextjs/lib/mockDb.ts` with 20-30 carefully crafted user profiles. Each profile will have realistic, diverse data including:
- Unique identifiers using UUID format
- Professional names representing diverse backgrounds
- Email addresses following standard naming conventions
- Roles spanning common tech industry positions (Developer, Designer, Manager, Product Manager, QA Engineer, DevOps Engineer, Data Analyst, UX Researcher, etc.)
- Departments including Engineering, Design, Product, Marketing, Operations, HR, Sales, etc.
- Locations representing global distributed teams (San Francisco, New York, London, Berlin, Tokyo, Sydney, etc.)
- Professional bios describing experience and expertise (2-3 sentences each)
- Join dates spanning the past 3 years to represent a realistic team timeline
- Status values (active/inactive) with approximately 90% active users
- Avatar URLs using the UI Avatars service (https://ui-avatars.com/api/?name=FirstName+LastName) for consistent, professional profile images

The module will export the database as a constant array and may include helper functions for common queries (filtering by role, department, status, etc.).

### Phase 3: Integration
Finally, we'll ensure the mock database integrates seamlessly with the existing codebase. We'll verify that the TypeScript types are properly defined and exported, confirm that the data can be imported and used in React components, and create an E2E test to validate the database structure and data integrity. The implementation will follow existing patterns in the codebase (similar to how `lib/auth.ts` exports mock users) to maintain consistency.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Research Existing Code Structure
- Read `app/nextjs/types/index.ts` to understand the current User interface and type definitions
- Read `app/nextjs/lib/auth.ts` to understand how mock data is currently structured
- Read `app/nextjs/lib/utils.ts` to see what utility functions exist
- Review the project structure to ensure the implementation aligns with existing patterns

### 2. Extend TypeScript Type Definitions
- Update the `User` interface in `app/nextjs/types/index.ts` to include all required fields:
  - Ensure `id` field exists (already present)
  - Ensure `name` field exists (already present)
  - Ensure `email` field exists (already present)
  - Add `avatar: string` field for avatar URL
  - Add `role: string` field (may already exist, ensure it's required not optional)
  - Add `department: string` field for user's department
  - Add `location: string` field for user's office location
  - Add `bio: string` field for user biography
  - Add `joinDate: string` field for when the user joined (ISO date format)
  - Add `status: 'active' | 'inactive'` field with union type for user status
- Ensure the User interface is exported so it can be imported by the mock database module
- Verify TypeScript compilation succeeds with the updated types

### 3. Create Mock Database Module
- Create new file `app/nextjs/lib/mockDb.ts`
- Import the `User` type from `@/types`
- Create an array of 20-30 user objects with realistic, diverse data:
  - Generate unique IDs using UUID format (e.g., "usr_1a2b3c4d5e6f")
  - Use diverse, realistic names representing various backgrounds
  - Create professional email addresses (e.g., firstname.lastname@company.com)
  - Generate avatar URLs using UI Avatars service: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
  - Include varied roles: Frontend Developer, Backend Developer, Full Stack Developer, UI/UX Designer, Product Designer, Product Manager, Engineering Manager, QA Engineer, DevOps Engineer, Data Analyst, UX Researcher, Marketing Manager, Sales Director, HR Manager, etc.
  - Include varied departments: Engineering, Design, Product, Marketing, Sales, Operations, HR, Finance, Customer Success, Data & Analytics, etc.
  - Include global locations: San Francisco, New York, Los Angeles, Austin, London, Berlin, Paris, Tokyo, Singapore, Sydney, Toronto, Amsterdam, etc.
  - Write professional bios (2-3 sentences each) describing experience, expertise, and interests
  - Generate join dates spanning 2022-2025 for realistic team growth timeline
  - Set approximately 90% of users to 'active' status and 10% to 'inactive'
- Export the user array as a named export: `export const mockUsers: User[]`
- Add JSDoc comments to document the module and exported data

### 4. Add Helper Functions (Optional)
- Consider adding utility functions in the same module for common database queries:
  - `getUserById(id: string): User | undefined` - Find user by ID
  - `getUsersByRole(role: string): User[]` - Filter users by role
  - `getUsersByDepartment(department: string): User[]` - Filter users by department
  - `getActiveUsers(): User[]` - Get all active users
  - `getUsersByLocation(location: string): User[]` - Filter users by location
- Export these helper functions if created
- Add TypeScript type annotations for all function parameters and return values

### 5. Create E2E Test File
- Read `.claude/commands/test_e2e.md` to understand E2E test structure and requirements
- Read `.claude/commands/e2e/test_auth_login.md` as a reference example for test file format
- Create new file `.claude/commands/e2e/test_mock_database.md` with:
  - Test metadata (test name, test ID, purpose)
  - User story describing what the test validates
  - Prerequisites (Node.js, dependencies, Next.js app running)
  - Test steps that validate:
    - TypeScript compilation succeeds with new types
    - Mock database file can be imported without errors
    - Database contains 20-30 user objects
    - Each user has all required fields populated
    - All user IDs are unique
    - Avatar URLs are properly formatted
    - Status values are either 'active' or 'inactive'
    - Join dates are valid ISO format strings
    - Email addresses follow standard format
    - Helper functions (if implemented) work correctly
  - Success criteria checklist
  - Failure scenarios to watch for
  - Output format in JSON with screenshot paths
  - Cleanup steps

### 6. Validate TypeScript Types
- Run TypeScript compilation check: `cd app/nextjs && npx tsc --noEmit`
- Verify no type errors related to the new User interface or mockDb module
- Fix any type errors that appear

### 7. Test Mock Database Imports
- Create a simple test to verify the mock database can be imported
- Run: `cd app/nextjs && node -e "console.log(require('./lib/mockDb.ts'))"`
- Verify the import succeeds without errors

### 8. Run All Validation Commands
- Execute every command in the `Validation Commands` section below
- Verify all commands execute successfully with zero errors
- If any command fails, fix the issues and re-run all validation commands

## Testing Strategy

### Unit Tests
Since this is a Next.js application without a formal test framework configured, we'll validate the mock database through:
1. TypeScript compilation checks to ensure type safety
2. Manual imports to verify the module exports work correctly
3. E2E tests to validate the data structure and integrity
4. Frontend build process to ensure no runtime errors

### Edge Cases
The following edge cases should be verified:
1. **Unique IDs**: Verify all user IDs are unique (no duplicates)
2. **Required Fields**: Ensure every user has all required fields populated (no null/undefined values)
3. **Avatar URLs**: Verify all avatar URLs are properly formatted and include encoded names
4. **Status Values**: Ensure status field only contains 'active' or 'inactive' values
5. **Date Format**: Verify joinDate values are valid ISO date strings
6. **Email Format**: Ensure all emails follow standard format (username@domain.com)
7. **Type Safety**: Verify the User type enforces all required fields at compile time
8. **Import/Export**: Ensure the module can be imported from other files without issues
9. **Array Length**: Verify the database contains between 20-30 users as required
10. **Data Realism**: Ensure roles, departments, and locations are realistic and varied

## Acceptance Criteria
- Mock database file exists at `app/nextjs/lib/mockDb.ts`
- Database contains exactly 20-30 user profiles
- User interface in `types/index.ts` includes all required fields with proper types
- All user IDs are unique across the database
- Every user has all required fields populated with realistic data
- Avatar URLs use UI Avatars service with properly encoded names
- Roles include at least 8 different job titles representing varied functions
- Departments include at least 6 different organizational units
- Locations include at least 10 different cities representing global distribution
- Join dates span from 2022 to 2025 for realistic timeline
- Approximately 90% of users have 'active' status, 10% have 'inactive'
- All bios are 2-3 sentences and describe professional background
- TypeScript compilation succeeds with no type errors
- Mock database can be imported and used in other modules
- E2E test file is created and validates database functionality
- Frontend build completes successfully with no errors

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute the new E2E `.claude/commands/e2e/test_mock_database.md` test file to validate this functionality works.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript compilation check to validate types are correct with zero errors
- `cd app/nextjs && npm run lint` - Run ESLint to validate code quality with zero errors
- `cd app/nextjs && npm run build` - Run frontend build to validate the feature works with zero regressions

## Notes

### Design Decisions
1. **UUID Format**: Using "usr_" prefix followed by random characters for IDs to make them easily identifiable as user IDs
2. **UI Avatars Service**: Using this service because it's free, requires no API key, and generates consistent avatars based on names
3. **Data Distribution**: Aiming for realistic distribution with more engineering roles than other departments, varied locations, and mostly active users
4. **Join Dates**: Spanning 2022-2025 to represent a growing team over several years

### UI Avatars Service
The UI Avatars service (https://ui-avatars.com) is used for generating avatar images. Key features:
- Free service with no API key required
- Generates initials from names
- Supports customization via query parameters (background, color, size, etc.)
- Example URL: `https://ui-avatars.com/api/?name=John+Doe&background=random`

### Future Enhancements
- Add search/filter functionality for querying users
- Implement pagination helpers for large result sets
- Add data validation functions to ensure data integrity
- Create seeded random data generation for consistent test data
- Add relationships between users (managers, team members, etc.)
- Include additional fields like phone numbers, social profiles, skills, etc.
- Consider migrating to a real database when backend is implemented

### Integration Points
This mock database can be used for:
- User directory/list pages
- Profile pages showing detailed user information
- Team dashboards showing department or location-based views
- Admin panels for user management
- Search and filter functionality
- Role-based access control demonstrations
- Testing authentication flows with real-looking user data
- Populating UI components during development

### Consistency with Auth System
The mock database should be consistent with the existing auth system in `lib/auth.ts`:
- Consider adding entries for the existing auth users (admin, user) to maintain consistency
- Or keep them separate and explain that auth users are separate from profile data
- Future work could integrate these two systems for a unified user management approach
