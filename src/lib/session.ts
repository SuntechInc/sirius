import { getIronSession } from 'iron-session'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { UserType } from '@/types/enums'
import 'server-only'

export type User = {
  sub: string
  email: string
  companyId: string
  actionCompanyId: string
  userType: UserType
  iat: number
  exp: number
}
const secret = process.env.JWT_SECRET || '12345678901234567890123456789012' //env var
const ttl = 60 * 60 * 24 * 7

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<{ token: string }>(cookieStore, {
    password: secret,
    cookieName: 'auth',
    ttl,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
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

export async function getUser() {
  const session = await getSession()

  if (!session.token) {
    redirect('/login')
  }

  return jwt.decode(session.token) as unknown as User
}
