'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { getAllUsers } from '@/lib/api'
import { User } from '@/types'
import UserCard from '@/components/UserCard'
import SearchBar from '@/components/SearchBar'
import DepartmentFilter from '@/components/DepartmentFilter'
import ActiveFilters from '@/components/ActiveFilters'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import { SkeletonLoader } from '@/components/SkeletonLoader'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, logout, isLoading } = useAuth()
  const { showError, showSuccess } = useToast()
console.log(user)
  // User data state
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state - initialize from URL parameters
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams.get('department') || 'All Departments')

  // Debounced search query
  const [debouncedSearchQuery] = useDebounce(searchInput, 300)

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
          const errorMsg = response.error || 'Failed to load users'
          setError(errorMsg)
          showError(errorMsg)
        }
      } catch (err) {
        const errorMsg = 'An unexpected error occurred while loading users'
        setError(errorMsg)
        showError(errorMsg)
      } finally {
        setIsLoadingUsers(false)
      }
    }

    if (user) {
      fetchUsers()
    }
  }, [user, showError])

  // Filter users based on debounced search query and department
  useEffect(() => {
    let result = users

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
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
  }, [debouncedSearchQuery, selectedDepartment, users])

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (debouncedSearchQuery.trim()) {
      params.set('search', debouncedSearchQuery)
    }

    if (selectedDepartment !== 'All Departments') {
      params.set('department', selectedDepartment)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/dashboard?${queryString}` : '/dashboard'

    router.replace(newUrl)
  }, [debouncedSearchQuery, selectedDepartment, router])

  // Retry handler for error state
  const handleRetry = async () => {
    setIsLoadingUsers(true)
    setError(null)
    try {
      const response = await getAllUsers({ pageSize: 100 })
      if (response.success) {
        setUsers(response.data)
        setFilteredUsers(response.data)
        showSuccess('Users loaded successfully!')
      } else {
        const errorMsg = response.error || 'Failed to load users'
        setError(errorMsg)
        showError(errorMsg)
      }
    } catch (err) {
      const errorMsg = 'An unexpected error occurred while loading users'
      setError(errorMsg)
      showError(errorMsg)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  // Logout handler
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Clear filter handlers
  const handleClearSearch = () => {
    setSearchInput('')
  }

  const handleClearDepartment = () => {
    setSelectedDepartment('All Departments')
  }

  const handleClearAll = () => {
    setSearchInput('')
    setSelectedDepartment('All Departments')
  }

  // User card click handler - navigate to user details page
  const handleUserClick = (user: User) => {
    router.push(`/users/${user.id}`)
  }

  // User card edit handler - navigate to edit page
  const handleUserEdit = (user: User) => {
    router.push(`/admin/users/${user.id}/edit`)
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
            <div className="flex gap-3">
              {user.role === 'admin' && (
                <button
                  onClick={() => router.push('/admin/users/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New User
                </button>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
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

        {/* Active Filters Indicator */}
        <ActiveFilters
          searchQuery={debouncedSearchQuery}
          selectedDepartment={selectedDepartment}
          onClearSearch={handleClearSearch}
          onClearDepartment={handleClearDepartment}
          onClearAll={handleClearAll}
        />

        {/* Content Area */}
        {isLoadingUsers ? (
          <SkeletonLoader variant="card" count={12} />
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
                <UserCard
                  key={userData.id}
                  user={userData}
                  onClick={handleUserClick}
                  showEditButton={user?.role === 'admin'}
                  onEdit={handleUserEdit}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading dashboard..." />}>
      <DashboardContent />
    </Suspense>
  )
}
