import type { AxiosRequestConfig } from 'axios'
import { Effect, pipe } from 'effect'
import type { z } from 'zod'
import { createHttpClient } from '@/lib/api'
import { validateSchema } from './utils'

export class ApiClient {
  private client = createHttpClient(process.env.NEXT_PUBLIC_API_URL || '')

  get<T>(
    url: string,
    responseSchema: z.ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Effect.Effect<T, Error> {
    return pipe(
      Effect.tryPromise({
        try: () => this.client.get(url, config),
        catch: unknown => new Error(`${unknown}`),
      }),
      Effect.map(response => response.data),
      Effect.flatMap(validateSchema(responseSchema))
    )
  }

  // POST com validação
  post<T, D>(
    url: string,
    data: D,
    responseSchema: z.ZodSchema<T>,
    dataSchema?: z.ZodSchema<D>,
    config?: AxiosRequestConfig
  ): Effect.Effect<T, Error> {
    return pipe(
      dataSchema ? validateSchema(dataSchema)(data) : Effect.succeed(data),
      Effect.flatMap(validatedData =>
        pipe(
          Effect.tryPromise({
            try: () => this.client.post(url, validatedData, config),
            catch: unknown => new Error(`${unknown}`),
          }),
          Effect.map(response => response.data),
          Effect.flatMap(validateSchema(responseSchema))
        )
      )
    )
  }

  // PUT com validação
  put<T, D>(
    url: string,
    data: D,
    responseSchema: z.ZodSchema<T>,
    dataSchema?: z.ZodSchema<D>,
    config?: AxiosRequestConfig
  ): Effect.Effect<T, Error> {
    return pipe(
      dataSchema ? validateSchema(dataSchema)(data) : Effect.succeed(data),
      Effect.flatMap(validatedData =>
        pipe(
          Effect.tryPromise({
            try: () => this.client.put(url, validatedData, config),
            catch: unknown => new Error(`${unknown}`),
          }),
          Effect.map(response => response.data),
          Effect.flatMap(validateSchema(responseSchema))
        )
      )
    )
  }

  // DELETE com validação
  delete<T>(
    url: string,
    responseSchema: z.ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Effect.Effect<T, Error> {
    return pipe(
      Effect.tryPromise({
        try: () => this.client.put(url, config),
        catch: unknown => new Error(`${unknown}`),
      }),
      Effect.map(response => response.data),
      Effect.flatMap(validateSchema(responseSchema))
    )
  }
}
