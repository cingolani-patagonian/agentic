# Types Directory

This directory contains TypeScript type definitions, interfaces, and type utilities used throughout the application.

## Purpose

The `types` directory is for:

- Shared TypeScript interfaces
- Type definitions for API responses
- Custom type utilities
- Enum definitions
- Type guards

## Structure

Organize types by domain or feature:

- `index.ts` - Common types used across the app
- `api.ts` - API-related types and interfaces
- `models.ts` - Data model types
- `utils.ts` - Type utility helpers

## Example

```typescript
// index.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

export type UserRole = User['role']

// Type guard example
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  )
}
```

## Best Practices

- Use interfaces for object types that may be extended
- Use type aliases for unions, intersections, and mapped types
- Export types alongside related functions when appropriate
- Use descriptive names that reflect the domain
- Add JSDoc comments for complex types
- Consider using branded types for IDs and other primitives
