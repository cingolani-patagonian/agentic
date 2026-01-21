# Feature: Admin User Management - Create and Edit Users

## Metadata
issue_number: `34`
adw_id: `82ffb118`
issue_json: `{"number":34,"title":"Add admin functionality to create and edit users","body":"Implement admin-only functionality to add and edit users in the application.\n\n**Description:**\nCreate a new feature that allows admin users to add new users and edit existing users. This functionality should only be accessible to users with admin privileges.\n\n**Acceptance Criteria:**\n- Create a new page/form for creating new users\n- Create a new page/form for editing existing users\n- Forms should include all necessary user fields (name, email, role, department, location, etc.)\n- Only admin users can access these pages\n- Non-admin users are redirected or see access denied if they try to access\n- New page design is consistent with the existing application UI\n- Form validation is implemented\n- Success/error messages are shown after create/edit operations\n- Created/edited users appear correctly in the user list\n\n**User Flow:**\n1. Admin logs in\n2. Admin navigates to user management section\n3. Admin can click \"Add New User\" button\n4. Admin fills out the form and submits\n5. New user is created and appears in the user list\n6. Admin can also click edit on existing users to modify their information\n\n**Technical Considerations:**\n- Check user role/permissions before allowing access\n- Create reusable form component for create/edit operations\n- Maintain the same UI design patterns as the rest of the app\n- Consider using the same form for both create and edit (populate fields for edit mode)\n- Update mock database or backend API to handle user creation/editing\n\n**Security:**\n- Validate admin role on both frontend and backend\n- Sanitize all user inputs\n- Implement proper error handling\n\n**Pages to Create:**\n- `/admin/users/new` - Create new user\n- `/admin/users/[id]/edit` - Edit existing user\n- Or use a modal/dialog approach if preferred"}`

## Feature Description
This feature implements a comprehensive admin-only user management system that allows administrators to create new users and edit existing user profiles in the Next.js application. The system includes dedicated admin routes with role-based access control, reusable form components for user data entry, comprehensive validation, optimistic UI updates to the mock database, and success/error toast notifications. The feature integrates seamlessly with the existing authentication system, mock user database, and UI components to provide a consistent user experience.

## User Story
As an administrator
I want to create new users and edit existing user profiles through an intuitive form interface
So that I can manage the team directory, onboard new team members, and keep user information up-to-date without needing backend access

## Problem Statement
Currently, the application has a read-only user directory with 25 mock users. While users can view profiles and search the directory, there is no way to add new team members or update existing user information through the UI. Administrators need the ability to manage user data directly in the application to maintain an accurate and current team directory, onboard new employees, update role changes, and manage user status without requiring developer intervention or database access.

## Solution Statement
We will implement a complete admin user management system with two main routes: `/admin/users/new` for creating new users and `/admin/users/[id]/edit` for editing existing users. Both routes will be protected by role-based access control that checks for admin privileges on the authenticated user. We'll create a reusable UserForm component that handles both create and edit modes, with comprehensive field validation, error handling, and user feedback through toast notifications. The form will persist changes to the mock database (mockDb.ts) and update the AuthContext to include user role information. An "Add New User" button will be added to the dashboard for admin users, and edit functionality will be accessible from both user cards and the user details page.

## Relevant Files
Use these files to implement the feature:

- `app/nextjs/types/index.ts` - Contains User, AuthUser, and other TypeScript interfaces that will need to be extended to support user creation/editing
- `app/nextjs/lib/auth.ts` - Authentication service with mock user validation, will need to be updated to store role information in AuthUser for admin checks
- `app/nextjs/contexts/AuthContext.tsx` - Authentication context provider that needs to be updated to include role information in the user object
- `app/nextjs/hooks/useAuth.tsx` - Custom hook for accessing authentication state, will be used for admin role checks
- `app/nextjs/lib/mockDb.ts` - Mock user database with 25 users and helper functions, needs new functions for creating and updating users
- `app/nextjs/lib/api.ts` - API service layer that wraps mockDb operations, needs new functions for createUser and updateUser
- `app/nextjs/app/dashboard/page.tsx` - Dashboard page that displays user cards, needs "Add New User" button for admin users
- `app/nextjs/components/UserCard.tsx` - User profile card component, needs edit button for admin users
- `app/nextjs/app/users/[id]/page.tsx` - User details page, needs edit button for admin users
- `app/nextjs/contexts/ToastContext.tsx` - Toast notification context for success/error messages
- `app/nextjs/hooks/useToast.tsx` - Toast notification hook for displaying feedback
- `app/nextjs/components/Navigation.tsx` - Navigation component, may need admin-specific links
- `.claude/commands/conditional_docs.md` - To check if additional documentation is needed
- `.claude/commands/test_e2e.md` - E2E test runner documentation for creating admin user management tests

