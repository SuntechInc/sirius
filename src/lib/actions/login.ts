'use server'

import { Effect, pipe } from 'effect'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { runServerAction } from '@/lib/effect'
import type { AuthSchema } from '@/lib/validations/auth'
import { UserType } from '@/types/enums'
import { apiClient } from '../api'
import { getUser, saveSession } from '../session'

const createUser = (authInput: AuthSchema) =>
  pipe(
    Effect.succeed(authInput),
    Effect.flatMap(data =>
      pipe(
        Effect.succeed(data),
        Effect.flatMap(validData =>
          apiClient.post(
            '/auth/login',
            validData,
            z.object({
              accessToken: z.string(),
              refreshToken: z.string(),
              user: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
              }),
            })
          )
        )
      )
    )
  )
export async function loginAction(input: AuthSchema) {
  const effect = pipe(
    pipe(createUser(input)),
    Effect.tapError(error => Effect.logError('Erro ao realizar login:', error))
  )

  const result = await runServerAction(effect)

  console.log(result)

  if (!result.success) {
    return {
      error: result.error._tag,
      message: result.error.message,
    }
  }

  await saveSession(result.data.accessToken)

  const user = await getUser()

  if (user.userType !== UserType.GLOBAL_ADMIN) {
    redirect('/dashboard')
  }

  redirect('/admin')
}
