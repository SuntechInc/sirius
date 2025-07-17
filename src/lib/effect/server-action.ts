import { Effect, pipe } from 'effect'
import type { z } from 'zod'
import { runEffect, validateSchema } from '@/lib/effect/utils'

export const createServerAction = <TInput, TOutput>(
  inputSchema: z.ZodSchema<TInput>,
  handler: (input: TInput) => Effect.Effect<TOutput, Error>
) => {
  return async (input: TInput) => {
    return runEffect(
      pipe(validateSchema(inputSchema)(input), Effect.flatMap(handler))
    )
  }
}
