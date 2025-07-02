import { getIronSession } from 'iron-session'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import 'server-only'

export type User = {
  sub: number // subject (id do suer)
  username: string
  iat: number
  exp: number
}
const secret = '12345678901234567890123456789012' //env var
const ttl = 60 * 60 * 24 * 7

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<{ token: string }>(cookieStore, {
    password: secret,
    cookieName: 'auth',
    ttl,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // só HTTPS em produção
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ajuste para desenvolvimento
      domain:
        process.env.NODE_ENV === 'production'
          ? '.qualityflow.com.br'
          : undefined, // só em produção
      maxAge: (ttl === 0 ? 2147483647 : ttl) - 60, // Expire cookie before the session expires.
      path: '/',
    },
  })
}

export async function saveSession(token: string) {
  const session = await getSession()
  session.token = token
  await session.save()
}

export async function destroySession() {
  const session = await getSession()
  session.destroy()
}

export async function getUser(): Promise<User | null> {
  const session = await getSession()

  if (!session.token) {
    return null
  }

  return jwt.decode(session.token) as unknown as User
}
