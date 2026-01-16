'use client'

import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 text-center animate-slide-down"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg" aria-hidden="true">
          ⚠
        </span>
        <p className="text-sm font-medium">
          You are currently offline. Some features may not be available.
        </p>
      </div>
    </div>
  )
}
