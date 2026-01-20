'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { getUserById } from '@/lib/api'
import { User } from '@/types'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/ErrorState'

/**
 * User Details Page
 *
 * Displays comprehensive information about a specific user including:
 * - Avatar with fallback to initials
 * - Full name and status badge
 * - Contact information (email)
 * - Organization details (role, department, location)
 * - Additional information (bio, join date)
 *
 * Features:
 * - Authentication guard (redirects to login if not authenticated)
 * - Loading state while fetching user data
 * - Error handling with retry functionality
 * - Back button to return to dashboard
 * - Responsive design for all screen sizes
 * - Shareable URL (direct access via /users/[id])
 */
export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user: authUser, isLoading: isAuthLoading } = useAuth()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  // Extract user ID from params
  const userId = params.id as string

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isAuthLoading, router])

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !authUser) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await getUserById(userId)
        if (response.success) {
          setUser(response.data)
        } else {
          setError(response.error || 'Failed to load user details')
        }
      } catch (err) {
        setError('An unexpected error occurred while loading user details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId, authUser])

  // Retry handler
  const handleRetry = async () => {
    if (!userId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await getUserById(userId)
      if (response.success) {
        setUser(response.data)
      } else {
        setError(response.error || 'Failed to load user details')
      }
    } catch (err) {
      setError('An unexpected error occurred while loading user details')
    } finally {
      setIsLoading(false)
    }
  }

  // Back to dashboard handler
  const handleBack = () => {
    router.push('/dashboard')
  }

  // Extract initials from user name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Format join date to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Loading state for auth check
  if (isAuthLoading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  // Not authenticated
  if (!authUser) {
    return null
  }

  // Loading user data
  if (isLoading) {
    return <LoadingSpinner message="Loading user details..." />
  }

  // Error state
  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorState
          message={error || 'User not found'}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              aria-label="Back to dashboard"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* User Profile Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 sm:px-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {imageError ? (
                  <div
                    className="w-32 h-32 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-4xl font-bold border-4 border-white shadow-xl"
                    aria-label={`${user.name}'s profile picture`}
                  >
                    {getInitials(user.name)}
                  </div>
                ) : (
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    onError={() => setImageError(true)}
                    aria-label={`${user.name}'s profile picture`}
                    unoptimized
                  />
                )}
              </div>

              {/* Name and Status */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {user.name}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <span
                    className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                    aria-label={`Status: ${user.status}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  <span className="text-white text-lg font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Information Sections */}
          <div className="px-6 py-8 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Email
                    </label>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline text-base break-all"
                      aria-label={`Send email to ${user.name}`}
                    >
                      {user.email}
                    </a>
                  </div>
                  {user.location && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Location
                      </label>
                      <p className="text-gray-900 text-base">{user.location}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">
                  Organization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Department
                    </label>
                    <p className="text-gray-900 text-base">{user.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Role
                    </label>
                    <p className="text-gray-900 text-base">{user.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Join Date
                    </label>
                    <p className="text-gray-900 text-base">
                      Joined {formatDate(user.joinDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {user.bio && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">
                  About
                </h3>
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