### New Files

- `app/nextjs/app/admin/users/new/page.tsx` - Create new user page with UserForm in create mode
- `app/nextjs/app/admin/users/[id]/edit/page.tsx` - Edit existing user page with UserForm in edit mode populated with user data
- `app/nextjs/components/UserForm.tsx` - Reusable form component for creating and editing users with validation, error handling, and submit logic
- `app/nextjs/components/AdminGuard.tsx` - Higher-order component or wrapper for protecting admin-only routes and rendering access denied messages
- `app/nextjs/lib/validation.ts` - Form validation utilities for user data (email format, required fields, etc.)
- `.claude/commands/e2e/test_admin_user_management.md` - E2E test specification for validating admin user creation, editing, access control, and form validation

## Implementation Plan

### Phase 1: Foundation - Authentication and Access Control
First, we need to enhance the authentication system to properly track user roles and create the infrastructure for admin-only access control. This includes updating the AuthUser type to include role information, modifying the auth service to store roles in tokens, and creating an AdminGuard component for protecting routes.

### Phase 2: Core Implementation - Database Operations and Form Component
Next, we implement the core functionality by adding create/update operations to the mock database, building the reusable UserForm component with comprehensive validation, and creating the admin routes for user creation and editing. This phase focuses on the data layer and UI components needed for user management.

### Phase 3: Integration - Dashboard and UI Updates
Finally, we integrate the admin features into the existing UI by adding "Add New User" buttons to the dashboard, edit buttons to user cards and detail pages (visible only to admins), and ensuring all components display success/error feedback through toast notifications. We'll also create comprehensive E2E tests to validate the entire feature.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Update Authentication System to Include User Role Information

- Read `app/nextjs/lib/auth.ts` to understand current authentication implementation
- Update MOCK_USERS array to ensure both users have explicit roles ('admin' and 'user')
- Modify `generateToken` function to include user role in the token payload
- Update `getCurrentUser` function to extract and return role from token
- Modify `AuthUser` interface in `types/index.ts` to make role a required field (not optional)
- Update `validateCredentials` to return role information with the AuthUser object
- Read `app/nextjs/contexts/AuthContext.tsx` to verify it properly uses the updated AuthUser type
- Test authentication with both admin and regular user to verify role information is stored and retrieved correctly

### 2. Create Form Validation Utilities

- Create new file `app/nextjs/lib/validation.ts`
- Implement validation functions for:
  - Email format validation (regex pattern)
  - Required field validation (name, email, role, department, location)
  - Username format validation (alphanumeric, min 3 characters)
  - Bio character limit validation (max 500 characters)
  - Join date validation (valid date format, not in future)
  - Status enum validation ('active' or 'inactive')
- Create `validateUserForm` function that returns validation errors object
- Export all validation utilities for use in UserForm component
- Add TypeScript types for validation errors (`UserFormErrors` interface)

### 3. Extend Mock Database with Create and Update Operations

- Read `app/nextjs/lib/mockDb.ts` to understand current implementation
- Add `createUser` function that:
  - Generates unique user ID with 'usr_' prefix (12-character random hex)
  - Creates avatar URL using UI Avatars service with user's name
  - Validates all required fields are present
  - Adds new user to mockUsers array
  - Returns the created user object
- Add `updateUser` function that:
  - Finds user by ID
  - Updates user fields (preserving ID)
  - Replaces user in mockUsers array
  - Returns the updated user object or null if not found
- Add `deleteUser` function for potential future use (removes user by ID)
- Export new functions from mockDb.ts

### 4. Update API Service Layer with User Management Operations

