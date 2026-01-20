'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About This Project
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A showcase of AI-driven development through autonomous agents
        </p>
      </div>

      {/* Project Overview Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Project Overview
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            This application was built entirely using the <strong>ADW (AI Developer Workflow)</strong> system,
            an autonomous AI development framework that processes GitHub issues and implements complete features
            without human intervention.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            The project features a modern Next.js application with authentication, user profiles, search
            functionality, and responsive design - all implemented by AI agents following structured workflows.
            This demonstrates the power of AI-driven development and showcases how autonomous agents can build
            production-ready applications.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Modern Next.js 14
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with Next.js 14 App Router and TypeScript for optimal performance and type safety
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Authentication System
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Secure authentication with mock users and JWT-like tokens for session management
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              User Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive dashboard with profile cards and comprehensive data management
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Search & Filter
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time search and filtering functionality for finding users quickly
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mobile-friendly layout with navigation that adapts to all screen sizes
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out border border-transparent hover:border-indigo-500">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tailwind CSS
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Modern styling with Tailwind CSS and dark mode support throughout
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Frontend
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Framework:</strong>&nbsp;Next.js 14+ with App Router
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Language:</strong>&nbsp;TypeScript 5+ with strict mode
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Styling:</strong>&nbsp;Tailwind CSS 3+ with custom theming
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">State:</strong>&nbsp;React Context API with hooks
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Development Tools
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">AI Development:</strong>&nbsp;ADW System
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">AI Agent:</strong>&nbsp;Claude Code CLI
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Version Control:</strong>&nbsp;Git with GitHub
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Package Manager:</strong>&nbsp;npm
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Backend (Legacy)
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Framework:</strong>&nbsp;FastAPI with Python 3.10+
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Database:</strong>&nbsp;SQLite with SQL protection
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">AI Integration:</strong>&nbsp;OpenAI and Anthropic APIs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Auth:</strong>&nbsp;JWT with bcrypt
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Deployment
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Platform:</strong>&nbsp;Vercel (Next.js)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Infrastructure:</strong>&nbsp;Git worktrees for isolation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">CI/CD:</strong>&nbsp;Automated through ADW workflows
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong className="text-gray-900 dark:text-white">Security:</strong>&nbsp;Headers and CORS config
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ADW System Highlights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          AI Developer Workflow (ADW)
        </h2>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              What Makes This Project Unique
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
              The ADW system is a comprehensive automation framework that integrates GitHub issues with
              Claude Code CLI to autonomously implement features. Every feature in this application was
              built by AI agents, not human developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🎯 Issue Classification
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Analyzes GitHub issues and determines type: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/chore</code>, <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/bug</code>, or <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/feature</code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📝 Planning
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Generates detailed implementation plans using Claude Code CLI with step-by-step tasks
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ⚙️ Implementation
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Executes the plan by making code changes, running tests, and ensuring quality standards
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🔗 Integration
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Creates git commits and pull requests with semantic commit messages automatically
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-200">
            <strong>Result:</strong> A completely autonomous development pipeline where GitHub issues
            become production-ready features without human code intervention.
          </p>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Get Started
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-8">
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
            Ready to explore the application? Login with mock credentials to access the dashboard
            and see all features in action.
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Mock Credentials for Testing
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block">
              <p className="text-gray-700 dark:text-gray-200 mb-2">
                <strong>Username:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin</code>
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Password:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Login
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
