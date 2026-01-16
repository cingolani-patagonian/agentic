/**
 * Common TypeScript type definitions
 */

export interface User {
  id: string
  name: string
  email: string
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