- Read `app/nextjs/lib/api.ts` to understand current API patterns
- Add `createUser` async function that:
  - Accepts User object (without ID)
  - Calls mockDb.createUser with 500ms simulated delay
  - Returns ApiResponse<User> with success/error
  - Includes error handling for validation failures
- Add `updateUser` async function that:
  - Accepts user ID and partial User object
  - Calls mockDb.updateUser with 500ms simulated delay
  - Returns ApiResponse<User> with success/error
  - Handles case where user ID doesn't exist
- Add proper TypeScript types for API function parameters
- Follow existing error handling patterns in api.ts

### 5. Create AdminGuard Component for Route Protection

- Create new file `app/nextjs/components/AdminGuard.tsx`
- Implement AdminGuard component that:
  - Uses useAuth hook to get current user
  - Checks if user is authenticated and has role === 'admin'
  - Shows loading spinner while authentication is being checked
  - Redirects to /dashboard with error toast if user is not admin
  - Renders children only if user is authenticated admin
  - Includes TypeScript props interface for children
- Add proper error messages and user feedback
- Use existing LoadingSpinner component for loading state
- Use useToast hook for access denied messages

### 6. Create Reusable UserForm Component

- Create new file `app/nextjs/components/UserForm.tsx`
- Implement UserForm component with props:
  - `initialData?: Partial<User>` - for edit mode (optional)
  - `mode: 'create' | 'edit'` - to determine form behavior
  - `onSubmit: (userData: Partial<User>) => Promise<void>` - submit handler
  - `onCancel?: () => void` - cancel button handler
  - `isSubmitting?: boolean` - loading state control
- Create form state with useState for all User fields:
  - name, email, username (optional), role, department, location, bio, joinDate, status
- Implement form validation using validation.ts utilities
- Display validation errors inline below each field
- Create consistent styling matching existing UI (Tailwind CSS)
- Include all user fields with appropriate input types:
  - Text inputs for name, email, username
  - Select dropdowns for role (from predefined roles), department (from existing departments), location (from existing locations), status
  - Textarea for bio
  - Date input for joinDate
- Add form submit handler that validates and calls onSubmit prop
- Add cancel button that calls onCancel prop
- Show loading state on submit button when isSubmitting is true
- Use existing UI patterns from login page and other forms
- Make username field optional (only for auth users, can be empty for directory users)

### 7. Create "Create New User" Admin Page

- Create new file `app/nextjs/app/admin/users/new/page.tsx`
- Implement page component that:
  - Wraps content in AdminGuard component for access control
  - Uses 'use client' directive for client-side rendering
  - Renders page header with title "Add New User"
  - Includes UserForm component in create mode
  - Implements handleSubmit that calls api.createUser
  - Shows success toast and redirects to /dashboard on successful creation
  - Shows error toast on failure with specific error message
  - Includes cancel button that navigates back to /dashboard
  - Uses useRouter for navigation
  - Uses useToast for feedback notifications
  - Matches dashboard page styling for consistency
- Add proper TypeScript types and error handling
- Include loading states during API calls

### 8. Create "Edit User" Admin Page

- Create new file `app/nextjs/app/admin/users/[id]/edit/page.tsx`
- Implement page component that:
  - Wraps content in AdminGuard component
  - Uses 'use client' directive
  - Extracts user ID from URL params using Next.js useParams
  - Fetches existing user data on mount using api.getUserById
  - Shows loading spinner while fetching user data
  - Shows error state if user not found
  - Renders page header with title "Edit User: [username]"
  - Includes UserForm component in edit mode with initialData
  - Implements handleSubmit that calls api.updateUser with user ID
  - Shows success toast and redirects to user detail page on success
  - Shows error toast on failure
  - Includes cancel button that navigates back to user detail page
  - Uses useRouter for navigation
  - Uses useToast for feedback
- Handle loading, error, and success states properly
- Add TypeScript types for params and state

### 9. Add "Add New User" Button to Dashboard

- Read and modify `app/nextjs/app/dashboard/page.tsx`
- Add "Add New User" button in the header section next to the logout button
- Button should:
  - Only be visible when user.role === 'admin'
  - Use consistent styling with existing buttons
  - Navigate to /admin/users/new when clicked
  - Have clear label and icon (use "+" icon or text "Add New User")
  - Match existing UI patterns and Tailwind styling
