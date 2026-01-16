import { AuthUser, AuthToken, LoginCredentials } from '@/types'

// Mock user credentials
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
]

const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRATION_HOURS = 24

/**
 * Validates user credentials against mock users
 */
export function validateCredentials(credentials: LoginCredentials): AuthUser | null {
  const user = MOCK_USERS.find(
    u => u.username === credentials.username && u.password === credentials.password
  )

  if (user) {
    return {
      username: user.username,
      role: user.role
    }
  }

  return null
}

/**
 * Generates a JWT-like token (mock implementation)
 */
export function generateToken(user: AuthUser): AuthToken {
  const expiresAt = Date.now() + (TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000)

  // In a real implementation, this would be a signed JWT
  const tokenData = {
    user,
    expiresAt
  }

  const token = btoa(JSON.stringify(tokenData))

  return {
    token,
    expiresAt
  }
}

/**
 * Saves token to localStorage
 */
export function saveToken(authToken: AuthToken): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(authToken))
  }
}

/**
 * Retrieves token from localStorage
 */
export function getToken(): AuthToken | null {
  if (typeof window !== 'undefined') {
    const tokenStr = localStorage.getItem(TOKEN_KEY)
    if (tokenStr) {
      try {
        return JSON.parse(tokenStr) as AuthToken
      } catch {
        return null
      }
    }
  }
  return null
}

/**
 * Removes token from localStorage
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

/**
 * Checks if token is valid and not expired
 */
export function isTokenValid(authToken: AuthToken | null): boolean {
  if (!authToken) return false
  return Date.now() < authToken.expiresAt
}

/**
 * Decodes user information from token
 */
export function getCurrentUser(authToken: AuthToken | null): AuthUser | null {
  if (!authToken || !isTokenValid(authToken)) return null

  try {
    const decoded = JSON.parse(atob(authToken.token))
    return decoded.user as AuthUser
  } catch {
    return null
  }
}

/**
 * Main login function
 */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const user = validateCredentials(credentials)

  if (!user) {
    throw new Error('Invalid username or password')
  }

  const authToken = generateToken(user)
  saveToken(authToken)

  return user
}

/**
 * Main logout function
 */
export function logout(): void {
  removeToken()
}

/**
 * Checks if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getToken()
  return isTokenValid(token)
}

/**
 * Gets the current authenticated user
 */
export function getAuthenticatedUser(): AuthUser | null {
  const token = getToken()
  return getCurrentUser(token)
}
