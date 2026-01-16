/**
 * Common TypeScript type definitions
 */

export interface User {
  id: string
  name: string
  email: string
  username?: string
  role: string
  avatar: string
  department: string
  location: string
  bio: string
  joinDate: string
  status: 'active' | 'inactive'
}

export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

export interface PageProps {
  params: Record<string, string>
  searchParams: Record<string, string | string[] | undefined>
}

export interface LayoutProps {
  children: React.ReactNode
}

// Authentication types
export interface AuthUser {
  username: string
  role: string
}

export interface AuthToken {
  token: string
  expiresAt: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

export interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

// Retry configuration types
export interface RetryConfig {
  maxRetries: number
  delay: number
  backoffMultiplier: number
}

// Online status type
export type OnlineStatus = boolean
