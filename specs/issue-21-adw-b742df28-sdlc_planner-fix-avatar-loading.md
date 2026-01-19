# Bug: User Avatar Images Failing to Load with 400 Bad Request

## Metadata
issue_number: `21`
adw_id: `b742df28`
issue_json: `{"number":21,"title":"🐛 User Avatar Images Failing to Load with 400 Bad Request","body":"## Bug Description\n\nUser avatar images from `ui-avatars.com` are failing to load in the Next.js application, returning `400 Bad Request` errors. This affects all user profile cards on the dashboard.\n\n## Error Details\n\n**Request URL:**\n```\nhttp://localhost:3001/_next/image?url=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fname%3DLisa%2BAnderson%26background%3Drandom&w=128&q=75\n```\n\n**Error Information:**\n- **Status Code:** `400 Bad Request`\n- **Request Method:** `GET`\n- **Remote Address:** `[::1]:3001`\n- **Referrer Policy:** `strict-origin-when-cross-origin`\n\n## Current Behavior\n\nWhen the dashboard loads user cards, the Next.js Image component attempts to optimize external avatar images from `ui-avatars.com`. These requests are failing with 400 errors, causing:\n\n1. Avatar images not displaying on initial load\n2. Fallback to user initials (working as intended via error handler)\n3. Console errors in browser dev tools\n4. Poor user experience with missing profile pictures\n\n## Expected Behavior\n\nAvatar images from `ui-avatars.com` should load successfully and display in user profile cards without errors.\n\n## Technical Details\n\n### Affected Files\n\n**Component:** `app/nextjs/components/UserCard.tsx:88-96`\n```tsx\n<Image\n  src={user.avatar}\n  alt={`${user.name}'s avatar`}\n  width={64}\n  height={64}\n  className=\"w-16 h-16 rounded-full object-cover\"\n  onError={() => setImageError(true)}\n  aria-label={`${user.name}'s profile picture`}\n/>\n```\n\n**Data Source:** `app/nextjs/lib/mockDb.ts`\n- All 25 mock users use avatar URLs like:\n  ```\n  avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=random'\n  ```\n\n**Configuration:** `app/nextjs/next.config.js:6-15`\n```javascript\nimages: {\n  formats: ['image/avif', 'image/webp'],\n  remotePatterns: [\n    {\n      protocol: 'https',\n      hostname: 'ui-avatars.com',\n      pathname: '/api/**',\n    },\n  ],\n},\n```\n\n## Environment\n\n- **Next.js Version:** 14.2.35\n- **Node.js Version:** 18+\n- **Environment:** Development (`npm run dev`)\n- **Port:** 3001 (fallback from 3000)\n- **Browser:** All browsers affected\n\n## Reproduction Steps\n\n1. Start the application with `./scripts/start.sh` or `cd app/nextjs && npm run dev`\n2. Navigate to `http://localhost:3001/login`\n3. Login with mock credentials (`admin` / `admin123`)\n4. Navigate to the dashboard at `http://localhost:3001/dashboard`\n5. Open browser DevTools Network tab\n6. Observe 400 Bad Request errors for all `/_next/image?url=https://ui-avatars.com/...` requests\n7. Notice that user cards display initials instead of avatar images\n\n## Possible Causes\n\n1. **Image Optimization Failure:** Next.js Image component may not be able to optimize images from `ui-avatars.com` API\n2. **Query Parameter Handling:** The `background=random` parameter might cause issues during optimization\n3. **External Domain Configuration:** Additional image domain configuration may be required\n4. **CORS/Headers:** The external API might not support Next.js optimization requests\n5. **Development vs Production:** Issue might be specific to development mode\n\n## Proposed Solutions\n\n### Option 1: Disable Image Optimization for External Avatars\nAdd `unoptimized` prop or configure specific loader for avatar images.\n\n### Option 2: Use Alternative Avatar Service\nSwitch to a more Next.js-friendly avatar service (e.g., DiceBear API, Gravatar).\n\n### Option 3: Configure Custom Image Loader\nCreate a custom loader that bypasses Next.js optimization for avatar URLs.\n\n### Option 4: Fetch and Cache Avatars Server-Side\nPre-fetch avatar images and serve them from the application's public directory.\n\n## Workaround\n\nThe current fallback mechanism works well - user initials display in colored circles when images fail. However, this is a workaround, not a fix.\n\n## Additional Context\n\n- The `UserCard` component already has error handling that displays user initials as fallback\n- The `remotePatterns` configuration appears correct according to Next.js documentation\n- This is blocking the full user experience of the dashboard feature\n- Similar issues have been reported with Next.js Image optimization and external APIs\n\n## Priority\n\n**Medium** - Functionality works with fallback, but user experience is degraded. Avatar images are a standard UX expectation.\n\n## Labels\n\n`bug`, `nextjs`, `images`, `dashboard`, `ux`"}`

