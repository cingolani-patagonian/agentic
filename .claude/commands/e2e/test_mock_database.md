# E2E Test: Mock User Database

## Test Metadata
- Test Name: Mock User Database
- Test ID: test_mock_database
- Application URL: http://localhost:3000
- Purpose: Validate that the mock user database is properly implemented with correct TypeScript types, realistic data, and working helper functions

## User Story
As a developer, I want a well-structured mock database with realistic user profile data and proper TypeScript types, so that I can build and test user-related features without requiring a real backend database.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- TypeScript properly configured
- Mock database file created at app/nextjs/lib/mockDb.ts
- User type extended in app/nextjs/types/index.ts

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, User interface includes all required fields

### Step 2: Test Mock Database Import
**Action:** Create a test Node.js script to import and validate the mock database
```bash
cd app/nextjs && node -e "
const { mockUsers, getUserById, getUsersByRole, getUsersByDepartment, getActiveUsers, getUsersByLocation } = require('./lib/mockDb.ts');
console.log('Mock users count:', mockUsers.length);
console.log('First user:', JSON.stringify(mockUsers[0], null, 2));
"
```
**Verify:** Script runs without errors and outputs user data
**Expected:** Successfully imports mockUsers array

### Step 3: Validate Database Size
**Action:** Check that the database contains between 20-30 users
**Verify:** 20 ≤ mockUsers.length ≤ 30
**Expected:** Database has exactly 25 users

### Step 4: Validate User Object Structure
**Action:** Check that each user has all required fields
**Verify:** Every user object contains:
- id (string)
- name (string)
- email (string)
- avatar (string)
- role (string)
- department (string)
- location (string)
- bio (string)
- joinDate (string)
- status ('active' | 'inactive')
**Expected:** All users have complete data with no null or undefined values

### Step 5: Validate Unique User IDs
**Action:** Check that all user IDs are unique
**Verify:** No duplicate IDs in the database
**Expected:** All 25 user IDs are unique

### Step 6: Validate Avatar URLs
**Action:** Check that all avatar URLs are properly formatted
**Verify:**
- All avatars use https://ui-avatars.com/api/ base URL
- Name parameter is included in the URL
- URLs are properly encoded
**Expected:** All avatar URLs follow the format: `https://ui-avatars.com/api/?name=...&background=random`

### Step 7: Validate Status Values
**Action:** Check that all status values are either 'active' or 'inactive'
**Verify:** No invalid status values exist
**Expected:** Approximately 90% active users, 10% inactive (23 active, 2-3 inactive)

### Step 8: Validate Join Dates
**Action:** Check that all joinDate values are valid ISO date strings
**Verify:**
- All dates are in YYYY-MM-DD format
- Dates are within the range 2022-2025
- All dates can be parsed by Date constructor
**Expected:** All join dates are valid and realistic

### Step 9: Validate Email Format
**Action:** Check that all emails follow standard format
**Verify:**
- All emails contain @ symbol
- All emails end with @company.com domain
- Email format: firstname.lastname@company.com
**Expected:** All emails are properly formatted

### Step 10: Validate Role Diversity
**Action:** Check that database includes varied roles
**Verify:**
- At least 8 different unique roles
- Roles include technical and non-technical positions
- Examples: Developer, Designer, Manager, QA Engineer, etc.
**Expected:** Diverse set of realistic job titles

### Step 11: Validate Department Diversity
**Action:** Check that database includes varied departments
**Verify:**
- At least 6 different unique departments
- Departments span different business functions
- Examples: Engineering, Design, Product, Marketing, etc.
**Expected:** Realistic organizational structure

### Step 12: Validate Location Diversity
**Action:** Check that database includes varied locations
**Verify:**
- At least 10 different unique locations
- Locations represent global distribution
- Examples: San Francisco, New York, London, Tokyo, etc.
**Expected:** Global team representation

### Step 13: Validate Bio Content
**Action:** Check that all bios are descriptive
**Verify:**
- All bios are non-empty strings
- Bios are 2-3 sentences long (approximately 100-300 characters)
- Bios describe professional background
**Expected:** Realistic professional bios for all users

