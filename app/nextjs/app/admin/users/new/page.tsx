'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminGuard from '@/components/AdminGuard'
import UserForm from '@/components/UserForm'
import { useToast } from '@/hooks/useToast'
import { createUser } from '@/lib/api'
import { User } from '@/types'

export default function CreateUserPage() {
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (userData: Partial<User>) => {
    setIsSubmitting(true)

    try {
      // Create user via API
      const response = await createUser(userData as Omit<User, 'id' | 'avatar'>)

      if (response.success) {
        showSuccess('User created successfully!')
        router.push('/dashboard')
      } else {
        showError(response.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      showError('An unexpected error occurred while creating the user')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
            <p className="mt-2 text-gray-600">Create a new user profile for the team directory</p>
          </div>

          {/* User Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <UserForm
              mode="create"
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
