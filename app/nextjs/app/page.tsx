'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Next.js
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A modern React framework with TypeScript and Tailwind CSS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Server-Side Rendering
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Built-in SSR and SSG support for optimal performance and SEO.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            TypeScript
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Full TypeScript support with strict mode enabled for type safety.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Tailwind CSS
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Utility-first CSS framework for rapid UI development.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
          Getting Started
        </h2>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          This Next.js application is ready for development and Vercel deployment.
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-200">
          <li>Run <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm run dev</code> to start the development server</li>
          <li>Run <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm run build</code> to create a production build</li>
          <li>Deploy to Vercel with a single click or via the Vercel CLI</li>
        </ul>
      </div>
    </div>
  )
}
