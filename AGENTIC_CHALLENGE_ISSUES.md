# Agentic AI Challenge - GitHub Issues

Este archivo contiene todas las issues que deben ser creadas en GitHub para desarrollar la aplicación del desafío usando agentes autónomos (ADW).

## Instrucciones de Uso

1. Crea cada issue en GitHub con el título y descripción proporcionados
2. El sistema ADW procesará automáticamente cada issue
3. Los agentes autónomos generarán el código e implementarán las soluciones
4. Cada issue resultará en un PR automático

---

## Issue #1: Project Setup and Vercel Configuration

**Title:** Setup Next.js project with Vercel deployment configuration

**Description:**
Initialize a new Next.js project optimized for Vercel deployment with TypeScript support.

**Requirements:**
- Create Next.js 14+ application with TypeScript
- Configure for Vercel deployment (vercel.json if needed)
- Setup basic project structure:
  - `/app` directory for pages
  - `/components` directory for React components
  - `/lib` directory for utilities
  - `/types` directory for TypeScript types
- Add Tailwind CSS for styling
- Create basic layout with navigation
- Add README.md with deployment instructions

**Acceptance Criteria:**
- Project builds successfully
- Can be deployed to Vercel
- TypeScript configured properly
- Tailwind CSS working

**Labels:** feature, setup

**Workflow:** adw_sdlc_iso

---

## Issue #2: Authentication System with Login Page

**Title:** Implement authentication system with login page

**Description:**
Create a complete authentication system with a login page for the user profiles application.

**Requirements:**
- Create login page at `/login` route
- Implement mock authentication service:
  - Accept hardcoded credentials (username: "admin", password: "admin123")
  - Generate and store JWT-like token in localStorage
  - Session management
- Protected route middleware to secure dashboard
- Redirect to login if not authenticated
- Redirect to dashboard if already authenticated
- Login form with:
  - Username input field
  - Password input field
  - Submit button
  - Form validation
  - Error messages for invalid credentials
- Logout functionality
- Responsive design with Tailwind CSS

**Mock Credentials:**
```typescript
const MOCK_USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" }
];
```

**Acceptance Criteria:**
- Login page is accessible at `/login`
- Valid credentials redirect to dashboard
- Invalid credentials show error message
- Protected routes redirect unauthenticated users to login
- Logout clears session and redirects to login
- UI is responsive and user-friendly

**Labels:** feature, authentication

**Workflow:** adw_sdlc_iso

---

## Issue #3: Mock Database for User Profiles

**Title:** Create mock database with user profile data

**Description:**
Implement a mock database service with realistic user profile data.

**Requirements:**
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

**Example User Object:**
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

**Acceptance Criteria:**
- Mock database contains 20-30 user profiles
- All fields are populated with realistic data
- TypeScript types are properly defined
- Data is easily accessible from other modules

**Labels:** feature, database

**Workflow:** adw_sdlc_iso

---

## Issue #4: Mock Backend API Service

**Title:** Implement mock backend API service for user profiles

**Description:**
Create a mock backend API service that simulates database queries and returns user profile data.

**Requirements:**
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

**API Response Format:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

**Acceptance Criteria:**
- All API functions work correctly
- Simulated delays make it feel like real API
- Error handling is implemented
- TypeScript types are properly defined
- Functions can be imported and used in components

**Labels:** feature, backend

**Workflow:** adw_sdlc_iso

---

## Issue #5: User Profiles Dashboard Page

**Title:** Create dashboard page with user profile cards

**Description:**
Build the main dashboard page that displays user profiles as cards in a responsive grid layout.

**Requirements:**
- Create dashboard page at `/dashboard` route
- Protected route - requires authentication
- Fetch user data from mock API service
- Display users as cards in responsive grid:
  - 1 column on mobile
  - 2 columns on tablet
  - 3-4 columns on desktop
- Each card should display:
  - Avatar image
  - Name
  - Role
  - Department
  - Email
  - Status badge (active/inactive)
- Loading state while fetching data
- Empty state if no users found
- Error state if API fails
- Header with:
  - App title
  - User info (logged in user)
  - Logout button
- Search functionality to filter users
- Department filter dropdown
- Responsive design with Tailwind CSS

**Acceptance Criteria:**
- Dashboard displays all user profiles as cards
- Cards are responsive and look good on all screen sizes
- Search and filter functionality works
- Loading, empty, and error states are handled
- Logout button works correctly
- Only accessible when authenticated

**Labels:** feature, frontend

**Workflow:** adw_sdlc_iso

---

## Issue #6: User Profile Card Component

**Title:** Create reusable UserCard component

**Description:**
Build a reusable card component to display individual user profiles with consistent styling.

**Requirements:**
- Create component at `/components/UserCard.tsx`
- Accept user object as prop
- Display user information:
  - Avatar with fallback
  - Name (bold, larger text)
  - Role and department
  - Email (with mailto link)
  - Location
  - Status badge with color coding:
    - Green for active
    - Gray for inactive
- Hover effects for better UX
- Click to view more details (optional modal)
- Responsive design
- Accessible (semantic HTML, ARIA labels)

**Acceptance Criteria:**
- Component is reusable and well-structured
- All user information displays correctly
- Status badges have appropriate colors
- Hover effects work smoothly
- Component is accessible
- TypeScript props are properly typed

**Labels:** feature, component

**Workflow:** adw_sdlc_iso

---

## Issue #7: Search and Filter Functionality

**Title:** Add search and filter capabilities to dashboard

