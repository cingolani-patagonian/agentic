'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'
import { AuthUser, AuthContextType, LoginCredentials } from '@/types'
import { login as authLogin, logout as authLogout, getAuthenticatedUser } from '@/lib/auth'
import { useToast } from '@/hooks/useToast'
import { formatErrorMessage } from '@/lib/errorHandling'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showSuccess, showError, showInfo } = useToast()

  const checkAuth = useCallback(() => {
    const authenticatedUser = getAuthenticatedUser()
    setUser(authenticatedUser)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (credentials: LoginCredentials) => {
    try {
      const authenticatedUser = await authLogin(credentials)
      setUser(authenticatedUser)
      showSuccess(`Welcome back, ${authenticatedUser.username}!`)
    } catch (error) {
      const errorMessage = formatErrorMessage(error)
      showError(errorMessage)
      throw error
    }
  }

  const logout = () => {
    authLogout()
    setUser(null)
    showInfo('You have been logged out')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProviderInner>{children}</AuthProviderInner>
}
