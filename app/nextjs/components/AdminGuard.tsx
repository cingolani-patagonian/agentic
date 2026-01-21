'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import LoadingSpinner from '@/components/LoadingSpinner'

interface AdminGuardProps {
  children: React.ReactNode
}

/**
 * AdminGuard component protects routes and content that should only be accessible to admin users.
 * It checks if the user is authenticated and has the 'admin' role.
 * If not, it redirects to the dashboard with an error message.
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { showError } = useToast()

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return

    // Check if user is authenticated
    if (!user) {
      showError('You must be logged in to access this page')
      router.push('/login')
      return
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      showError('Access denied. Admin privileges required.')
      router.push('/dashboard')
    }
  }, [user, isLoading, router, showError])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Checking permissions..." />
  }

  // If user is not authenticated or not admin, don't render children
  // (navigation will happen in useEffect)
  if (!user || user.role !== 'admin') {
    return <LoadingSpinner message="Redirecting..." />
  }

  // User is authenticated and is admin, render children
  return <>{children}</>
}
