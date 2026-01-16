interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
      <div className="mb-4 text-6xl text-red-400">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  );
}
