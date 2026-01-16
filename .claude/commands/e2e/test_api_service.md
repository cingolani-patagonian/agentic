# E2E Test: Mock Backend API Service

## Test Metadata
- Test Name: Mock Backend API Service
- Test ID: test_api_service
- Application URL: http://localhost:3000
- Purpose: Validate that the mock backend API service is properly implemented with simulated delays, error handling, pagination, search functionality, and consistent response formatting

## User Story
As a developer, I want a realistic mock backend API service with simulated delays and consistent response formatting, so that I can build and test frontend components with production-like API interactions, loading states, and error handling without requiring a real backend server.

## Prerequisites
- Node.js and npm installed
- All dependencies installed in app/nextjs/
- TypeScript properly configured
- Mock database file exists at app/nextjs/lib/mockDb.ts
- Mock API service file created at app/nextjs/lib/api.ts
- User and ApiResponse types defined in app/nextjs/types/index.ts

## Test Steps

### Step 1: Verify TypeScript Compilation
**Action:** Navigate to app/nextjs/ and run TypeScript compilation check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No compilation errors, all API functions are properly typed

### Step 2: Test API Module Import
**Action:** Create a test Node.js script to import and validate the API module
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers, getUserById, searchUsers, getUsersByDepartment } from './lib/api.ts';
console.log('✓ All API functions imported successfully');
console.log('Functions available:', typeof getAllUsers, typeof getUserById, typeof searchUsers, typeof getUsersByDepartment);
"
```
**Verify:** Script runs without errors and all functions are available
**Expected:** All four API functions can be imported

### Step 3: Test getAllUsers with Default Pagination
**Action:** Test getAllUsers function with default parameters
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers } from './lib/api.ts';
const startTime = Date.now();
const response = await getAllUsers();
const elapsed = Date.now() - startTime;
console.log('Response time (ms):', elapsed);
console.log('Success:', response.success);
console.log('Users returned:', response.data.length);
console.log('Total users:', response.totalUsers);
console.log('Total pages:', response.totalPages);
console.log('Current page:', response.currentPage);
console.log('Page size:', response.pageSize);
console.log('Has next page:', response.hasNextPage);
console.log('Has previous page:', response.hasPreviousPage);
console.log('Timestamp:', response.timestamp);
"
```
**Verify:**
- Response time is between 500-1000ms
- success is true
- data contains 10 users (default page size)
- totalUsers is 25
- totalPages is 3
- currentPage is 1
- pageSize is 10
- hasNextPage is true
- hasPreviousPage is false
- timestamp is ISO format string
**Expected:** Pagination works correctly with default values and includes proper metadata

### Step 4: Test getAllUsers with Custom Pagination
**Action:** Test getAllUsers with page 2 and pageSize 5
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers } from './lib/api.ts';
const response = await getAllUsers({ page: 2, pageSize: 5 });
console.log('Success:', response.success);
console.log('Users returned:', response.data.length);
console.log('Current page:', response.currentPage);
console.log('Page size:', response.pageSize);
console.log('Total pages:', response.totalPages);
console.log('Has next page:', response.hasNextPage);
console.log('Has previous page:', response.hasPreviousPage);
console.log('First user ID:', response.data[0]?.id);
"
```
**Verify:**
- success is true
- data contains 5 users
- currentPage is 2
- pageSize is 5
- totalPages is 5 (25 users / 5 per page)
- hasNextPage is true
- hasPreviousPage is true
- Users are from indices 5-9 (second page)
**Expected:** Custom pagination parameters work correctly

### Step 5: Test getAllUsers Pagination Edge Cases
**Action:** Test pagination with page out of bounds
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers } from './lib/api.ts';
const response = await getAllUsers({ page: 100, pageSize: 10 });
console.log('Success:', response.success);
console.log('Users returned:', response.data.length);
console.log('Current page:', response.currentPage);
console.log('Has next page:', response.hasNextPage);
"
```
**Verify:**
- success is true
- data is an empty array (page beyond available data)
- currentPage is 100
- hasNextPage is false
**Expected:** Out of bounds page returns empty array gracefully