## Bug Description
User avatar images from `ui-avatars.com` are failing to load in the Next.js application with 400 Bad Request errors. The Next.js Image component's optimization process is incompatible with the ui-avatars.com API, causing all avatar images to fail loading. The application currently falls back to displaying user initials, but this degrades the user experience with console errors and missing profile pictures.

## Problem Statement
Next.js Image component attempts to optimize external avatar images from `ui-avatars.com` through its built-in image optimization API (`/_next/image`). This optimization process fails with 400 Bad Request errors for all avatar URLs containing the `background=random` query parameter. The root cause is that ui-avatars.com's dynamic image generation API is not compatible with Next.js's image optimization pipeline, which expects standard static image files.

## Solution Statement
Disable Next.js image optimization for avatar images by adding the `unoptimized` prop to the Image component in UserCard.tsx. This allows the browser to load avatar images directly from ui-avatars.com without Next.js's optimization layer, resolving the 400 errors while maintaining the avatar display functionality. This is the minimal, surgical fix that solves the immediate problem without changing the avatar service or adding complex custom loaders.

## Steps to Reproduce
1. Start the Next.js application with `cd app/nextjs && npm run dev`
2. Navigate to http://localhost:3000/login (or 3001 if 3000 is taken)
3. Login with mock credentials: username `admin`, password `admin123`
4. Navigate to the dashboard at http://localhost:3000/dashboard
5. Open browser DevTools Network tab
6. Observe 400 Bad Request errors for all `/_next/image?url=https://ui-avatars.com/...` requests
7. Notice that user cards display initials instead of avatar images
8. Check browser console for image loading errors

## Root Cause Analysis
The Next.js Image component provides automatic image optimization through its built-in image optimization API. When an external image URL is provided, Next.js proxies the request through `/_next/image` to optimize, resize, and convert the image to modern formats (AVIF, WebP). However, ui-avatars.com is a dynamic image generation API that creates images on-the-fly based on query parameters like `name` and `background=random`.

The issue occurs because:
1. Next.js's image optimizer expects standard static image files (JPG, PNG, etc.)
2. ui-avatars.com generates images dynamically and may have different response headers or caching behavior
3. The `background=random` parameter causes variability that conflicts with Next.js's caching strategy
4. The optimization pipeline fails to process these dynamic images, resulting in 400 Bad Request errors

While the `remotePatterns` configuration in next.config.js correctly allows the domain, it only controls access permissions - it doesn't bypass the optimization process that's causing the failure.

## Relevant Files
Use these files to fix the bug:

