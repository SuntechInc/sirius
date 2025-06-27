import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/session'

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

  const session = await getSession()

  if (!session.token && publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (
    session.token &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/dashboard'

    return NextResponse.redirect(redirectUrl)
  }

  if (session.token && !publicRoute) {
    // Verificar se o JWT tá expirado
    //  se sim, remover o cookie e redirecionar o usuário para /login

    return NextResponse.next()
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