### Step 6: Test getAllUsers with Invalid Page Number
**Action:** Test with page < 1
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers } from './lib/api.ts';
const response = await getAllUsers({ page: 0, pageSize: 10 });
console.log('Success:', response.success);
console.log('Error:', response.error);
"
```
**Verify:**
- success is false
- error message indicates page number must be 1 or greater
**Expected:** Proper error handling for invalid page numbers

### Step 7: Test getUserById with Valid ID
**Action:** Test getUserById with a valid user ID
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUserById } from './lib/api.ts';
const startTime = Date.now();
const response = await getUserById('usr_1a2b3c4d5e6f');
const elapsed = Date.now() - startTime;
console.log('Response time (ms):', elapsed);
console.log('Success:', response.success);
console.log('User name:', response.data?.name);
console.log('User email:', response.data?.email);
console.log('Timestamp:', response.timestamp);
"
```
**Verify:**
- Response time is between 500-1000ms
- success is true
- data contains user object with name "Sarah Johnson"
- timestamp is ISO format string
**Expected:** Valid user ID returns correct user data

### Step 8: Test getUserById with Invalid ID
**Action:** Test getUserById with non-existent ID
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUserById } from './lib/api.ts';
const response = await getUserById('invalid_id_12345');
console.log('Success:', response.success);
console.log('Error:', response.error);
console.log('Timestamp:', response.timestamp);
"
```
**Verify:**
- success is false
- error message indicates user not found
- timestamp is present
**Expected:** Non-existent ID returns proper error response

### Step 9: Test getUserById with Empty String
**Action:** Test getUserById with empty string
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUserById } from './lib/api.ts';
const response = await getUserById('');
console.log('Success:', response.success);
console.log('Error:', response.error);
"
```
**Verify:**
- success is false
- error message indicates user ID is required
**Expected:** Empty ID returns validation error immediately (no delay)

### Step 10: Test searchUsers by Name
**Action:** Test searchUsers with name query
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const startTime = Date.now();
const response = await searchUsers('sarah');
const elapsed = Date.now() - startTime;
console.log('Response time (ms):', elapsed);
console.log('Success:', response.success);
console.log('Results found:', response.resultCount);
console.log('First result name:', response.data[0]?.name);
"
```
**Verify:**
- Response time is between 500-1000ms
- success is true
- resultCount is 1
- First result name is "Sarah Johnson"
**Expected:** Case-insensitive name search works correctly

### Step 11: Test searchUsers by Email
**Action:** Test searchUsers with email query
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const response = await searchUsers('@company.com');
console.log('Success:', response.success);
console.log('Results found:', response.resultCount);
console.log('Data length:', response.data.length);
"
```
**Verify:**
- success is true
- resultCount is 25 (all users have @company.com)
- data length matches resultCount
**Expected:** Email domain search returns all users

### Step 12: Test searchUsers by Role
**Action:** Test searchUsers with role query
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const response = await searchUsers('developer');
console.log('Success:', response.success);
console.log('Results found:', response.resultCount);
console.log('Sample roles:', response.data.slice(0, 3).map(u => u.role));
"
```
**Verify:**
- success is true
- resultCount > 0 (multiple developers exist)
- All returned users have "developer" in their role (case-insensitive)
**Expected:** Role search returns matching users

### Step 13: Test searchUsers with Short Query
**Action:** Test searchUsers with query less than 2 characters
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const response = await searchUsers('a');
console.log('Success:', response.success);
console.log('Error:', response.error);
"
```
**Verify:**
- success is false
- error message indicates minimum 2 characters required
**Expected:** Minimum length validation works

### Step 14: Test searchUsers with Empty Query
**Action:** Test searchUsers with empty string
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const response = await searchUsers('');
console.log('Success:', response.success);
console.log('Error:', response.error);
"
```
**Verify:**
- success is false
- error message indicates search query is required
**Expected:** Empty query validation works

### Step 15: Test searchUsers Case Sensitivity
**Action:** Test case-insensitive search by default
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { searchUsers } from './lib/api.ts';
const lowerResponse = await searchUsers('sarah');
const upperResponse = await searchUsers('SARAH');
const mixedResponse = await searchUsers('SaRaH');
console.log('Lower case results:', lowerResponse.resultCount);
console.log('Upper case results:', upperResponse.resultCount);
console.log('Mixed case results:', mixedResponse.resultCount);
console.log('All match:', lowerResponse.resultCount === upperResponse.resultCount && upperResponse.resultCount === mixedResponse.resultCount);
"
```
**Verify:**
- All three queries return the same result count
- Case-insensitive by default
**Expected:** Search is case-insensitive

