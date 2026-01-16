'use client'

import { useContext } from 'react'
import { ToastContext } from '@/contexts/ToastContext'
import type { ToastType } from '@/types'

interface UseToastReturn {
  showSuccess: (message: string, duration?: number) => void
  showError: (message: string, duration?: number) => void
  showInfo: (message: string, duration?: number) => void
  showWarning: (message: string, duration?: number) => void
  addToast: (toast: { type: ToastType; message: string; duration?: number }) => void
  removeToast: (id: string) => void
}

export function useToast(): UseToastReturn {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const { addToast, removeToast } = context

  const showSuccess = (message: string, duration?: number) => {
    addToast({ type: 'success', message, duration })
  }

  const showError = (message: string, duration?: number) => {
    addToast({ type: 'error', message, duration })
  }

  const showInfo = (message: string, duration?: number) => {
    addToast({ type: 'info', message, duration })
  }

  const showWarning = (message: string, duration?: number) => {
    addToast({ type: 'warning', message, duration })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    addToast,
    removeToast,
  }
}
