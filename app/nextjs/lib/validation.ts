/**
 * Form validation utilities for user data
 */

export interface UserFormErrors {
  name?: string
  email?: string
  username?: string
  role?: string
  department?: string
  location?: string
  bio?: string
  joinDate?: string
  status?: string
}

/**
 * Email format validation using regex
 */
export function validateEmail(email: string): string | undefined {
  if (!email || email.trim() === '') {
    return 'Email is required'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Invalid email format'
  }

  return undefined
}

/**
 * Required field validation
 */
export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`
  }
  return undefined
}

/**
 * Username format validation (alphanumeric, min 3 characters)
 * Username is optional, so only validate if provided
 */
export function validateUsername(username: string): string | undefined {
  if (!username || username.trim() === '') {
    return undefined // Username is optional
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters'
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, and underscores'
  }

  return undefined
}

/**
 * Bio character limit validation (max 500 characters)
 */
export function validateBio(bio: string): string | undefined {
  if (!bio || bio.trim() === '') {
    return 'Bio is required'
  }

  if (bio.length > 500) {
    return 'Bio must be 500 characters or less'
  }

  return undefined
}

/**
 * Join date validation (valid date format, not in future)
 */
export function validateJoinDate(joinDate: string): string | undefined {
  if (!joinDate || joinDate.trim() === '') {
    return 'Join date is required'
  }

  const date = new Date(joinDate)
  if (isNaN(date.getTime())) {
    return 'Invalid date format'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date > today) {
    return 'Join date cannot be in the future'
  }

  return undefined
}

/**
 * Status enum validation (only 'active' or 'inactive')
 */
export function validateStatus(status: string): string | undefined {
  if (!status || status.trim() === '') {
    return 'Status is required'
  }

  if (status !== 'active' && status !== 'inactive') {
    return 'Status must be either "active" or "inactive"'
  }

  return undefined
}

/**
 * Validates entire user form and returns errors object
 */
export function validateUserForm(data: {
  name: string
  email: string
  username?: string
  role: string
  department: string
  location: string
  bio: string
  joinDate: string
  status: string
}): UserFormErrors {
  const errors: UserFormErrors = {}

  // Validate required fields
  const nameError = validateRequired(data.name, 'Name')
  if (nameError) errors.name = nameError

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const roleError = validateRequired(data.role, 'Role')
  if (roleError) errors.role = roleError

  const departmentError = validateRequired(data.department, 'Department')
  if (departmentError) errors.department = departmentError

  const locationError = validateRequired(data.location, 'Location')
  if (locationError) errors.location = locationError

  const bioError = validateBio(data.bio)
  if (bioError) errors.bio = bioError

  const joinDateError = validateJoinDate(data.joinDate)
  if (joinDateError) errors.joinDate = joinDateError

  const statusError = validateStatus(data.status)
  if (statusError) errors.status = statusError

  // Validate optional username if provided
  if (data.username) {
    const usernameError = validateUsername(data.username)
    if (usernameError) errors.username = usernameError
  }

  return errors
}

/**
 * Checks if errors object has any errors
 */
export function hasErrors(errors: UserFormErrors): boolean {
  return Object.keys(errors).length > 0
}
