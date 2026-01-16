/**
 * Merges class names
 * This is a simple utility for combining conditional class names
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs
    .filter(Boolean)
    .join(' ')
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