### Step 16: Test getUsersByDepartment with Valid Department
**Action:** Test getUsersByDepartment with "Engineering"
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUsersByDepartment } from './lib/api.ts';
const startTime = Date.now();
const response = await getUsersByDepartment('Engineering');
const elapsed = Date.now() - startTime;
console.log('Response time (ms):', elapsed);
console.log('Success:', response.success);
console.log('Results found:', response.resultCount);
console.log('All are engineers:', response.data.every(u => u.department === 'Engineering'));
console.log('Sample names:', response.data.slice(0, 3).map(u => u.name));
"
```
**Verify:**
- Response time is between 500-1000ms
- success is true
- resultCount > 0 (multiple engineers exist)
- All returned users have department "Engineering"
**Expected:** Department filtering works correctly

### Step 17: Test getUsersByDepartment with Invalid Department
**Action:** Test getUsersByDepartment with non-existent department
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUsersByDepartment } from './lib/api.ts';
const response = await getUsersByDepartment('NonExistentDept');
console.log('Success:', response.success);
console.log('Results found:', response.resultCount);
console.log('Data length:', response.data.length);
"
```
**Verify:**
- success is true (returns empty array, not error)
- resultCount is 0
- data is empty array
**Expected:** Non-existent department returns empty results

### Step 18: Test getUsersByDepartment with Empty String
**Action:** Test getUsersByDepartment with empty string
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUsersByDepartment } from './lib/api.ts';
const response = await getUsersByDepartment('');
console.log('Success:', response.success);
console.log('Error:', response.error);
"
```
**Verify:**
- success is false
- error message indicates department is required
**Expected:** Empty department validation works

### Step 19: Measure API Delay Consistency
**Action:** Test that all API functions have delays within 500-1000ms range
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers, getUserById, searchUsers, getUsersByDepartment } from './lib/api.ts';

const testDelay = async (name, fn) => {
  const start = Date.now();
  await fn();
  const elapsed = Date.now() - start;
  console.log(name + ' delay:', elapsed + 'ms', '(valid:', elapsed >= 500 && elapsed <= 1100 ? 'YES' : 'NO', ')');
  return elapsed >= 500 && elapsed <= 1100;
};

const results = [];
results.push(await testDelay('getAllUsers', () => getAllUsers()));
results.push(await testDelay('getUserById', () => getUserById('usr_1a2b3c4d5e6f')));
results.push(await testDelay('searchUsers', () => searchUsers('developer')));
results.push(await testDelay('getUsersByDepartment', () => getUsersByDepartment('Engineering')));

console.log('All delays valid:', results.every(r => r));
"
```
**Verify:**
- All function calls take between 500-1100ms (allowing 100ms margin for execution time)
**Expected:** Simulated delay is consistent across all functions

### Step 20: Test Response Format Consistency for Success
**Action:** Verify all success responses have consistent structure
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getAllUsers, getUserById, searchUsers, getUsersByDepartment } from './lib/api.ts';

const responses = await Promise.all([
  getAllUsers(),
  getUserById('usr_1a2b3c4d5e6f'),
  searchUsers('developer'),
  getUsersByDepartment('Engineering')
]);

responses.forEach((response, i) => {
  console.log('Response', i + 1 + ':');
  console.log('  has success:', 'success' in response);
  console.log('  has data:', 'data' in response);
  console.log('  has timestamp:', 'timestamp' in response);
  console.log('  success is true:', response.success === true);
  console.log('  timestamp is ISO:', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(response.timestamp));
});
"
```
**Verify:**
- All responses have success, data, and timestamp properties
- All success values are true
- All timestamps are in ISO format
**Expected:** Response format is consistent across all functions

### Step 21: Test Response Format Consistency for Errors
**Action:** Verify all error responses have consistent structure
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { getUserById, searchUsers, getUsersByDepartment } from './lib/api.ts';

const errorResponses = await Promise.all([
  getUserById(''),
  searchUsers('a'),
  getUsersByDepartment('')
]);

errorResponses.forEach((response, i) => {
  console.log('Error Response', i + 1 + ':');
  console.log('  has success:', 'success' in response);
  console.log('  has error:', 'error' in response);
  console.log('  has timestamp:', 'timestamp' in response);
  console.log('  success is false:', response.success === false);
  console.log('  error is string:', typeof response.error === 'string');
  console.log('  error message:', response.error);
});
"
```
**Verify:**
- All error responses have success, error, and timestamp properties
- All success values are false
- All error messages are non-empty strings
**Expected:** Error response format is consistent

