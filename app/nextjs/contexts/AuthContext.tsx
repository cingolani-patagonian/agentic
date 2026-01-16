'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'
import { AuthUser, AuthContextType, LoginCredentials } from '@/types'
import { login as authLogin, logout as authLogout, getAuthenticatedUser } from '@/lib/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authLogout()
    setUser(null)
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
