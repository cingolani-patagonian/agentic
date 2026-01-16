/**
 * Common TypeScript type definitions
 */

export interface User {
  id: string
  name: string
  email: string
  username?: string
  role?: string
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
