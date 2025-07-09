import jwt from 'jsonwebtoken'
import { type NextRequest, NextResponse } from 'next/server'
import { getSession, type User } from './lib/session'
import { UserType } from './types/enums'

const publicRoutes = [
  {
    path: '/login',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/',
    whenAuthenticated: 'next',
  },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)

  const { token } = await getSession()

  if (!token && publicRoute) {
    return NextResponse.next()
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/dashboard'

    return NextResponse.redirect(redirectUrl)
  }

  const user = jwt.decode(token) as unknown as User

  if (user.userType === UserType.GLOBAL_ADMIN) {
    if (path !== '/' && !path.startsWith('/admin')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin'
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // Redirect non-admins away from /admin area
    if (path.startsWith('/admin')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
