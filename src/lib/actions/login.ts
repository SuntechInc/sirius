'use server'

import { redirect } from 'next/navigation'
import { api } from '../api'
import { saveSession } from '../session'
import type { AuthSchema } from '../validations/auth'

export async function login(input: AuthSchema) {
  const { email, password } = input

  const res = await api.post<{ accessToken: string }>('/auth/login', {
    email,
    password,
  })

  if (res.status === 200) {
    const { accessToken } = res.data
    await saveSession(accessToken)
    redirect('/dashboard')
  }
}
