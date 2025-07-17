import { Effect, pipe } from 'effect'
import { z } from 'zod'
import { ValidationError } from '@/types/api'
import { handleError } from './error-handler'

export const validateSchema =
  <T>(schema: z.ZodSchema<T>) =>
  (data: unknown): Effect.Effect<T, ValidationError> =>
    pipe(
      Effect.try(() => schema.parse(data)),
      Effect.mapError(error => {
        if (error instanceof z.ZodError) {
          return new ValidationError('Erro de validação', error.issues)
        }
        return new ValidationError('Erro de validação desconhecido', [])
      })
    )

export const runEffect = <T, E extends Error>(
  effect: Effect.Effect<T, E>
): Promise<{ success: true; data: T } | { success: false; error: string }> =>
  pipe(effect, Effect.runPromise, promise =>
    promise.then(
      data => ({ success: true as const, data }),
      error => ({
        success: false as const,
        error: handleError(error),
      })
    )
  )

export const runEffectSync = <T, E extends Error>(
  effect: Effect.Effect<T, E>
): T => {
  return Effect.runSync(effect)
}
