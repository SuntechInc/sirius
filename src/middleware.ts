import jwt from 'jsonwebtoken'
import { type NextRequest, NextResponse } from 'next/server'
import { getSession, type User } from './lib/session'
import { UserType } from './types/enums'

const PUBLIC_ROUTES = ['/login', '/']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTES.includes(path)
  const { token } = await getSession()

  // Usuário não autenticado
  if (!token) {
    return isPublicRoute ? NextResponse.next() : redirect(request, '/login')
  }

  // Usuário autenticado na página de login - redirecionar para dashboard
  if (path === '/login') {
    return redirect(request, '/dashboard')
  }

  const user = jwt.decode(token) as unknown as User

  // Lógica para administrador global
  if (user.userType === UserType.GLOBAL_ADMIN) {
    if (path !== '/' && !path.startsWith('/admin')) {
      return redirect(request, '/admin')
    }
  } else {
    // Usuário comum tentando acessar área admin
    if (path.startsWith('/admin')) {
      return redirect(request, '/dashboard')
    }
  }

  return NextResponse.next()
}

function redirect(request: NextRequest, pathname: string) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = pathname
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
