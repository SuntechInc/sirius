'use server'

import { UserType } from '@/types/enums'
import { Effect } from 'effect'
import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ApiServiceLive } from '../api.effect'
import { saveSession, type User } from '../session'
import type { AuthSchema } from '../validations/auth'
import { loginEffect } from './login.effect'

export async function loginAction(input: AuthSchema) {
  const loginWorkflow = Effect.gen(function* (_) {
    yield* _(Effect.log('Iniciando login action'))

    const startTime = yield* _(Effect.sync(() => Date.now()))

    const authResult = yield* _(loginEffect(input))

    const endTime = yield* _(Effect.sync(() => Date.now()))
    const duration = endTime - startTime

    yield* _(Effect.log(`Login concluído em ${duration}ms`))

    yield* _(
      Effect.tryPromise({
        try: () => saveSession(authResult.accessToken),
        catch: () => new Error('Falha ao salvar sessão'),
      })
    )

    yield* _(Effect.sync(() => revalidatePath('/dashboard')))

    return authResult
  })

  const result = await Effect.runPromise(
    loginWorkflow.pipe(
      Effect.match({
        onFailure: error => {
          console.error('Login failed:', error)
          return {
            success: false as const,
            error: error.message,
          }
        },
        onSuccess: data => ({
          success: true as const,
          data,
        }),
      }),
      Effect.provide(ApiServiceLive)
    )
  )

  if (result.success) {
    const { userType } = jwt.decode(result.data.accessToken) as unknown as User

    if (userType === UserType.GLOBAL_ADMIN) {
      redirect('/admin')
    }

    redirect('/dashboard')
  }

  return result
}