- Position button appropriately in the header layout
- Ensure responsive design works on mobile

### 10. Add Edit Buttons to User Cards

- Read and modify `app/nextjs/components/UserCard.tsx`
- Add optional `showEditButton?: boolean` prop to UserCard
- Add optional `onEdit?: (user: User) => void` callback prop
- When showEditButton is true and onEdit is provided:
  - Display small edit icon button in top-right corner of card
  - Button should navigate to /admin/users/[id]/edit
  - Use subtle styling that appears on hover
  - Include proper ARIA labels for accessibility
- Update card styling to accommodate edit button
- Ensure button doesn't interfere with card click to view details
- Use existing icon libraries or simple SVG for edit icon

### 11. Update Dashboard to Show Edit Buttons for Admins

- Modify `app/nextjs/app/dashboard/page.tsx`
- Pass showEditButton={user?.role === 'admin'} to UserCard components
- Implement handleEdit callback that navigates to edit page
- Ensure edit buttons only appear for admin users
- Test that regular users don't see edit buttons

### 12. Add Edit Button to User Details Page

- Read and modify `app/nextjs/app/users/[id]/page.tsx`
- Add "Edit User" button next to the "Back" button in the header
- Button should:
  - Only be visible when current user role === 'admin'
  - Navigate to /admin/users/[id]/edit
  - Use consistent button styling
  - Include edit icon or text label
- Position appropriately in the page header
- Maintain responsive design

### 13. Create E2E Test File for Admin User Management

- Create new file `.claude/commands/e2e/test_admin_user_management.md`
- Follow the structure and format of existing E2E tests (reference test_auth_login.md and test_user_details_page.md)
- Include test metadata:
  - Test Name: Admin User Management
  - Test ID: test_admin_user_management
  - Application URL: http://localhost:3000
  - Purpose: Validate admin-only user creation, editing, access control, and form validation
- Write comprehensive test steps covering:
  - TypeScript compilation check
  - Start development server
  - Test non-admin user cannot access /admin/users/new (should redirect or show error)
  - Test admin user can access /admin/users/new
  - Test form validation (empty fields, invalid email, etc.)
  - Test successful user creation with all fields
  - Verify new user appears in dashboard
  - Test editing existing user
  - Verify changes are reflected in user list and detail page
  - Test cancel buttons on both create and edit forms
  - Test that edit buttons only appear for admin users
  - Verify toast notifications for success and errors
  - Stop development server
- Include success criteria and failure scenarios
- Specify screenshots to capture at each step
- Define output format matching existing E2E tests
- Include cleanup steps

### 14. Validation Commands - Run All Tests and Builds

- Execute the following validation commands to ensure the feature works correctly with zero regressions:
  - `cd app/nextjs && npx tsc --noEmit` - TypeScript type checking to verify no type errors
  - `cd app/nextjs && npm run lint` - ESLint validation to ensure code quality
  - `cd app/nextjs && npm run build` - Production build to verify build succeeds
- Read `.claude/commands/test_e2e.md` to understand E2E test execution
- Read and execute the new E2E test file `.claude/commands/e2e/test_admin_user_management.md` to validate admin user management functionality
- Manually test the following user flows:
  - Login as admin, create a new user, verify it appears in dashboard
  - Login as admin, edit an existing user, verify changes are saved
  - Login as regular user, verify no edit buttons or add user button appear
  - Try to access /admin/users/new as regular user, verify access is denied
  - Test form validation by submitting empty or invalid data
  - Test cancel buttons on both create and edit forms
- Fix any errors or issues discovered during validation
- Re-run validation commands until all tests pass

## Testing Strategy

### Unit Tests
While this implementation focuses on integration and E2E testing given the Next.js architecture, consider these areas for future unit test coverage:

- **Validation Functions** (lib/validation.ts):
  - Test email format validation with valid and invalid emails
  - Test required field validation returns correct errors
  - Test username format validation (length, characters)
  - Test bio character limit validation
  - Test join date validation (format, future dates)
  - Test status enum validation (only 'active' or 'inactive')

