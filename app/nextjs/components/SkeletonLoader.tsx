/**
 * Skeleton loader component for smooth loading transitions
 */

interface SkeletonLoaderProps {
  variant: 'card' | 'text' | 'avatar' | 'line'
  count?: number
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar skeleton */}
        <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0" />

        <div className="flex-1 space-y-3">
          {/* Name skeleton */}
          <div className="h-5 bg-gray-300 rounded w-3/4" />

          {/* Email skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          {/* Department and location skeleton */}
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>

      {/* Bio skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  )
}

function SkeletonText() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-4/6" />
    </div>
  )
}

function SkeletonAvatar() {
  return <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
}

function SkeletonLine() {
  return <div className="h-4 bg-gray-300 rounded animate-pulse" />
}

export function SkeletonLoader({ variant, count = 1 }: SkeletonLoaderProps) {
  const items = Array.from({ length: count }, (_, i) => i)

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return <SkeletonCard />
      case 'text':
        return <SkeletonText />
      case 'avatar':
        return <SkeletonAvatar />
      case 'line':
        return <SkeletonLine />
      default:
        return <SkeletonLine />
    }
  }

  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i}>{renderSkeleton()}</div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  )
}
