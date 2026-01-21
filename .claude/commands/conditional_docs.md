# Conditional Documentation Guide

This prompt helps you determine what documentation you should read based on the specific changes you need to make in the codebase. Review the conditions below and read the relevant documentation before proceeding with your task.

## Instructions
- Review the task you've been asked to perform
- Check each documentation path in the Conditional Documentation section
- For each path, evaluate if any of the listed conditions apply to your task
  - IMPORTANT: Only read the documentation if any one of the conditions match your task
- IMPORTANT: You don't want to excessively read documentation. Only read the documentation if it's relevant to your task.

## Conditional Documentation

- README.md
  - Conditions:
    - When operating on anything under app/server
    - When operating on anything under app/client
    - When first understanding the project structure
    - When you want to learn the commands to start or stop the server or client

- app/client/src/style.css
  - Conditions:
    - When you need to make changes to the client's style

- .claude/commands/classify_adw.md
  - Conditions:
    - When adding or removing new `adws/adw_*.py` files

- adws/README.md
  - Conditions:
    - When you're operating in the `adws/` directory

- app_docs/feature-490eb6b5-one-click-table-exports.md
  - Conditions:
    - When working with CSV export functionality
    - When implementing table or query result export features
    - When troubleshooting download button functionality
    - When working with pandas-based data export utilities

- app_docs/feature-4c768184-model-upgrades.md
  - Conditions:
    - When working with LLM model configurations
    - When updating OpenAI or Anthropic model versions
    - When troubleshooting SQL query generation accuracy
    - When working with the llm_processor module

- app_docs/feature-f055c4f8-off-white-background.md
  - Conditions:
    - When working with application background styling
    - When modifying CSS color variables or themes
    - When implementing visual design changes to the client application

- app_docs/feature-6445fc8f-light-sky-blue-background.md
  - Conditions:
    - When working with light sky blue background styling
    - When implementing background color changes to light blue variants
    - When troubleshooting visual hierarchy with light blue backgrounds

- app_docs/feature-cc73faf1-upload-button-text.md
  - Conditions:
    - When working with upload button text or labeling
    - When implementing UI text changes for data upload functionality
    - When troubleshooting upload button display or terminology

- app_docs/feature-b855bb98-main-page-header.md
  - Conditions:
    - When working with main page header or title
    - When implementing page-level heading changes or branding
    - When modifying header styling or gradient backgrounds
    - When working with semantic HTML heading hierarchy
    - When implementing responsive header designs

- app_docs/feature-2604eee2-authentication-system.md
  - Conditions:
    - When working with authentication or authorization features
    - When implementing user registration or login functionality
    - When securing API endpoints or adding authentication middleware
    - When troubleshooting JWT token generation or validation
    - When implementing data isolation or per-user data access
    - When working with password hashing or user management
    - When modifying authentication state management on the frontend
    - When implementing protected routes or authentication guards

- app_docs/feature-60c16f2f-nextjs-vercel-setup.md
  - Conditions:
    - When working with Next.js application in app/nextjs/ directory
    - When implementing server-side rendering or Next.js App Router features
    - When configuring Vercel deployment or security headers
    - When troubleshooting Next.js build, TypeScript, or Tailwind CSS issues
    - When setting up new Next.js components, pages, or layouts
    - When working with Next.js environment variables (NEXT_PUBLIC_ prefix)
    - When integrating Next.js with the existing FastAPI or Vite stack
    - When running multiple applications on different ports (3000, 5173, 8000)

- app_docs/feature-ca241132-auth-system.md
  - Conditions:
    - When working with authentication in the Next.js application
    - When implementing login, logout, or session management features
    - When working with protected routes or authentication middleware
    - When troubleshooting JWT-like token generation or validation
    - When implementing AuthContext or useAuth hook
    - When working with localStorage-based session persistence
    - When securing pages or implementing authentication redirects
    - When adding or modifying mock user credentials
    - When integrating real backend authentication to replace mock system

