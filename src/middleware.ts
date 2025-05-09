// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Exemplo de leitura de JWT em cookie para obter role
  const isAdmin = true;

  // Redireciona ADMIN para subdomínio admin-qualityflow.com.br
  if (isAdmin && !host.startsWith('admin-')) {
    return NextResponse.redirect(
      `https://admin-qualityflow.com.br${url.pathname}${url.search}`
    );
  }

  // Redireciona usuários comuns para qualityflow.com.br
  if (!isAdmin && host.startsWith('admin-')) {
    return NextResponse.redirect(
      `https://qualityflow.com.br${url.pathname}${url.search}`
    );
  }

  // Permite continuar a requisição normalmente
  return NextResponse.next();
}

// Aplica o middleware a todas as rotas
export const config = {
  matcher: '/:path*',
};
