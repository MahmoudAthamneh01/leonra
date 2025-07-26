import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware للتحكم في الوصول والأمان
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get auth token from cookies or headers
  const authToken = request.cookies.get('authToken')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '')

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth',
    '/products',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
  ]

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/cart',
    '/orders',
    '/profile',
    '/wishlist',
  ]

  // Admin only routes
  const adminRoutes = [
    '/dashboard/admin',
  ]

  // Tajira only routes
  const tajiraRoutes = [
    '/dashboard/tajira',
  ]

  // Model only routes
  const modelRoutes = [
    '/dashboard/model',
  ]

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if route is admin only
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if route is tajira only
  const isTajiraRoute = tajiraRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if route is model only
  const isModelRoute = modelRoutes.some(route => 
    pathname.startsWith(route)
  )

  // If protected route and no auth token, redirect to auth
  if (isProtectedRoute && !authToken) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // For role-specific routes, we would need to verify the token
  // This is a simplified version - in production, you'd decode the JWT
  if ((isAdminRoute || isTajiraRoute || isModelRoute) && !authToken) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Add security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' http://localhost:3001 https://api.linora.sa; " +
    "frame-src 'none'; " +
    "object-src 'none';"
  )

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Rate limiting headers (basic implementation)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // Add rate limiting info to headers (this would be enhanced with actual rate limiting)
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '99')
  response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 15 * 60 * 1000).toISOString())

  return response
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