- app_docs/feature-8e7e99d7-mock-user-database.md
  - Conditions:
    - When working with user profile data or user-related features
    - When implementing user directory, profile pages, or team dashboards
    - When needing realistic test data for user-related functionality
    - When working with the User type interface in types/index.ts
    - When querying or filtering users by role, department, location, or status
    - When implementing user search or listing functionality
    - When integrating user avatars or profile information in components
    - When extending or modifying the mock user database structure

- app_docs/feature-287fdce1-mock-backend-api.md
  - Conditions:
    - When implementing API calls or data fetching in frontend components
    - When working with asynchronous data loading or API integration patterns
    - When testing loading states, error handling, or network delays
    - When implementing pagination for user lists or search results
    - When building search functionality across user data (name, email, role)
    - When filtering users by department or other criteria
    - When working with API response formatting or error handling patterns
    - When migrating from mock API to real backend implementation
    - When implementing React components that fetch user data
    - When troubleshooting API-related issues in the Next.js application

- app_docs/feature-4c8ea440-dashboard-user-profiles.md
  - Conditions:
    - When working with the dashboard page at /dashboard route
    - When implementing user profile card display or grid layouts
    - When building search or filter functionality for user lists
    - When working with responsive grid layouts in Next.js applications
    - When implementing loading, error, or empty state UI patterns
    - When creating reusable UI components (cards, search bars, filters, spinners)
    - When integrating mock API data with frontend components
    - When implementing real-time client-side filtering
    - When troubleshooting dashboard rendering or user card display issues
    - When extending dashboard functionality with sorting or additional filters

- app_docs/feature-216fce1d-user-card-component.md
  - Conditions:
    - When working with the UserCard component
    - When implementing avatar fallback functionality or user initials display
    - When adding location display to user profile cards
    - When implementing click-to-view-details functionality for cards
    - When enhancing component accessibility with ARIA labels
    - When implementing keyboard navigation for interactive cards
    - When troubleshooting avatar loading errors or image fallbacks
    - When creating reusable card components with optional interactivity
    - When working with Next.js Image component error handling
    - When implementing responsive card layouts for user profiles

- app_docs/feature-20baf7ca-dashboard-search-filter.md
  - Conditions:
    - When implementing search debouncing or optimizing search performance
    - When adding clear buttons or reset functionality to search inputs
    - When creating active filters indicators or filter chip components
    - When implementing URL query parameter synchronization for shareable views
    - When working with the SearchBar component enhancements
    - When building filter removal or clear all functionality
    - When using the use-debounce library in React components
    - When implementing Next.js useSearchParams or useRouter for state management
    - When troubleshooting dashboard search or filter functionality
    - When enhancing user experience with visual filter feedback

- app_docs/feature-91018a17-responsive-navigation-layout.md
  - Conditions:
    - When working with navigation components or layout structure
    - When implementing responsive design for mobile and desktop views
    - When building hamburger menus or mobile navigation drawers
    - When creating user profile dropdowns or menu components
    - When implementing click-outside detection or menu interactions
    - When working with footer components across the application
    - When adding keyboard navigation support (Escape key handling)
    - When implementing ARIA labels for accessibility in navigation
    - When troubleshooting mobile menu animations or transitions
    - When working with authentication-aware navigation links
    - When using useClickOutside hook for menu functionality

- app_docs/feature-cef3a9ed-loading-states-error-handling.md
  - Conditions:
    - When implementing loading states or skeleton loaders
    - When adding toast notifications or user feedback mechanisms
    - When implementing error boundaries or error handling
    - When working with retry logic for failed API calls
    - When implementing offline detection or network status monitoring
    - When creating custom 404 pages or error pages
    - When working with the useToast or useOnlineStatus hooks
    - When integrating ToastContext or ToastProvider in components
    - When troubleshooting error handling, loading states, or user feedback
    - When implementing auto-dismiss notifications or progress indicators
    - When adding exponential backoff retry mechanisms
    - When working with error categorization (network, auth, validation errors)
    - When enhancing user experience with visual feedback during async operations

