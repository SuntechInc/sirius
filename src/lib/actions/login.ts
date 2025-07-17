'use server'

import { pipe } from 'effect'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { ApiClient } from '@/lib/effect/api-client'
import { createServerAction } from '@/lib/effect/server-action'
import { getUser, saveSession } from '@/lib/session'
import type { AuthSchema } from '@/lib/validations/auth'
import { UserType } from '@/types/enums'

const login = createServerAction(
  z.object({
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),
  }),
  input => {
    const apiClient = new ApiClient()

    return pipe(
      apiClient.post(
        '/auth/login',
        input,
        z.object({
          accessToken: z.string(),
          refreshToken: z.string(),
          user: z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
          }),
        })
      )
    )
  }
)

export const loginAction = async (input: AuthSchema) => {
  const result = await login(input)

  if (!result.success) {
    return result
  }

  const { accessToken } = result.data

  await saveSession(accessToken)

  const { userType } = await getUser()

  if (userType !== UserType.GLOBAL_ADMIN) {
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
