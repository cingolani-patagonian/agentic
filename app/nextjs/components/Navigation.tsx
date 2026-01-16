'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'

export default function Navigation() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Define navigation links
  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ]

  const authenticatedLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/dashboard', label: 'Dashboard' },
  ]

  const navLinks = user ? authenticatedLinks : publicLinks

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
                Mock User Dashboard
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        user={user}
        onLogout={handleLogout}
      />
    </>
  )
}
