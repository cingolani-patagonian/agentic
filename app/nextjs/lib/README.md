# Lib Directory

This directory contains utility functions, helpers, and shared logic used across the application.

## Purpose

The `lib` directory is for:

- Utility functions (formatting, validation, etc.)
- API client configurations
- Third-party service integrations
- Shared business logic
- Helper functions

## Structure

Organize files by functionality:

- `utils.ts` - General utility functions
- `api.ts` - API client and fetch utilities
- `constants.ts` - Application constants
- `validators.ts` - Input validation functions

## Example

```typescript
// utils.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
```

## Best Practices

- Keep functions pure when possible
- Add TypeScript types for all function parameters and return values
- Document complex functions with JSDoc comments
- Write unit tests for utility functions
- Avoid side effects in utility functions