### Step 22: Test All 25 User IDs
**Action:** Verify all user IDs from mock database can be fetched via API
```javascript
cd app/nextjs && node --loader tsx --no-warnings -e "
import { mockUsers } from './lib/mockDb.ts';
import { getUserById } from './lib/api.ts';

console.log('Testing all', mockUsers.length, 'user IDs...');
let successCount = 0;

for (const user of mockUsers) {
  const response = await getUserById(user.id);
  if (response.success && response.data.id === user.id) {
    successCount++;
  } else {
    console.log('FAIL: Could not fetch user', user.id);
  }
}

console.log('Successfully fetched:', successCount, '/', mockUsers.length);
console.log('All users fetchable:', successCount === mockUsers.length);
"
```
**Verify:**
- All 25 users can be successfully fetched by their ID
**Expected:** getUserById works for all existing user IDs

### Step 23: Run ESLint
**Action:** Run linter to ensure code quality
```bash
cd app/nextjs && npm run lint
```
**Verify:** No linting errors for api.ts
**Expected:** Clean code with no lint errors

### Step 24: Run TypeScript Compilation Again
**Action:** Final TypeScript check
```bash
cd app/nextjs && npx tsc --noEmit
```
**Verify:** TypeScript compiles without errors (exit code 0)
**Expected:** No type errors in the API module

### Step 25: Run Frontend Build
**Action:** Build the Next.js application
```bash
cd app/nextjs && npm run build
```
**Verify:** Build completes successfully with no errors
**Expected:** Application builds without issues

## Success Criteria
- ✅ TypeScript compiles without errors
- ✅ All API functions can be imported successfully
- ✅ getAllUsers returns paginated results with correct metadata
- ✅ getAllUsers supports custom pagination parameters
- ✅ getAllUsers handles edge cases (out of bounds, invalid page numbers)
- ✅ getUserById returns user data for valid IDs
- ✅ getUserById returns errors for invalid IDs
- ✅ getUserById validates empty strings
- ✅ searchUsers performs case-insensitive search across name, email, and role
- ✅ searchUsers validates minimum query length
- ✅ searchUsers validates empty queries
- ✅ getUsersByDepartment filters users by department
- ✅ getUsersByDepartment handles non-existent departments gracefully
- ✅ getUsersByDepartment validates empty strings
- ✅ All API functions have simulated delays between 500-1000ms
- ✅ All success responses have consistent structure (success, data, timestamp)
- ✅ All error responses have consistent structure (success, error, timestamp)
- ✅ All 25 users can be fetched by their ID
- ✅ ESLint passes with no errors
- ✅ Frontend build succeeds

## Failure Scenarios
If any of the following occur, mark the test as FAILED:
- TypeScript compilation fails
- API module cannot be imported
- Functions don't return expected data structures
- Pagination logic is incorrect
- Error handling doesn't work as expected
- API delays are outside 500-1000ms range
- Response format is inconsistent
- Search functionality doesn't work across all fields
- Case sensitivity is not handled correctly
- Validation doesn't catch invalid inputs
- Any user ID cannot be fetched
- ESLint reports errors
- Build fails

## Output Format
```json
{
  "test_name": "Mock Backend API Service",
  "status": "passed|failed",
  "screenshots": [],
  "error": null,
  "stats": {
    "functions_tested": 4,
    "test_cases_passed": 25,
    "average_delay_ms": 750,
    "all_users_fetchable": true
  }
}
```

## Cleanup
- No cleanup needed (no server or processes started)
- All validation is done through Node.js script execution and static analysis
