'use client'

import { useEffect, useState } from 'react'
import type { Toast as ToastType } from '@/types'

interface ToastProps extends ToastType {
  onClose: (id: string) => void
}

const toastStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-500 text-white',
}

const toastIcons = {
  success: '✓',
  error: '✗',
  info: 'ℹ',
  warning: '⚠',
}

export function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100))
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    // Auto-dismiss timer
    const dismissTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onClose(id), 300) // Wait for exit animation
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(dismissTimer)
    }
  }, [id, duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => onClose(id), 300)
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        relative overflow-hidden rounded-lg shadow-lg p-4 min-w-[300px] max-w-md
        ${toastStyles[type]}
        ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl font-bold flex-shrink-0" aria-hidden="true">
          {toastIcons[type]}
        </span>
        <p className="flex-1 text-sm font-medium break-words">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
          aria-label="Close notification"
        >
          <span className="text-xl font-bold">×</span>
        </button>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}
