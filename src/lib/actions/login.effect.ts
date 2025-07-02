import { Effect } from 'effect'
import { z } from 'zod'
import { ApiService } from '../api.effect'
import { createError, createValidationError } from '../effect'
import { type AuthSchema, authSchema } from '../validations/auth'

const validateLoginData = (input: AuthSchema) =>
  Effect.try({
    try: () => authSchema.parse(input),
    catch: error =>
      error instanceof z.ZodError
        ? createValidationError(error)
        : createError.network('Erro ao validar dados de login'),
  })

const authenticate = (data: AuthSchema) =>
  Effect.gen(function* (_) {
    const apiService = yield* _(ApiService)
    return yield* _(
      apiService.post<{ accessToken: string }>('/auth/login', data)
    )
  })

export const loginEffect = (input: AuthSchema) =>
  validateLoginData(input).pipe(
    Effect.flatMap(authenticate),
    Effect.retry({ times: 2 }), // Retry até 2 vezes
    Effect.timeout(5000), // Timeout de 5 segundos
    Effect.catchAll(error => Effect.fail(error))
  )
