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

  try {
    const { token } = await getSession()

    // Log para debug (remover em produção)
    console.log(`[Middleware] Path: ${path}, Token: ${token ? 'present' : 'missing'}`)

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

    if (token && !publicRoute) {
      // Verificar se o JWT tá expirado
      //  se sim, remover o cookie e redirecionar o usuário para /login
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[Middleware] Error:', error)
    
    // Em caso de erro, permitir acesso às rotas públicas
    if (publicRoute) {
      return NextResponse.next()
    }
    
    // Para rotas privadas, redirecionar para login
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }
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
