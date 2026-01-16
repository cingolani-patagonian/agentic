'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AuthUser } from '@/types';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  user: AuthUser | null;
  onLogout: () => void;
}

export default function MobileMenu({ isOpen, onClose, links, user, onLogout }: MobileMenuProps) {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) onClose();
  });

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const initials = user
    ? user.username
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        ref={ref}
        className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl z-50 transform transition-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                {initials}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user.username}</p>
                <p className="text-gray-400 text-xs">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
