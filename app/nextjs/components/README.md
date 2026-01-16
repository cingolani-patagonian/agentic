# Components Directory

This directory contains reusable React components for the Next.js application.

## Structure

Components should be organized by feature or function:

- **UI Components**: Reusable UI elements (buttons, cards, modals, etc.)
- **Layout Components**: Page layout components (Navigation, Footer, Sidebar, etc.)
- **Feature Components**: Feature-specific components

## Naming Conventions

- Use PascalCase for component file names: `Navigation.tsx`, `Button.tsx`
- Export components as default exports
- Use TypeScript for all components

## Example

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}
```

## Best Practices

- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props
- Include proper error handling and loading states
- Make components accessible (ARIA attributes, keyboard navigation)
