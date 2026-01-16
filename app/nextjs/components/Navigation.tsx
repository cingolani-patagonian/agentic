'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Navigation() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Next.js App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              About
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!user && (
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
