import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookie or check if we should look in localStorage (client-side)
  // Note: This is a simplified middleware. In production, use httpOnly cookies
  const token = request.cookies.get('auth_token')?.value

  // Public paths that don't require authentication
  const publicPaths = ['/login']
  const isPublicPath = publicPaths.includes(pathname)

  // Root path and dashboard should be protected
  const protectedPaths = ['/', '/dashboard']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path) && pathname !== '/login')

  // For now, we'll rely on client-side auth checks in components
  // since we're using localStorage instead of cookies
  // This middleware serves as a placeholder for future server-side auth

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|about).*)'],
}
