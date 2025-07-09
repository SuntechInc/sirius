'use server'

import { Effect } from 'effect'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import {
  type AppError,
  apiClient,
  createValidationError,
  getErrorMessage,
  ParseError,
} from '@/lib/effect'
import { saveSession } from '@/lib/session'
import { type AuthSchema, authSchema } from '@/lib/validations/auth'

export async function loginAction(input: AuthSchema) {
  const program = Effect.gen(function* () {
    const validatedData = yield* Effect.try({
      try: () => authSchema.parse(input),
      catch: (error): AppError => {
        if (error instanceof z.ZodError) {
          return createValidationError(error)
        }
        return new ParseError({
          message: 'Erro na validação dos dados',
          data: error,
        })
      },
    })

    const result = yield* apiClient.post(
      '/auth/login',
      validatedData,
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

    return result
  })

  const result = await Effect.runPromise(
    Effect.catchAll(program, error =>
      Effect.succeed({ error: getErrorMessage(error) })
    )
  )

  if ('error' in result) {
    return { error: result.error }
  }

  const { accessToken } = result

  await saveSession(accessToken)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
