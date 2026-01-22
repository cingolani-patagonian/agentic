'use client';

import Image from 'next/image';
import { User } from '@/types';
import { useState } from 'react';

/**
 * UserCard component props
 */
interface UserCardProps {
  /** User data to display in the card */
  user: User;
  /** Optional click handler for viewing user details. When provided, the card becomes clickable. */
  onClick?: (user: User) => void;
  /** Optional additional CSS classes for custom styling */
  className?: string;
  /** Optional flag to show edit button for admin users */
  showEditButton?: boolean;
  /** Optional callback when edit button is clicked */
  onEdit?: (user: User) => void;
}

/**
 * Reusable UserCard component that displays user profile information
 * in a visually appealing card format with accessibility support.
 *
 * Features:
 * - Avatar display with automatic fallback to user initials
 * - Status badge with color coding (green for active, gray for inactive)
 * - Location, role, department, and email information
 * - Optional click-to-view-details functionality
 * - Full keyboard navigation support
 * - Comprehensive ARIA labels for screen readers
 * - Responsive design for mobile, tablet, and desktop
 * - Smooth hover effects
 */
export default function UserCard({ user, onClick, className = '', showEditButton = false, onEdit }: UserCardProps) {
  const [imageError, setImageError] = useState(false);

  // Extract initials from user name for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle card click
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  // Handle keyboard events for accessibility
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(user);
    }
  };

  // Handle email click to prevent card onClick from triggering
  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle edit button click
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(user);
    }
  };

  const isClickable = !!onClick;

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md p-4 sm:p-6 border border-transparent hover:shadow-2xl hover:scale-[1.02] hover:bg-gray-50 hover:border-indigo-500 transition-all duration-200 ease-in-out ${
        isClickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : ''
      } ${className}`}
      onClick={isClickable ? handleClick : undefined}
      onKeyPress={isClickable ? handleKeyPress : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role="article"
      aria-label={`User profile card for ${user.name}`}
    >
      {/* Edit Button */}
      {showEditButton && onEdit && (
        <button
          onClick={handleEditClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all duration-200 group"
          aria-label={`Edit ${user.name}'s profile`}
          title="Edit user"
        >
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}

      <div className="flex items-center mb-4">
        {imageError ? (
          <div
            className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-semibold"
            aria-label={`${user.name}'s profile picture`}
          >
            {getInitials(user.name)}
          </div>
        ) : (
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
            onError={() => setImageError(true)}
            aria-label={`${user.name}'s profile picture`}
            unoptimized
          />
        )}
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 break-words">{user.name}</h3>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              user.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
            aria-label={`Status: ${user.status}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Role:</span> <span className="font-bold">{user.role}</span>
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Department:</span> <span className="font-bold">{user.department}</span>
        </p>
        {user.location && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Location:</span> <span className="font-bold">{user.location}</span>
          </p>
        )}
        <a
          href={`mailto:${user.email}`}
          className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline block break-all"
          onClick={handleEmailClick}
          aria-label={`Send email to ${user.name}`}
        >
          {user.email}
        </a>
      </div>
    </div>
  );
}
