'use client'

import { useState, FormEvent } from 'react'
import { User } from '@/types'
import { validateUserForm, hasErrors, UserFormErrors } from '@/lib/validation'

interface UserFormProps {
  initialData?: Partial<User>
  mode: 'create' | 'edit'
  onSubmit: (userData: Partial<User>) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

// Extract unique values from mock database for dropdowns
const ROLES = [
  'Engineering Manager',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Product Designer',
  'UX Researcher',
  'UI/UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'QA Engineer',
  'Data Analyst',
  'Data Scientist',
  'Marketing Manager',
  'Content Strategist',
  'HR Manager',
  'Sales Director',
  'Customer Success Manager',
  'Finance Manager',
  'Operations Manager',
  'Security Engineer',
  'Mobile Developer',
  'Business Analyst'
].sort()

const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Customer Success',
  'Data & Analytics'
].sort()

const LOCATIONS = [
  'San Francisco',
  'New York',
  'London',
  'Austin',
  'Singapore',
  'Tokyo',
  'Berlin',
  'Madrid',
  'Toronto',
  'Sydney',
  'Los Angeles',
  'Dubai',
  'Chicago',
  'Amsterdam',
  'Seattle',
  'Paris',
  'Boston',
  'Barcelona',
  'Seoul',
  'Milan',
  'Portland'
].sort()

const STATUSES: Array<'active' | 'inactive'> = ['active', 'inactive']

export default function UserForm({ initialData, mode, onSubmit, onCancel, isSubmitting = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    username: initialData?.username || '',
    role: initialData?.role || '',
    department: initialData?.department || '',
    location: initialData?.location || '',
    bio: initialData?.bio || '',
    joinDate: initialData?.joinDate || '',
    status: (initialData?.status || 'active') as 'active' | 'inactive'
  })

  const [errors, setErrors] = useState<UserFormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof UserFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateUserForm(formData)

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    // Submit form
    try {
      await onSubmit(formData)
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Form submission error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john.doe@company.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Username (optional) */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="johndoe"
        />
        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.role ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a role</option>
          {ROLES.map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
      </div>

      {/* Department */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
          Department <span className="text-red-500">*</span>
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.department ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a department</option>
          {DEPARTMENTS.map(dept => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location <span className="text-red-500">*</span>
        </label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a location</option>
          {LOCATIONS.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.status ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {STATUSES.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
      </div>

      {/* Join Date */}
      <div>
        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">
          Join Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="joinDate"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.joinDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.joinDate && <p className="mt-1 text-sm text-red-600">{errors.joinDate}</p>}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio <span className="text-red-500">*</span>
          <span className="text-gray-400 text-xs ml-2">(max 500 characters)</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          maxLength={500}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.bio ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Brief description about the user..."
        />
        <div className="flex justify-between mt-1">
          {errors.bio ? (
            <p className="text-sm text-red-600">{errors.bio}</p>
          ) : (
            <span className="text-sm text-gray-500">{formData.bio.length}/500 characters</span>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition-colors ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </span>
          ) : (
            mode === 'create' ? 'Create User' : 'Update User'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
