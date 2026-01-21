import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { OfflineBanner } from '@/components/OfflineBanner'

export const metadata: Metadata = {
  title: 'User List',
  description: 'A Next.js application with responsive navigation and user management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ToastProvider>
          <AuthProvider>
            <ErrorBoundary>
              <OfflineBanner />
              <Navigation />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </ErrorBoundary>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
