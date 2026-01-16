'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard
            </h1>
            <div className="mt-4 space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Username:</span> {user.username}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Role:</span>{' '}
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {user.role}
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  You are successfully authenticated and can access protected content.
                </p>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Protected Content
          </h2>
          <p className="text-blue-800">
            This dashboard is only accessible to authenticated users. Try logging out
            and accessing this page again - you will be redirected to the login page.
          </p>
        </div>
      </div>
    </div>
  )
}