### Step 14: Test getUserById Function
**Action:** Test the getUserById helper function
```javascript
const user = getUserById('usr_1a2b3c4d5e6f');
console.log('Found user:', user.name);
const notFound = getUserById('invalid_id');
console.log('Not found:', notFound); // Should be undefined
```
**Verify:**
- Function returns user when ID exists
- Function returns undefined when ID doesn't exist
**Expected:** Helper function works correctly

### Step 15: Test getUsersByRole Function
**Action:** Test the getUsersByRole helper function
```javascript
const developers = getUsersByRole('Full Stack Developer');
console.log('Developers count:', developers.length);
```
**Verify:** Function returns array of users with specified role
**Expected:** Function filters users correctly by role

### Step 16: Test getUsersByDepartment Function
**Action:** Test the getUsersByDepartment helper function
```javascript
const engineering = getUsersByDepartment('Engineering');
console.log('Engineering count:', engineering.length);
```
**Verify:** Function returns array of users in specified department
**Expected:** Function filters users correctly by department (should have most users in Engineering)

### Step 17: Test getActiveUsers Function
**Action:** Test the getActiveUsers helper function
```javascript
const active = getActiveUsers();
console.log('Active users count:', active.length);
console.log('Percentage active:', (active.length / mockUsers.length * 100).toFixed(1) + '%');
```
**Verify:**
- Function returns only active users
- Approximately 90% of users are active (22-23 out of 25)
**Expected:** Function correctly filters active users

### Step 18: Test getUsersByLocation Function
**Action:** Test the getUsersByLocation helper function
```javascript
const sf = getUsersByLocation('San Francisco');
console.log('San Francisco users:', sf.length);
```
**Verify:** Function returns array of users in specified location
**Expected:** Function filters users correctly by location

### Step 19: Validate Data Consistency
**Action:** Check for data quality and consistency
**Verify:**
- Names are realistic and diverse
- Email addresses match names (firstname.lastname pattern)
- Roles align with departments (e.g., Developers in Engineering)
- Bios match roles (technical descriptions for technical roles)
**Expected:** High-quality, consistent, realistic data

### Step 20: Run ESLint
**Action:** Run linter to ensure code quality
```bash
cd app/nextjs && npm run lint
```
**Verify:** No linting errors for mockDb.ts
**Expected:** Clean code with no lint errors

### Step 21: Run Frontend Build
**Action:** Build the Next.js application
```bash
cd app/nextjs && npm run build
```
**Verify:** Build completes successfully with no errors
**Expected:** Application builds without issues

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ Mock database file can be imported successfully
- ✅ Database contains exactly 20-30 users (target: 25)
- ✅ All users have complete data for all required fields
- ✅ All user IDs are unique (no duplicates)
- ✅ All avatar URLs are properly formatted with UI Avatars service
- ✅ All status values are either 'active' or 'inactive'
- ✅ Approximately 90% of users are active
- ✅ All join dates are valid ISO format strings (2022-2025)
- ✅ All email addresses follow standard format
- ✅ At least 8 different unique roles
- ✅ At least 6 different unique departments
- ✅ At least 10 different unique locations
- ✅ All bios are 2-3 sentences describing professional background
- ✅ getUserById function works correctly
- ✅ getUsersByRole function filters correctly
- ✅ getUsersByDepartment function filters correctly
- ✅ getActiveUsers function returns only active users
- ✅ getUsersByLocation function filters correctly
- ✅ Data is consistent and realistic
- ✅ ESLint passes with no errors
- ✅ Frontend build succeeds

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- Mock database cannot be imported
- Database has fewer than 20 or more than 30 users
- Any user is missing required fields
- Duplicate user IDs exist
- Avatar URLs are malformed or don't use UI Avatars service
- Invalid status values (not 'active' or 'inactive')
- Join dates are invalid or outside 2022-2025 range
- Email addresses don't follow standard format
- Insufficient diversity in roles, departments, or locations
- Bios are empty or unrealistic
- Helper functions don't work correctly
- ESLint reports errors
- Build fails

## Output Format
```json
{
  "test_name": "Mock User Database",
  "status": "passed|failed",
  "screenshots": [],
  "error": null,
  "stats": {
    "total_users": 25,
    "active_users": 23,
    "inactive_users": 2,
    "unique_roles": 20,
    "unique_departments": 10,
    "unique_locations": 20
  }
}
```

## Cleanup
- No cleanup needed (no server or processes started)
- All validation is done through TypeScript compilation and static analysis
