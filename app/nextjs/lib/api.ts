/**
 * Mock Backend API Service for User Profiles
 *
 * This module provides a realistic API layer that simulates backend behavior with:
 * - Simulated network delays (500-1000ms) to mimic real API latency
 * - Consistent response formatting with success/error states
 * - Comprehensive error handling with descriptive messages
 * - Advanced query capabilities (search, pagination, filtering)
 * - Full TypeScript support with proper typing
 *
 * The API wraps the mock database (@/lib/mockDb) and provides production-like
 * patterns for testing loading states, error scenarios, and data fetching.
 *
 * @module lib/api
 */

import { User, ApiResponse } from '@/types'
import {
  mockUsers,
  getUserById as getDbUserById,
  getUsersByDepartment as getDbUsersByDepartment,
  createUser as dbCreateUser,
  updateUser as dbUpdateUser
} from '@/lib/mockDb'
import { withRetry } from '@/lib/retryLogic'

/**
 * Pagination parameters for list queries
 */
export interface PaginationParams {
  /** Page number (1-indexed), defaults to 1 */
  page?: number
  /** Number of items per page, defaults to 10 */
  pageSize?: number
}

/**
 * Search options for user queries
 */
export interface SearchOptions {
  /** Whether search should be case-sensitive, defaults to false */
  caseSensitive?: boolean
}

/**
 * Pagination metadata included in paginated responses
 */
export interface PaginationMetadata {
  /** Total number of items across all pages */
  totalUsers: number
  /** Total number of pages */
  totalPages: number
  /** Current page number */
  currentPage: number
  /** Number of items per page */
  pageSize: number
  /** Whether there is a next page */
  hasNextPage: boolean
  /** Whether there is a previous page */
  hasPreviousPage: boolean
}

/**
 * Simulates network delay to mimic real API behavior
 * Randomly delays between 500-1000ms
 * @returns Promise that resolves after the delay
 */
async function simulateDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * 500) + 500 // 500-1000ms
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Creates a standardized success response
 * @param data - The data to include in the response
 * @param metadata - Optional metadata to include (e.g., pagination info)
 * @returns Formatted success response with timestamp
 */
function createSuccessResponse<T>(data: T, metadata?: Record<string, any>): ApiResponse<T> & { timestamp: string } {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...metadata
  }
}

/**
 * Creates a standardized error response
 * @param message - Descriptive error message
 * @returns Formatted error response with timestamp
 */
function createErrorResponse(message: string): ApiResponse<never> & { timestamp: string } {
  return {
    success: false,
    error: message,
    data: undefined as never,
    timestamp: new Date().toISOString()
  }
}

/**
 * Get all users with optional pagination
 *
 * @param params - Pagination parameters
 * @param params.page - Page number (1-indexed), defaults to 1
 * @param params.pageSize - Number of items per page, defaults to 10
 * @returns Promise resolving to paginated user list with metadata
 *
 * @example
 * ```typescript
 * // Get first page with default page size (10)
 * const response = await getAllUsers()
 * console.log(response.data) // Array of 10 users
 * console.log(response.totalUsers) // 25
 * console.log(response.totalPages) // 3
 *
 * // Get second page with custom page size
 * const response2 = await getAllUsers({ page: 2, pageSize: 5 })
 * console.log(response2.data) // Users 6-10
 * console.log(response2.currentPage) // 2
 * console.log(response2.hasNextPage) // true
 * ```
 */
