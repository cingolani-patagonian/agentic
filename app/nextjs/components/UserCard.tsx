import Image from 'next/image';
import { User } from '@/types';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              user.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Role:</span> {user.role}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Department:</span> {user.department}
        </p>
        <a
          href={`mailto:${user.email}`}
          className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline block"
        >
          {user.email}
        </a>
      </div>
    </div>
  );
}
