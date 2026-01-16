/**
 * Retry logic utilities with exponential backoff
 */

import { RetryConfig } from '@/types'
import { isNetworkError, logError } from './errorHandling'

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  delay: 1000, // 1 second
  backoffMultiplier: 2,
}

export interface RetryResult<T> {
  success: boolean
  data?: T
  error?: Error
  attempts: number
}

/**
 * Wait for a specified duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wrap an async function with retry logic and exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<RetryResult<T>> {
  const { maxRetries, delay, backoffMultiplier } = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  }

  let lastError: Error | undefined
  let attempts = 0

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    attempts++

    try {
      const data = await fn()
      return {
        success: true,
        data,
        attempts,
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Only retry on network errors
      if (!isNetworkError(lastError)) {
        logError(lastError, 'withRetry (non-retryable)')
        return {
          success: false,
          error: lastError,
          attempts,
        }
      }

      // Don't wait after the last attempt
      if (attempt < maxRetries) {
        const waitTime = delay * Math.pow(backoffMultiplier, attempt)
        logError(lastError, `withRetry (attempt ${attempt + 1}/${maxRetries + 1})`)
        await sleep(waitTime)
      }
    }
  }

  // All retries exhausted
  logError(lastError, 'withRetry (all retries exhausted)')
  return {
    success: false,
    error: lastError,
    attempts,
  }
}

export { DEFAULT_RETRY_CONFIG }
