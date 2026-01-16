# Loading States and Error Handling

**ADW ID:** cef3a9ed
**Date:** 2026-01-16
**Specification:** specs/issue-9-adw-cef3a9ed-sdlc_planner-loading-states-error-handling.md

## Overview

Comprehensive loading states, error handling, and user feedback system that significantly improves user experience by providing clear visual feedback during async operations, preventing error crashes, and ensuring users always understand the current state of the application. The implementation includes skeleton loaders, toast notifications, error boundaries, offline detection, retry logic, and a custom 404 page.

## What Was Built

- **Skeleton Loader Component** - Smooth loading transitions with card, text, avatar, and line variants
- **Toast Notification System** - Global toast notifications for success, error, info, and warning messages with auto-dismiss and manual close functionality
- **Error Boundary Component** - React error boundary that catches rendering errors and displays user-friendly fallback UI
- **Offline Detection** - Custom hook and banner component that detects and displays network connectivity status
- **Retry Logic** - Automatic retry mechanism for failed API calls with exponential backoff
- **Error Handling Utilities** - Comprehensive error categorization, formatting, and logging utilities
- **Custom 404 Page** - User-friendly not found page with navigation options
- **Enhanced Page Integrations** - Dashboard and login pages updated to use new error handling and loading components

## Technical Implementation

### New Components Created

- `app/nextjs/components/SkeletonLoader.tsx` - Skeleton loader with multiple variants (card, text, avatar, line)
- `app/nextjs/components/Toast.tsx` - Individual toast notification with auto-dismiss timer and progress bar
- `app/nextjs/components/ToastContainer.tsx` - Container for managing multiple toast notifications
- `app/nextjs/components/ErrorBoundary.tsx` - React class component for catching render errors
- `app/nextjs/components/OfflineBanner.tsx` - Banner that displays when user goes offline

### New Hooks Created

- `app/nextjs/hooks/useToast.tsx` - Hook providing toast notification methods (showSuccess, showError, showInfo, showWarning)
- `app/nextjs/hooks/useOnlineStatus.tsx` - Hook for detecting network connectivity using browser APIs

### New Contexts Created

- `app/nextjs/contexts/ToastContext.tsx` - Global context for managing toast notifications state

### New Utilities Created

- `app/nextjs/lib/errorHandling.ts` - Error utilities (formatErrorMessage, logError, isNetworkError, getErrorType)
- `app/nextjs/lib/retryLogic.ts` - Retry logic with exponential backoff (withRetry function)

### Files Modified

- `app/nextjs/app/layout.tsx` - Integrated ToastProvider, ErrorBoundary, and OfflineBanner
- `app/nextjs/app/dashboard/page.tsx` - Added skeleton loaders during data fetch and toast notifications for errors
- `app/nextjs/app/login/page.tsx` - Replaced inline error messages with toast notifications
- `app/nextjs/contexts/AuthContext.tsx` - Added toast notifications for auth actions (login success, logout, errors)
- `app/nextjs/lib/api.ts` - Enhanced with retry logic and better error handling
- `app/nextjs/app/globals.css` - Added animations for toast slide-in and slide-out
- `app/nextjs/types/index.ts` - Added TypeScript types for toasts, error boundaries, and retry configurations
- `app/nextjs/app/not-found.tsx` - Created custom 404 page

### Key Changes

- **Skeleton loaders replace spinners** during dashboard data fetch, showing 12 card skeletons in a grid layout matching the actual user cards
- **Toast notification system** provides non-intrusive feedback for all user actions with auto-dismiss after 5 seconds and manual close option
- **Error boundary** wraps the application at layout level to catch unexpected React errors and display fallback UI with retry and navigation options
- **Offline detection** monitors browser online/offline events and displays a prominent banner when network is lost
- **Retry logic** automatically retries failed API calls up to 3 times with exponential backoff (1s, 2s, 4s delays) but only for network errors
- **Error handling utilities** categorize errors into network, auth, validation, and unknown types for appropriate handling
- **Dashboard retry button** now fetches fresh data and shows success toast instead of just reloading the page

## How to Use

### Displaying Toast Notifications

Use the `useToast` hook in any component to show notifications:

```tsx
import { useToast } from '@/hooks/useToast'

function MyComponent() {
  const { showSuccess, showError, showInfo, showWarning } = useToast()

  // Show success message
  showSuccess('Operation completed successfully!')

  // Show error message
  showError('Something went wrong. Please try again.')

  // Show info message
  showInfo('Your session will expire in 5 minutes.')

  // Show warning message
  showWarning('This action cannot be undone.')
}
```

### Using Skeleton Loaders

Replace loading spinners with skeleton loaders for better UX:

```tsx
import { SkeletonLoader } from '@/components/SkeletonLoader'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <SkeletonLoader variant="card" count={12} />
  }

  // Render actual content
}
```

Available variants:
- `card` - Full user card skeleton (grid layout for multiple cards)
- `text` - Text lines with varying widths
- `avatar` - Circular avatar skeleton
- `line` - Simple rectangular skeleton

### Adding Error Boundaries

