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