- **Mock Database Functions** (lib/mockDb.ts):
  - Test createUser generates unique IDs
  - Test createUser adds user to array
  - Test updateUser finds and modifies correct user
  - Test updateUser returns null for non-existent ID
  - Test avatar URL generation format

- **AdminGuard Component**:
  - Test renders children when user is admin
  - Test redirects when user is not admin
  - Test shows loading state while checking auth
  - Test displays error message for access denied

- **UserForm Component**:
  - Test form state updates on input change
  - Test validation errors display correctly
  - Test form submits only when valid
  - Test create vs edit mode differences
  - Test cancel button calls callback

### Edge Cases

- **Role-Based Access Control**:
  - Regular user attempts to access /admin/users/new directly via URL
  - Regular user attempts to access /admin/users/[id]/edit directly
  - Unauthenticated user attempts to access admin routes
  - User logs out while on admin page
  - User role changes from admin to user during session

- **Form Validation**:
  - Submit form with all fields empty
  - Submit form with invalid email format
  - Submit form with duplicate user ID (should not be possible)
  - Submit form with username containing special characters
  - Submit form with bio exceeding 500 characters
  - Submit form with join date in the future
  - Submit form with invalid status value

- **Data Persistence**:
  - Create user and immediately navigate away
  - Edit user and browser refresh before save
  - Multiple users editing the same user simultaneously (mock limitation)
  - Create user with same email as existing user

- **UI Edge Cases**:
  - Very long user names breaking card layout
  - Department dropdown with many options
  - Mobile view responsiveness of forms
  - Error toast stacking when multiple errors occur
  - Loading states during slow network simulation

- **Navigation Edge Cases**:
  - Cancel button on partially filled form
  - Browser back button on create/edit pages
  - Direct URL access to edit non-existent user
  - Rapid clicking of submit button

## Acceptance Criteria