**Description:**
Implement search and filtering features to help users find specific profiles quickly.

**Requirements:**
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

**Acceptance Criteria:**
- Search filters results in real-time
- Department filter works correctly
- Multiple filters can be combined
- Clear/reset functionality works
- UI feedback shows active filters
- Performance is smooth even with many users

**Labels:** feature, enhancement

**Workflow:** adw_sdlc_iso

---

## Issue #8: Responsive Navigation and Layout

**Title:** Implement responsive navigation and layout structure

**Description:**
Create a consistent navigation system and layout structure for the application.

**Requirements:**
- Create layout component with:
  - Header with app branding
  - Navigation links (conditionally shown when authenticated)
  - User menu with logout option
  - Responsive hamburger menu for mobile
- Footer component with:
  - Copyright information
  - Links to GitHub repo
- Consistent padding and spacing
- Mobile-first responsive design
- Smooth transitions and animations
- Dark mode toggle (optional)

**Acceptance Criteria:**
- Navigation works on all screen sizes
- Mobile menu opens/closes smoothly
- Layout is consistent across all pages
- User menu shows current user info
- Logout functionality accessible from navigation

**Labels:** feature, ui

**Workflow:** adw_sdlc_iso

---

## Issue #9: Loading States and Error Handling

**Title:** Implement comprehensive loading states and error handling

**Description:**
Add proper loading states, error handling, and user feedback throughout the application.

**Requirements:**
- Loading spinner component
- Skeleton loaders for cards while fetching data
- Error boundary component for catching React errors
- Toast notifications for user feedback:
  - Success messages
  - Error messages
  - Info messages
- Retry functionality for failed API calls
- Graceful degradation when features fail
- Offline detection and message
- 404 page for invalid routes

**Acceptance Criteria:**
- Loading states are shown during async operations
- Errors are caught and displayed user-friendly
- Users receive feedback for their actions
- Failed operations can be retried
- 404 page displays for invalid routes

**Labels:** feature, ux

**Workflow:** adw_sdlc_iso

---

## Issue #10: Documentation and Deployment Guide

**Title:** Create comprehensive documentation and Vercel deployment guide

**Description:**
Document the application architecture, setup process, and deployment to Vercel.

**Requirements:**
- Update README.md with:
  - Project overview
  - Features list
  - Tech stack
  - Local development setup
  - Mock credentials for testing
  - Project structure explanation
- Create DEPLOYMENT.md with:
  - Step-by-step Vercel deployment guide
  - Environment variables (if any)
  - Post-deployment verification steps
  - Troubleshooting common issues
- Add code comments to complex functions
- Create ARCHITECTURE.md explaining:
  - ADW workflow used for development
  - Agentic AI approach
  - How issues were processed
  - Agent autonomous behavior evidence
- Vercel deployment configuration:
  - Ensure vercel.json is properly configured
  - Set up environment variables in Vercel dashboard
  - Configure build settings

**Acceptance Criteria:**
- README.md is comprehensive and clear
- DEPLOYMENT.md guides successful Vercel deployment
- ARCHITECTURE.md explains the agentic AI development process
- Application successfully deploys to Vercel
- Documentation includes all necessary information for the challenge submission

**Labels:** documentation, deployment

**Workflow:** adw_sdlc_iso

---

## Workflow Execution Order

Execute issues in this order for optimal development flow:

1. **Issue #1** - Project setup (foundation)
2. **Issue #3** - Mock database (data layer)
3. **Issue #4** - Mock API service (business logic)
4. **Issue #2** - Authentication system (security)
5. **Issue #6** - UserCard component (UI building block)
6. **Issue #5** - Dashboard page (main feature)
7. **Issue #7** - Search and filters (enhancement)
8. **Issue #8** - Navigation and layout (polish)
9. **Issue #9** - Loading states and errors (robustness)
10. **Issue #10** - Documentation and deployment (delivery)

---

## ADW Execution Commands

Para ejecutar cada issue con ADW:

```bash
cd adws/

# Issue #1
uv run adw_sdlc_iso.py 1

# Issue #2
uv run adw_sdlc_iso.py 2

# Issue #3
uv run adw_sdlc_iso.py 3

# ... y así sucesivamente para cada issue
```

## Evidencia de Agentes Autónomos

El uso de agentes autónomos se evidenciará en:

1. **Commits automáticos**: Cada PR mostrará commits generados por Claude Sonnet 4.5
2. **PRs generados automáticamente**: Con descripciones técnicas detalladas
3. **Logs de agentes**: En el directorio `agents/{adw_id}/` se guardan los logs de cada agente
4. **Branch naming**: Branches automáticos con formato `feat-{issue}-{adw_id}-{descripción}`
5. **GitHub comments**: El sistema ADW comenta en cada issue con su progreso

## Información para el Desafío

Después de completar todas las issues:

**Subject del email:** Final Agentic AI Challenge

**Contenido del email:**
```
URL de issues de GitHub: https://github.com/cingolani-patagonian/agentic/issues
Issues resueltas: #1, #2, #3, #4, #5, #6, #7, #8, #9, #10

URL de Vercel: [URL generada después del deployment]

URL del repositorio: https://github.com/cingolani-patagonian/agentic

Evidencia de agentes autónomos:
- Todas las issues fueron procesadas por el sistema ADW (AI Developer Workflow)
- Los commits muestran co-autoría de "Claude Sonnet 4.5"
- Los PRs fueron generados automáticamente por agentes
- Los logs de ejecución de agentes están disponibles en el directorio agents/
```