- app_docs/chore-7fb918fe-comprehensive-documentation.md
  - Conditions:
    - When creating or updating project documentation (README, guides, or architecture docs)
    - When preparing the application for deployment to Vercel
    - When documenting the ADW (AI Developer Workflow) system or agentic AI development process
    - When writing feature documentation or updating documentation standards
    - When troubleshooting Vercel deployment or configuration issues
    - When understanding the project structure and documentation organization
    - When documenting mock credentials or test data for the application
    - When explaining autonomous AI development patterns and agent decision-making
    - When working with ARCHITECTURE.md or DEPLOYMENT.md files
    - When preparing documentation for challenge submissions or showcases

- app_docs/feature-b742df28-avatar-loading-fix.md
  - Conditions:
    - When troubleshooting Next.js Image component with external image APIs
    - When fixing 400 Bad Request errors for image loading
    - When working with unoptimized images or bypassing Next.js image optimization
    - When integrating dynamic image generation APIs (ui-avatars.com, DiceBear, etc.)
    - When implementing avatar images in Next.js applications
    - When dealing with Next.js image optimization incompatibilities
    - When creating E2E tests for image loading validation
    - When investigating remotePatterns configuration issues

- app_docs/feature-f6170557-hover-effect-cards.md
  - Conditions:
    - When implementing hover effects or interactive states for UI components
    - When working with UserCard component hover animations
    - When adding visual feedback to cards, buttons, or interactive elements
    - When implementing multi-property CSS transitions (shadow, scale, background, border)
    - When working with Tailwind CSS hover utilities or transition classes
    - When creating smooth animations with GPU-accelerated properties
    - When implementing accessibility-compliant animations (prefers-reduced-motion)
    - When troubleshooting hover state performance or janky animations
    - When creating E2E tests for visual hover effects validation
    - When enhancing user card interactions on the dashboard

- app_docs/feature-77a988ed-about-page.md
  - Conditions:
    - When working with the About page at /about route
    - When implementing informational or marketing pages in Next.js
    - When creating feature showcase sections with grid layouts
    - When documenting project tech stack or architecture
    - When implementing gradient backgrounds or highlighted content sections
    - When creating public (non-authenticated) pages
    - When working with responsive multi-column card layouts
    - When documenting the ADW system or AI-driven development approach
    - When implementing getting started sections with navigation links
    - When troubleshooting About page content or layout issues
- app_docs/feature-d54beab1-user-details-page.md
  - Conditions:
    - When working with user details page at /users/[id] route
    - When implementing dynamic routes in Next.js with [id] parameters
    - When adding click handlers to user cards for navigation to detail views
    - When displaying comprehensive user information (profile, contact, organization)
    - When implementing back navigation from detail pages to dashboard
    - When working with shareable URL routes for user profiles
    - When implementing avatar fallback functionality with user initials
    - When formatting dates for user-friendly display (join date)
    - When creating detail views for list items with authentication guards
    - When troubleshooting user details page navigation or data display
- app_docs/feature-a6dbe942-search-bar-label.md
  - Conditions:
    - When working with the SearchBar component styling or structure
    - When implementing form labels or label-input associations
    - When aligning components with similar visual elements (filters, inputs)
    - When adding visible labels to form inputs for accessibility
    - When ensuring consistent label styling across form components
    - When troubleshooting vertical alignment issues between filter components
    - When implementing responsive layouts with labeled form controls
    - When following accessibility best practices for form inputs
    - When creating E2E tests for label visibility and alignment

- app_docs/feature-4dbe98e6-fixed-header-user-list.md
  - Conditions:
    - When working with fixed header or sticky navigation components
    - When implementing position: fixed CSS layouts
    - When adding z-index layering for navigation elements
    - When adjusting content padding to account for fixed headers
    - When rebranding application names or titles across components
    - When implementing scroll behavior with fixed navigation
    - When troubleshooting header positioning or content overlap issues
    - When working with Navigation component fixed positioning
    - When ensuring responsive behavior works with fixed headers
    - When creating E2E tests for fixed header behavior validation