Error boundaries are already integrated at the root layout level, but you can add more granular error boundaries:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={<CustomErrorFallback />}
      onError={(error, errorInfo) => {
        // Custom error handling
      }}
    >
      {/* Components that might throw errors */}
    </ErrorBoundary>
  )
}
```

### Using Retry Logic

The retry logic is integrated into the API service, but you can use it directly:

```tsx
import { withRetry } from '@/lib/retryLogic'

async function fetchData() {
  const result = await withRetry(
    () => fetch('/api/data').then(r => r.json()),
    { maxRetries: 3, delay: 1000, backoffMultiplier: 2 }
  )

  if (result.success) {
    // Use result.data
  } else {
    // Handle result.error
  }
}
```

### Detecting Online Status

Use the `useOnlineStatus` hook to detect network connectivity:

```tsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

function MyComponent() {
  const isOnline = useOnlineStatus()

  return (
    <div>
      {isOnline ? 'Connected' : 'Offline'}
    </div>
  )
}
```

## Configuration

### Toast Duration

Toast notifications auto-dismiss after 5 seconds by default. This can be customized when adding toasts:

```tsx
const { addToast } = useToast()

addToast({
  id: crypto.randomUUID(),
  type: 'success',
  message: 'Custom message',
  duration: 10000 // 10 seconds
})
```

### Retry Configuration

Default retry configuration:
- **maxRetries**: 3 attempts
- **delay**: 1000ms (1 second)
- **backoffMultiplier**: 2 (exponential backoff: 1s, 2s, 4s)

Only network errors are retried. Auth, validation, and unknown errors fail immediately.

### Error Logging

In development, errors are logged to the console with full details. In production, only the error message is logged (can be configured to integrate with Sentry or similar services).

## Testing

### E2E Testing

A comprehensive E2E test file was created: `.claude/commands/e2e/test_loading_error_handling.md`

Test coverage includes:
- Skeleton loaders display during data fetch
- Toast notifications for success/error/info scenarios
- Error boundary catches rendering errors
- Offline banner appears when network is lost
- 404 page displays for invalid routes
- Retry logic works with failed API calls
- Toast auto-dismiss and manual close functionality
- Error boundary reset and navigation buttons

### Manual Testing

1. **Skeleton Loaders**: Navigate to dashboard and observe card skeletons during initial load
2. **Toast Notifications**: Trigger login/logout actions to see success and error toasts
3. **Error Boundary**: Modify code to throw an error and verify fallback UI appears
4. **Offline Banner**: Toggle network in browser dev tools to see offline banner
5. **404 Page**: Navigate to `/invalid-route` to see custom 404 page
6. **Retry Logic**: Simulate network failure to test automatic retry with exponential backoff

### Validation Commands

```bash
# TypeScript compilation
cd app/nextjs && npx tsc --noEmit

# Linting
cd app/nextjs && npm run lint

# Production build
cd app/nextjs && npm run build

# E2E tests
# Read and execute .claude/commands/e2e/test_loading_error_handling.md
```

## Notes

### Design Decisions

- **Toast over inline errors**: Toast notifications provide better UX by not disrupting the layout and being non-intrusive
- **Skeleton over spinners**: Skeleton loaders show content structure during loading, reducing perceived load time
- **Error boundary fallback**: Provides user-friendly error page instead of blank screen or cryptic error messages
- **Smart retry logic**: Only retries network errors to avoid unnecessarily retrying validation or auth errors
- **Exponential backoff**: Prevents overwhelming the server during outages by increasing delay between retries

### Accessibility

- Toast notifications use ARIA live regions for screen reader announcements
- Error boundary fallback includes keyboard navigation support
- All animations respect `prefers-reduced-motion` media query
- Color contrast meets WCAG AA standards for all toast types

### Performance

- Toast animations use CSS transforms for hardware acceleration
- Skeleton loaders use CSS animations (no JavaScript)
- Error boundary has minimal performance impact (only catches errors)
- Offline detection uses native browser APIs (no polling)

### Browser Compatibility

- Toast notifications: All modern browsers
- Error boundaries: React 16.8+
- Online/offline detection: All browsers with `navigator.onLine` support (IE9+)
- Skeleton loaders: All browsers with CSS animation support

### Future Enhancements

- Analytics integration for error tracking
- Sentry or LogRocket for production error reporting
- Toast notification queue with priority system
- Customizable toast positions (top-left, bottom-right, etc.)
- Toast notification history/log
- Loading progress indicators for long operations
- Optimistic UI updates with rollback on failure
- Service worker for true offline functionality
- Network speed detection and adaptive loading strategies
- Error recovery suggestions based on error type
- Multiple error boundary levels with different fallback strategies

### Related Files

- Error handling implementation: `app/nextjs/lib/errorHandling.ts:1`
- Retry logic: `app/nextjs/lib/retryLogic.ts:1`
- Toast component: `app/nextjs/components/Toast.tsx:1`
- Skeleton loader: `app/nextjs/components/SkeletonLoader.tsx:1`
- Error boundary: `app/nextjs/components/ErrorBoundary.tsx:1`
- Dashboard integration: `app/nextjs/app/dashboard/page.tsx:54` (error handling), `app/nextjs/app/dashboard/page.tsx:226` (skeleton loader)
- Login integration: `app/nextjs/app/login/page.tsx:28` (toast notifications)
