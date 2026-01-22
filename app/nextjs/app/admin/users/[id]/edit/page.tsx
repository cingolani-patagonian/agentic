'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminGuard from '@/components/AdminGuard'
import UserForm from '@/components/UserForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useToast } from '@/hooks/useToast'
import { getUserById, updateUser } from '@/lib/api'
import { User } from '@/types'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id as string
  const { showSuccess, showError } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError('User ID is missing')
        setIsLoading(false)
        return
      }

      try {
        const response = await getUserById(userId)

        if (response.success) {
          setUser(response.data)
        } else {
          setError(response.error || 'Failed to load user')
          showError(response.error || 'Failed to load user')
        }
      } catch (err) {
        console.error('Error fetching user:', err)
        setError('An unexpected error occurred while loading the user')
        showError('Failed to load user data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId, showError])

  const handleSubmit = async (userData: Partial<User>) => {
    if (!userId) return

    setIsSubmitting(true)

    try {
      // Update user via API
      const response = await updateUser(userId, userData)

      if (response.success) {
        showSuccess('User updated successfully!')
        router.push(`/users/${userId}`)
      } else {
        showError(response.error || 'Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      showError('An unexpected error occurred while updating the user')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (userId) {
      router.push(`/users/${userId}`)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner message="Loading user data..." />
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* User Form */}
          {user && !isLoading && !error && (
            <>
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit User: {user.name}</h1>
                <p className="mt-2 text-gray-600">Update user profile information</p>
              </div>

              {/* Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <UserForm
                  initialData={user}
                  mode="edit"
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isSubmitting={isSubmitting}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