- `app/nextjs/components/UserCard.tsx` (lines 88-96) - Contains the Image component that needs the `unoptimized` prop added to bypass Next.js image optimization for avatar images
- `app/nextjs/lib/mockDb.ts` - Contains mock user data with ui-avatars.com URLs; will be used to verify fix works with all 25 user avatars
- `app/nextjs/next.config.js` - Contains Next.js configuration with remotePatterns for ui-avatars.com; configuration is correct and doesn't need changes
- `app/nextjs/types/index.ts` - Contains User type definition; no changes needed but needed for reference
- `README.md` - Contains project setup instructions for testing; needed to understand how to start the application
- `.claude/commands/test_e2e.md` - E2E test execution instructions
- `.claude/commands/e2e/test_auth_login.md` - Example E2E test file for reference on creating new E2E test

### New Files
- `.claude/commands/e2e/test_avatar_loading.md` - New E2E test specification to validate avatar images load successfully after the fix

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Add unoptimized prop to Image component
- Open `app/nextjs/components/UserCard.tsx`
- Locate the Image component on lines 88-96
- Add the `unoptimized` prop to the Image component to bypass Next.js image optimization
- The Image component should look like:
```tsx
<Image
  src={user.avatar}
  alt={`${user.name}'s avatar`}
  width={64}
  height={64}
  className="w-16 h-16 rounded-full object-cover"
  onError={() => setImageError(true)}
  aria-label={`${user.name}'s profile picture`}
  unoptimized
/>
```
- This is the minimal surgical change that fixes the 400 Bad Request errors by allowing direct loading from ui-avatars.com

### Task 2: Create E2E test specification for avatar loading
- Read `.claude/commands/e2e/test_auth_login.md` to understand the E2E test format and structure
- Read `.claude/commands/test_e2e.md` to understand how E2E tests are executed
- Create a new E2E test file `.claude/commands/e2e/test_avatar_loading.md` that validates:
  - TypeScript compilation succeeds
  - Next.js development server starts successfully
  - User can log in to the application
  - Navigate to the dashboard page
  - **CRITICAL**: Verify that avatar images load successfully (check network requests for 200 status codes from ui-avatars.com)
  - **CRITICAL**: Verify NO 400 Bad Request errors appear in the Network tab for avatar images
  - Verify avatar images are visible in user cards (not just initials)
  - Check browser console for zero image loading errors
  - Take screenshots showing successful avatar loading
  - Include test steps to capture network requests and verify they succeed with 200 status
- The E2E test should prove that avatar images load successfully and the bug is fixed

### Task 3: Run validation commands to verify the fix
- Execute all validation commands listed in the "Validation Commands" section
- Ensure TypeScript compilation succeeds
- Ensure frontend build completes without errors
- Run the E2E test to validate avatar images load successfully
- Verify zero regressions in existing functionality

## Validation Commands
Execute every command to validate the bug is fixed with zero regressions.

- `cd app/nextjs && npx tsc --noEmit` - Verify TypeScript compilation succeeds with zero errors
- `cd app/nextjs && npm run build` - Verify production build succeeds with zero errors
- Read `.claude/commands/test_e2e.md`, then read and execute the new E2E test `.claude/commands/e2e/test_avatar_loading.md` to validate avatar images load successfully with 200 status codes and zero 400 Bad Request errors

## Notes
- **Minimal Change Approach**: Adding the `unoptimized` prop is the simplest, most surgical fix that directly addresses the root cause
- **No Breaking Changes**: This change only affects avatar image loading and doesn't modify any other functionality
- **Fallback Mechanism Retained**: The existing error handler and initials fallback remain in place as a safety net
- **Performance Consideration**: While `unoptimized` bypasses Next.js optimization, avatar images from ui-avatars.com are already optimized and appropriately sized (64x64 pixels)
- **Alternative Solutions Considered**: Switching to DiceBear API or custom loaders would be more complex and introduce unnecessary changes; the unoptimized prop solves the immediate problem with minimal risk
- **No Configuration Changes Needed**: The existing `remotePatterns` configuration in next.config.js is correct and doesn't need modification
- **Browser Caching**: Browsers will still cache the avatar images, so performance impact is minimal
- **Production Ready**: The `unoptimized` prop works in both development and production environments
