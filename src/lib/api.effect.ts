import { Context, Effect, Layer } from 'effect'
import { api } from './api'
import { type AppError, handleApiError } from './effect'

export class ApiService extends Context.Tag('ApiService')<
  ApiService,
  {
    readonly post: <T>(url: string, data: unknown) => Effect.Effect<T, AppError>
  }
>() {}

export const ApiServiceLive = Layer.succeed(
  ApiService,
  ApiService.of({
    post: <T>(url: string, data: unknown) =>
      Effect.tryPromise({
        try: async () => {
          const response = await api.post<T>(url, data)
          return response.data
        },
        catch: handleApiError,
      }),
  })
)
