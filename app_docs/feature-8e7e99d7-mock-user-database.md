# Mock User Database

**ADW ID:** 8e7e99d7
**Date:** 2026-01-16
**Specification:** specs/issue-3-adw-8e7e99d7-sdlc_planner-mock-user-database.md

## Overview

This feature implements a comprehensive mock user database service for the Next.js application, containing 25 realistic user profiles with diverse roles, departments, locations, and professional information. The database serves as a ready-to-use data source for building and testing user-related features without requiring a backend database.

## What Was Built

- **TypeScript User Interface**: Extended the existing `User` interface in `types/index.ts` with complete profile fields including avatar, department, location, bio, joinDate, and status
- **Mock Database Module**: Created `lib/mockDb.ts` with 25 carefully crafted user profiles representing a realistic global tech team
- **UI Avatars Integration**: Implemented automatic avatar generation using the UI Avatars service for consistent, professional profile images
- **E2E Test Suite**: Added comprehensive E2E test documentation to validate database functionality and data integrity
- **Helper Functions**: Included utility functions for querying users by ID, role, department, location, and status

## Technical Implementation

### Files Modified

- `app/nextjs/types/index.ts`: Extended the `User` interface from 4 basic fields to 10 comprehensive fields including avatar, role, department, location, bio, joinDate, and status with proper TypeScript typing
- `app/nextjs/lib/mockDb.ts`: Created new module with 25 user profiles and 5 helper functions for database queries (getUserById, getUsersByRole, getUsersByDepartment, getActiveUsers, getUsersByLocation)
- `.claude/commands/e2e/test_mock_database.md`: Added E2E test specification with 15 validation steps covering data integrity, TypeScript types, and helper function behavior
- `.mcp.json`: Updated configuration file
- `playwright-mcp-config.json`: Updated Playwright configuration

### Key Changes

- **Type Safety Enhancement**: Changed `role` from optional to required field and added 6 new required fields (avatar, department, location, bio, joinDate, status) with strict typing including union type for status field ('active' | 'inactive')
- **Realistic Data Set**: Generated 25 diverse user profiles spanning 10 different roles (Engineering Manager, Full Stack Developer, Product Designer, Backend Developer, Product Manager, etc.), 8 departments, and 12 global locations
- **Professional Bios**: Each user includes a 2-3 sentence professional biography describing their experience, expertise, and interests
- **Time-based Data**: Join dates range from 2022-2025 to represent realistic team growth, with approximately 90% active users and 10% inactive
- **Avatar Generation**: Integrated UI Avatars service with encoded name parameters for consistent profile image generation

## How to Use

### Importing the Database

```typescript
import { mockUsers, getUserById, getUsersByRole } from '@/lib/mockDb'

// Get all users
const allUsers = mockUsers
console.log(`Total users: ${allUsers.length}`) // 25

// Find a specific user
const user = getUserById('usr_1a2b3c4d5e6f')

// Filter by role
const developers = getUsersByRole('Full Stack Developer')

// Filter by department
const engineeringTeam = getUsersByDepartment('Engineering')

// Get active users only
const activeUsers = getActiveUsers()

// Filter by location
const sfTeam = getUsersByLocation('San Francisco')
```

### Using in React Components

```typescript
import { mockUsers } from '@/lib/mockDb'

export default function UserDirectory() {
  return (
    <div>
      {mockUsers.map(user => (
        <div key={user.id}>
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.role} - {user.department}</p>
          <p>{user.location}</p>
        </div>
      ))}
    </div>
  )
}
```

## Configuration

No configuration required. The mock database is ready to use immediately after import.

### Avatar Service

Avatars are generated using the UI Avatars service (https://ui-avatars.com):
- Free service with no API key required
- Generates avatars with user initials
- Customizable via query parameters
- Example: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=random`

## Testing

### E2E Test

Run the E2E test suite to validate database functionality:

```bash
# See test documentation
cat .claude/commands/e2e/test_mock_database.md

# Test validates:
# - TypeScript compilation with new types
# - Database contains exactly 25 users
# - All required fields are populated
# - All user IDs are unique
# - Avatar URLs are properly formatted
# - Status values are valid ('active' or 'inactive')
# - Helper functions work correctly
```

### Manual Validation

```bash
# TypeScript type checking
cd app/nextjs && npx tsc --noEmit

# Lint check
cd app/nextjs && npm run lint

# Build check
cd app/nextjs && npm run build
```

## Database Statistics

- **Total Users**: 25
- **Active Users**: 23 (92%)
- **Inactive Users**: 2 (8%)
- **Roles**: 10 different positions
- **Departments**: 8 organizational units
- **Locations**: 12 global cities
- **Join Date Range**: 2022-03-15 to 2024-11-18

### Role Distribution

- Engineering Manager: 1
- Full Stack Developer: 3
- Product Designer: 1
- Backend Developer: 2
- Product Manager: 2
- Frontend Developer: 2
- UX Researcher: 1
- DevOps Engineer: 2
- QA Engineer: 2
- Data Analyst: 2
- Marketing Manager: 2
- Sales Director: 2
- HR Manager: 1
- UI/UX Designer: 1
- Solutions Architect: 1

### Department Distribution

- Engineering: ~40%
- Design: ~12%
- Product: ~12%
- Operations: ~8%
- Marketing: ~8%
- Sales: ~8%
- HR: ~4%
- Data & Analytics: ~8%

## Notes

### Design Decisions

- **UUID Format**: Used "usr_" prefix for user IDs to make them easily identifiable as user identifiers
- **Data Diversity**: Included diverse names, varied roles, global locations, and realistic professional backgrounds
- **Helper Functions**: Provided 5 common query functions to simplify database access patterns
- **Type Safety**: Made role and all profile fields required (not optional) to ensure data completeness

### Integration Points

This mock database can be used for:
- User directory and profile listing pages
- Detailed user profile views
- Team dashboards filtered by department or location
- Admin panels for user management
- Search and filter functionality demonstrations
- Role-based access control testing
- Authentication flow testing with realistic user data
- UI component development and testing

### Future Enhancements

Potential improvements for future iterations:
- Add pagination helpers for large result sets
- Implement search functionality with fuzzy matching
- Add relationships between users (managers, team members)
- Include additional fields (phone, social profiles, skills, projects)
- Add data seeding with configurable parameters
- Implement sorting and advanced filtering
- Consider migration path to real database when backend is ready