- ✅ Admin users can access /admin/users/new page
- ✅ Admin users can access /admin/users/[id]/edit page
- ✅ Regular users are denied access to admin routes with appropriate error message
- ✅ Unauthenticated users are redirected to login when accessing admin routes
- ✅ Create user form includes all required fields: name, email, role, department, location, bio, joinDate, status
- ✅ Edit user form includes all fields and is pre-populated with existing user data
- ✅ Username field is optional on both forms (not all users need auth credentials)
- ✅ Form validation prevents submission with invalid or missing required data
- ✅ Validation errors are displayed inline below each field
- ✅ Success toast notification appears when user is created successfully
- ✅ Success toast notification appears when user is edited successfully
- ✅ Error toast notification appears when user creation/editing fails
- ✅ Created users appear immediately in the dashboard user list
- ✅ Edited users show updated information in the dashboard and detail pages
- ✅ "Add New User" button appears in dashboard header only for admin users
- ✅ Edit buttons appear on user cards only for admin users
- ✅ Edit button appears on user detail page only for admin users
- ✅ Cancel button on create form navigates back to dashboard
- ✅ Cancel button on edit form navigates back to user detail page
- ✅ Form styling is consistent with existing application UI (Tailwind CSS)
- ✅ All pages are responsive and work on mobile, tablet, and desktop
- ✅ TypeScript compilation succeeds with no errors
- ✅ ESLint validation passes with no warnings
- ✅ Production build succeeds
- ✅ E2E tests pass for all user management scenarios
- ✅ No console errors during admin operations
- ✅ Created user IDs are unique and follow 'usr_' prefix pattern
- ✅ Avatar URLs are generated correctly for new users
- ✅ Role dropdown includes all existing roles from mock database
- ✅ Department dropdown includes all existing departments
- ✅ Location dropdown includes all existing locations
- ✅ Status dropdown includes only 'active' and 'inactive' options
- ✅ Join date field uses date input with proper format validation
- ✅ Bio field supports multi-line text input with character limit

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/nextjs && npx tsc --noEmit` - Run TypeScript type checking to verify no type errors
- `cd app/nextjs && npm run lint` - Run ESLint to ensure code quality standards are met
- `cd app/nextjs && npm run build` - Run production build to verify the feature builds successfully
- Read `.claude/commands/test_e2e.md`, then read and execute your new E2E test file `.claude/commands/e2e/test_admin_user_management.md` to validate admin user management functionality works end-to-end
- Manually test admin user creation flow (login as admin, create user, verify in list)
- Manually test admin user editing flow (login as admin, edit user, verify changes)
- Manually test access control (login as regular user, verify no admin features visible)
- Manually test form validation (submit invalid data, verify error messages)
- Verify no console errors or warnings during all operations

## Notes

### Design Decisions

- **Route Structure**: Using `/admin/users/new` and `/admin/users/[id]/edit` follows RESTful conventions and clearly indicates admin-only functionality
- **Reusable Form Component**: Single UserForm component handles both create and edit modes to reduce code duplication and ensure consistency
- **AdminGuard Pattern**: Centralized access control component makes it easy to protect multiple admin routes and provides consistent access denied behavior
- **Mock Database Mutations**: Since we're using a client-side mock database, changes are not persisted across page refreshes - this is acceptable for demonstration purposes
- **Username Optional**: Not all users in the directory need authentication credentials, so username is optional field
- **Role Validation**: Leveraging existing mock database roles rather than hardcoding ensures consistency with existing user data

### Integration Points

This feature integrates with:
- **Authentication System** (lib/auth.ts, AuthContext): Extended to include role information for admin checks
- **Mock User Database** (lib/mockDb.ts): Added create and update operations
- **API Service Layer** (lib/api.ts): Added createUser and updateUser functions
- **Dashboard Page**: Added "Add New User" button and edit buttons on user cards
- **User Details Page**: Added edit button for admins
- **Toast Notifications**: Used for success/error feedback
- **Routing**: New admin routes under /admin/users/

### Future Enhancements

Potential improvements for future iterations:
- **Real Backend Integration**: Replace mock database operations with actual API calls to a backend service
- **Data Persistence**: Store user data in a database (PostgreSQL, MongoDB, etc.) for persistence across sessions
- **User Deletion**: Add ability for admins to soft-delete or hard-delete users with confirmation dialog
- **Bulk Operations**: Import multiple users from CSV, bulk edit capabilities
- **Audit Trail**: Track who created/edited each user and when (createdBy, createdAt, updatedBy, updatedAt fields)
- **Profile Pictures**: Allow admins to upload custom profile pictures instead of using UI Avatars
- **Advanced Validation**: Email uniqueness check, username availability check, password strength requirements for auth users
- **Role-Based Permissions**: More granular permissions beyond just admin/user (e.g., manager can edit users in their department)
- **User Invitation**: Send email invitations to new users with account setup links
- **Password Management**: Set initial passwords for new users, password reset for existing users
- **Advanced Search**: Add search/filter on admin user list before editing
- **Optimistic UI Updates**: Show user in list immediately before API confirms creation
- **Form Auto-save**: Save form progress to localStorage to prevent data loss
- **Department/Role Management**: Allow admins to create new departments and roles
- **User Import/Export**: Export user list to CSV, import users from CSV with validation

### Security Considerations

- **Client-Side Only**: Current implementation only enforces admin checks on the frontend - real implementation needs backend validation
- **Mock Database Limitations**: All users can technically modify the mock database in browser memory - acceptable for demo
- **Token Storage**: Roles are stored in localStorage tokens - production should use httpOnly cookies
- **Input Sanitization**: Basic validation is implemented, but production needs comprehensive sanitization for XSS prevention
- **Rate Limiting**: No rate limiting on user creation - production should prevent spam/abuse
- **Audit Logging**: No audit trail of who made what changes - important for compliance in production

### Migration Path to Real Backend

When ready to integrate with a real backend:
1. Replace `lib/api.ts` createUser/updateUser to call actual REST or GraphQL endpoints
2. Implement server-side admin role validation in API middleware
3. Add proper database models and migrations for user table
4. Implement server-side validation matching client-side rules
5. Add authentication token verification on admin endpoints
6. Replace localStorage tokens with httpOnly cookies
7. Implement proper error handling for network failures and server errors
8. Add audit logging for all admin actions
9. Consider implementing RBAC (Role-Based Access Control) system
10. Keep AdminGuard and UserForm components - only update API layer