export async function getAllUsers(params?: PaginationParams): Promise<ApiResponse<User[]> & { timestamp: string } & PaginationMetadata> {
  const result = await withRetry(async () => {
    // Apply defaults
    const page = params?.page ?? 1
    const pageSize = params?.pageSize ?? 10

    // Validate parameters
    if (page < 1) {
      throw new Error('Page number must be 1 or greater')
    }
    if (pageSize < 1) {
      throw new Error('Page size must be 1 or greater')
    }

    // Simulate API delay
    await simulateDelay()

    // Get all users from mock database
    const allUsers = mockUsers

    // Calculate pagination
    const totalUsers = allUsers.length
    const totalPages = Math.ceil(totalUsers / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    // Slice the users array for current page
    const paginatedUsers = allUsers.slice(startIndex, endIndex)

    // Build pagination metadata
    const metadata: PaginationMetadata = {
      totalUsers,
      totalPages,
      currentPage: page,
      pageSize,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }

    return {
      ...createSuccessResponse(paginatedUsers),
      ...metadata
    }
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to fetch users') as any
  }

  return result.data!
}

/**
 * Get a specific user by their ID
 *
 * @param id - The unique user identifier
 * @returns Promise resolving to user data or error if not found
 *
 * @example
 * ```typescript
 * const response = await getUserById('usr_1a2b3c4d5e6f')
 * if (response.success) {
 *   console.log(response.data.name) // "Sarah Johnson"
 * } else {
 *   console.error(response.error) // "User not found"
 * }
 * ```
 */
export async function getUserById(id: string): Promise<ApiResponse<User> & { timestamp: string }> {
  // Validate input early (non-retryable)
  if (!id || id.trim() === '') {
    return createErrorResponse('User ID is required')
  }

  const result = await withRetry(async () => {
    // Simulate API delay
    await simulateDelay()

    // Fetch user from mock database
    const user = getDbUserById(id)

    if (!user) {
      throw new Error(`User not found with ID: ${id}`)
    }

    return createSuccessResponse(user)
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to fetch user')
  }

  return result.data!
}

/**
 * Search users by name, email, or role
 * Performs case-insensitive partial matching across multiple fields
 *
 * @param query - Search query string (minimum 2 characters)
 * @param options - Search options
 * @param options.caseSensitive - Whether search should be case-sensitive, defaults to false
 * @returns Promise resolving to matching users with result count
 *
 * @example
 * ```typescript
 * // Search by name
 * const response = await searchUsers('sarah')
 * console.log(response.data) // [{ name: "Sarah Johnson", ... }]
 * console.log(response.resultCount) // 1
 *
 * // Search by email domain
 * const response2 = await searchUsers('@company.com')
 * console.log(response2.data.length) // 25 (all users)
 *
 * // Search by role
 * const response3 = await searchUsers('developer')
 * console.log(response3.data.length) // Multiple developers
 * ```
 */
export async function searchUsers(query: string, options?: SearchOptions): Promise<ApiResponse<User[]> & { timestamp: string; resultCount?: number }> {
  // Validate input early (non-retryable)
  if (!query || query.trim() === '') {
    return createErrorResponse('Search query is required') as any
  }
  if (query.trim().length < 2) {
    return createErrorResponse('Search query must be at least 2 characters long') as any
  }

  const result = await withRetry(async () => {
    // Simulate API delay
    await simulateDelay()

    // Prepare search query
    const caseSensitive = options?.caseSensitive ?? false
    const searchQuery = caseSensitive ? query : query.toLowerCase()

    // Search across name, email, and role fields
    const results = mockUsers.filter(user => {
      const name = caseSensitive ? user.name : user.name.toLowerCase()
      const email = caseSensitive ? user.email : user.email.toLowerCase()
      const role = caseSensitive ? user.role : user.role.toLowerCase()

      return name.includes(searchQuery) || email.includes(searchQuery) || role.includes(searchQuery)
    })

    return {
      ...createSuccessResponse(results),
      resultCount: results.length
    }
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to search users') as any
  }

  return result.data!
}

/**
 * Get all users in a specific department
 *
 * @param department - Department name to filter by
 * @returns Promise resolving to users in the specified department
 *
 * @example
 * ```typescript
 * const response = await getUsersByDepartment('Engineering')
 * console.log(response.data.length) // Number of engineers
 * console.log(response.resultCount) // Same as data.length
 *
 * // Available departments:
 * // - Engineering
 * // - Design
 * // - Product
 * // - Marketing
 * // - Sales
 * // - HR
 * // - Operations
 * // - Finance
 * // - Customer Success
 * // - Data & Analytics
 * ```
 */
export async function getUsersByDepartment(department: string): Promise<ApiResponse<User[]> & { timestamp: string; resultCount?: number }> {
  // Validate input early (non-retryable)
  if (!department || department.trim() === '') {
    return createErrorResponse('Department is required') as any
  }

  const result = await withRetry(async () => {
    // Simulate API delay
    await simulateDelay()

    // Fetch users by department from mock database
    const users = getDbUsersByDepartment(department)

    return {
      ...createSuccessResponse(users),
      resultCount: users.length
    }
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to fetch users by department') as any
  }

  return result.data!
}

/**
 * Create a new user
 *
 * @param userData - User data without ID (ID will be auto-generated)
 * @returns Promise resolving to the created user or error if validation fails
 *
 * @example
 * ```typescript
 * const response = await createUser({
 *   name: 'John Doe',
 *   email: 'john.doe@company.com',
 *   role: 'Full Stack Developer',
 *   department: 'Engineering',
 *   location: 'New York',
 *   bio: 'Passionate developer...',
 *   joinDate: '2024-01-15',
 *   status: 'active'
 * })
 * if (response.success) {
 *   console.log(response.data.id) // "usr_abc123def456"
 * }
 * ```
 */
export async function createUser(userData: Omit<User, 'id' | 'avatar'>): Promise<ApiResponse<User> & { timestamp: string }> {
  // Validate required fields early (non-retryable)
  if (!userData.name || userData.name.trim() === '') {
    return createErrorResponse('Name is required')
  }
  if (!userData.email || userData.email.trim() === '') {
    return createErrorResponse('Email is required')
  }
  if (!userData.role || userData.role.trim() === '') {
    return createErrorResponse('Role is required')
  }
  if (!userData.department || userData.department.trim() === '') {
    return createErrorResponse('Department is required')
  }
  if (!userData.location || userData.location.trim() === '') {
    return createErrorResponse('Location is required')
  }

  const result = await withRetry(async () => {
    // Simulate API delay
    await simulateDelay()

    // Create user in mock database
    const newUser = dbCreateUser(userData)

    return createSuccessResponse(newUser)
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to create user')
  }

  return result.data!
}

/**
 * Update an existing user
 *
 * @param id - The unique user identifier
 * @param updates - Partial user object with fields to update
 * @returns Promise resolving to the updated user or error if not found
 *
 * @example
 * ```typescript
 * const response = await updateUser('usr_1a2b3c4d5e6f', {
 *   role: 'Senior Engineering Manager',
 *   location: 'Austin'
 * })
 * if (response.success) {
 *   console.log(response.data.role) // "Senior Engineering Manager"
 * } else {
 *   console.error(response.error) // "User not found with ID: ..."
 * }
 * ```
 */
export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'avatar'>>): Promise<ApiResponse<User> & { timestamp: string }> {
  // Validate input early (non-retryable)
  if (!id || id.trim() === '') {
    return createErrorResponse('User ID is required')
  }
  if (!updates || Object.keys(updates).length === 0) {
    return createErrorResponse('No updates provided')
  }

  const result = await withRetry(async () => {
    // Simulate API delay
    await simulateDelay()

    // Update user in mock database
    const updatedUser = dbUpdateUser(id, updates)

    if (!updatedUser) {
      throw new Error(`User not found with ID: ${id}`)
    }

    return createSuccessResponse(updatedUser)
  })

  if (!result.success) {
    return createErrorResponse(result.error?.message || 'Failed to update user')
  }

  return result.data!
}
