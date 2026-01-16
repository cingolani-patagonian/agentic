import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
      {icon ? (
        <div className="mb-4 text-gray-400">{icon}</div>
      ) : (
        <div className="mb-4 text-6xl text-gray-300">📭</div>
      )}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
