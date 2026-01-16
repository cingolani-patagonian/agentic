'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getAllUsers } from '@/lib/api'
import { User } from '@/types'
import UserCard from '@/components/UserCard'
import SearchBar from '@/components/SearchBar'
import DepartmentFilter from '@/components/DepartmentFilter'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  // User data state
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true)
      setError(null)
      try {
        // Fetch all users without pagination
        const response = await getAllUsers({ pageSize: 100 })
        if (response.success) {
          setUsers(response.data)
          setFilteredUsers(response.data)
        } else {
          setError(response.error || 'Failed to load users')
        }
      } catch (err) {
        setError('An unexpected error occurred while loading users')
      } finally {
        setIsLoadingUsers(false)
      }
    }

    if (user) {
      fetchUsers()
    }
  }, [user])

  // Filter users based on search query and department
  useEffect(() => {
    let result = users

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.role.toLowerCase().includes(query)
      )
    }

    // Apply department filter
    if (selectedDepartment !== 'All Departments') {
      result = result.filter((u) => u.department === selectedDepartment)
    }

    setFilteredUsers(result)
  }, [searchQuery, selectedDepartment, users])

  // Retry handler for error state
  const handleRetry = () => {
    window.location.reload()
  }

  // Logout handler
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Extract unique departments for filter
  const departments = Array.from(new Set(users.map((u) => u.department))).sort()

  // Loading state for auth check
  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  // Not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Directory</h1>
              <p className="mt-1 text-sm text-gray-600">
                Logged in as <span className="font-medium">{user.username}</span> ({user.role})
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, email, or role..."
            />
          </div>
          <div className="md:w-64">
            <DepartmentFilter
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              departments={departments}
            />
          </div>
        </div>

        {/* Content Area */}
        {isLoadingUsers ? (
          <LoadingSpinner message="Loading users..." />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : filteredUsers.length === 0 && users.length > 0 ? (
          <EmptyState
            title="No users found"
            message="Try adjusting your search or filter criteria to find what you're looking for."
          />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No users available"
            message="There are no users in the system at the moment."
          />
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((userData) => (
                <UserCard key={userData.id} user={userData} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
