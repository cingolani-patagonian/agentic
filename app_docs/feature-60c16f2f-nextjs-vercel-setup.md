# Next.js Application with Vercel Deployment Configuration

**ADW ID:** 60c16f2f
**Date:** 2026-01-16
**Specification:** specs/issue-1-adw-60c16f2f-sdlc_planner-nextjs-vercel-setup.md

## Overview

A production-ready Next.js 14 application with TypeScript, Tailwind CSS, and Vercel deployment configuration. This setup provides a modern server-side rendered React application that coexists with the existing FastAPI backend and runs on port 3000. The application follows Next.js App Router best practices with strict TypeScript configuration, security headers, and optimized build settings.

## What Was Built

- **Next.js 14 Application** with App Router architecture in `app/nextjs/` directory
- **TypeScript Configuration** with strict mode and path aliases for type safety
- **Tailwind CSS Integration** with custom theme, CSS variables, and dark mode support
- **Vercel Deployment Setup** with security headers and optimized build configuration
- **Project Structure** with organized directories for app/, components/, lib/, and types/
- **Navigation Component** for site-wide navigation with responsive design
- **Environment Variable Management** with template for configuration
- **Comprehensive Documentation** for setup, development, and deployment
- **E2E Test Specification** to validate the complete setup
- **Python FastAPI Server** with basic setup and placeholder tests

## Technical Implementation

### Files Modified

#### Next.js Application Core
- `app/nextjs/package.json`: Dependencies for Next.js 14.2+, React 18.3+, TypeScript 5.6+, Tailwind CSS 3.4+
- `app/nextjs/next.config.js`: React strict mode, security settings, image optimization (AVIF/WebP)
- `app/nextjs/tsconfig.json`: Strict TypeScript configuration with path aliases (@/ for root)
- `app/nextjs/tailwind.config.ts`: Custom Tailwind configuration with dark mode support
- `app/nextjs/vercel.json`: Vercel deployment config with security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

#### Application Structure
- `app/nextjs/app/layout.tsx`: Root layout with metadata, navigation integration, and HTML structure
- `app/nextjs/app/page.tsx`: Home page showcasing SSR, TypeScript, and Tailwind features
- `app/nextjs/app/globals.css`: Global styles with Tailwind directives and CSS custom properties
- `app/nextjs/components/Navigation.tsx`: Responsive navigation component
- `app/nextjs/types/index.ts`: Common TypeScript type definitions
- `app/nextjs/lib/utils.ts`: Utility functions and helper methods

#### Configuration and Documentation
- `app/nextjs/.env.local.example`: Environment variable template with NEXT_PUBLIC_ prefix examples
- `app/nextjs/README.md`: Detailed setup and deployment instructions
- `README.md` (root): Updated to document Next.js alongside existing FastAPI/Vite stack
- `.gitignore`: Updated to exclude Next.js build artifacts
- `.claude/commands/e2e/test_nextjs_setup.md`: E2E test specification for validation

#### Python Server Setup
- `app/server/pyproject.toml`: FastAPI project configuration with pytest and uvicorn
- `app/server/server.py`: FastAPI server entry point
- `app/server/core/__init__.py`: Core module initialization
- `app/server/tests/test_placeholder.py`: Placeholder test suite

### Key Changes

- **Complete Next.js 14 setup** with 8,000+ lines of code across 34 files implementing a production-ready application
- **Multi-stack architecture** supporting Next.js (port 3000), FastAPI (port 8000), and Vite (port 5173) simultaneously
- **Security-first configuration** with defense-in-depth headers in both next.config.js and vercel.json
- **Type-safe development** with TypeScript strict mode enforced across all components and utilities
- **Production optimization** with image format optimization, compression, and standalone build support
- **Comprehensive testing strategy** with E2E test specifications and Python server test infrastructure

## How to Use

### Initial Setup

