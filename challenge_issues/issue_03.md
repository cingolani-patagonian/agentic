# Issue #3: Mock Database for User Profiles

**Title:** Create mock database with user profile data

**Labels:** feature, database

**Workflow:** adw_sdlc_iso

---

## Description

Implement a mock database service with realistic user profile data.

## Requirements

- Create mock database file in `/lib/mockDb.ts`
- Generate 20-30 user profiles with realistic data:
  - id (unique identifier)
  - name (full name)
  - email
  - avatar (URL to placeholder image service like UI Avatars)
  - role (e.g., Developer, Designer, Manager, etc.)
  - department
  - location
  - bio (short description)
  - joinDate
  - status (active/inactive)
- Use a placeholder image service for avatars (e.g., `https://ui-avatars.com/api/?name=...`)
- Export database as array of user objects
- Add TypeScript interface for User type

## Example User Object

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  bio: string;
  joinDate: string;
  status: 'active' | 'inactive';
}
```

## Acceptance Criteria

- Mock database contains 20-30 user profiles
- All fields are populated with realistic data
- TypeScript types are properly defined
- Data is easily accessible from other modules
