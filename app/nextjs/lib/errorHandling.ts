/**
 * Error handling utilities for the application
 */

export type ErrorType = 'network' | 'auth' | 'validation' | 'unknown'

/**
 * Format error message into a user-friendly string
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'An unexpected error occurred. Please try again.'
}

/**
 * Log error to console (in development) or analytics service (in production)
 */
export function logError(error: unknown, context?: string): void {
  const errorMessage = formatErrorMessage(error)
  const timestamp = new Date().toISOString()

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${timestamp}] Error${context ? ` in ${context}` : ''}:`, errorMessage, error)
  } else {
    // In production, this could integrate with Sentry, LogRocket, or similar services
    console.error(`[${timestamp}] Error${context ? ` in ${context}` : ''}:`, errorMessage)
  }
}

/**
 * Check if error is network-related
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      message.includes('offline') ||
      error.name === 'NetworkError' ||
      error.name === 'TypeError'
    )
  }

  if (typeof error === 'string') {
    const message = error.toLowerCase()
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      message.includes('offline')
    )
  }

  return false
}

/**
 * Categorize error type
 */
export function getErrorType(error: unknown): ErrorType {
  if (isNetworkError(error)) {
    return 'network'
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase()

    if (message.includes('auth') || message.includes('unauthorized') || message.includes('forbidden')) {
      return 'auth'
    }

    if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
      return 'validation'
    }
  }

  if (typeof error === 'string') {
    const message = error.toLowerCase()

    if (message.includes('auth') || message.includes('unauthorized') || message.includes('forbidden')) {
      return 'auth'
    }

    if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
      return 'validation'
    }
  }

  return 'unknown'
}

/**
 * Extract error message from various error formats
 */
export function extractErrorMessage(error: unknown): string {
  return formatErrorMessage(error)
}