1. **Install Dependencies**
   ```bash
   cd app/nextjs
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

### Development

1. **Start Development Server**
   ```bash
   cd app/nextjs
   npm run dev
   ```
   Application runs at http://localhost:3000

2. **Verify TypeScript**
   ```bash
   cd app/nextjs
   npx tsc --noEmit
   ```

3. **Run Linting**
   ```bash
   cd app/nextjs
   npm run lint
   ```

### Building for Production

1. **Create Production Build**
   ```bash
   cd app/nextjs
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd app/nextjs
   npm start
   ```

### Deployment to Vercel

**Automatic Deployment:**
- Connect your repository to Vercel
- Vercel automatically detects the Next.js application
- Each push to main branch triggers a deployment

**Manual Deployment:**
```bash
cd app/nextjs
vercel
```

### Running with Full Stack

Run all applications simultaneously:
- **FastAPI Backend:** Port 8000
- **Vite Frontend:** Port 5173
- **Next.js Application:** Port 3000

Each application runs independently without port conflicts.

## Configuration

### Environment Variables

Create `.env.local` based on `.env.local.example`:

```bash
# Application Configuration
NEXT_PUBLIC_APP_NAME=My Next.js App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Feature Flags
NEXT_PUBLIC_FEATURE_X=true
```

**Important:** Browser-accessible variables must be prefixed with `NEXT_PUBLIC_`

### Vercel Configuration

Security headers configured in `vercel.json`:
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables browser XSS protection

Build settings:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Framework:** Next.js (auto-detected)
- **Region:** IAD1 (US East)

### TypeScript Configuration

Path aliases configured in `tsconfig.json`:
```typescript
import { MyComponent } from '@/components/MyComponent'
import { myUtil } from '@/lib/utils'
```

Strict mode enabled for maximum type safety.

### Tailwind CSS

Custom theme with:
- CSS custom properties for theming
- Dark mode support (media query based)
- Responsive breakpoints
- Custom color palette

## Testing

### Validation Commands

Execute in order to validate setup:

1. **Install Dependencies**
   ```bash
   cd app/nextjs && npm install
   ```

2. **TypeScript Check**
   ```bash
   cd app/nextjs && npx tsc --noEmit
   ```

3. **Lint Check**
   ```bash
   cd app/nextjs && npm run lint
   ```

4. **Production Build**
   ```bash
   cd app/nextjs && npm run build
   ```

5. **Server Tests (Zero Regressions)**
   ```bash
   cd app/server && uv run pytest
   ```

6. **E2E Test**
   ```bash
   # Read and execute test specification
   # .claude/commands/e2e/test_nextjs_setup.md
   ```

### E2E Test Coverage

The E2E test specification validates:
- Development server starts on port 3000
- Home page renders successfully
- Navigation component is visible and functional
- Tailwind CSS styles are applied correctly
- TypeScript compilation succeeds with zero errors
- Production build completes without warnings
- Application is deployment-ready for Vercel

## Notes

### Architecture Decisions

- **App Router vs Pages Router:** Using App Router (app/ directory) for modern Next.js patterns, server components, and optimized bundling
- **Package Manager:** npm chosen for consistency (not yarn or pnpm)
- **Port Selection:** Port 3000 for Next.js to avoid conflicts with FastAPI (8000) and Vite (5173)
- **Security Headers:** Defense-in-depth approach with headers in both next.config.js and vercel.json

### Development Best Practices

- All environment variables for the browser must be prefixed with `NEXT_PUBLIC_`
- TypeScript strict mode enforces type safety - no implicit any types
- React 18+ server components are the default in App Router
- ESLint configuration extends Next.js standards for consistency
- Tailwind CSS uses CSS variables for easy theming

### Production Considerations

- Image optimization enabled for AVIF and WebP formats
- Compression enabled in next.config.js
- `poweredByHeader: false` removes X-Powered-By header
- Security headers protect against common vulnerabilities
- Standalone build option available for containerized deployments

### Future Enhancements

- Consider adding Playwright tests for comprehensive E2E testing
- Implement React component tests using Jest and React Testing Library
- Add utility function tests in lib/utils.ts
- Configure API routes if backend functionality is needed in Next.js
- Set up continuous integration for automated testing
- Implement internationalization (i18n) if multi-language support is required

### Integration Notes

- The Next.js setup does not affect the existing FastAPI backend or Vite frontend
- All three applications can run simultaneously without conflicts
- Shared TypeScript types can be defined in types/index.ts for cross-application consistency
- Consider using a monorepo tool like Turborepo if the stack grows more complex
