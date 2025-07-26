import axios, { type AxiosRequestConfig } from 'axios'
import { Effect, pipe } from 'effect'
import type { z } from 'zod'
import { createHttpClient } from '@/lib/api'
import { ApiError, NetworkError } from '@/types/api'
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
        catch: error => {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              return new ApiError(
                error.response.data?.message || error.message,
                error.response.status,
                error.response.data?.code
              )
            }
            return new NetworkError(error.message, error)
          }
          return new Error(`${error}`)
        },
      }),
      Effect.map(response => response.data),
      Effect.flatMap(validateSchema(responseSchema))
    )
  }

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
            catch: error => {
              if (axios.isAxiosError(error)) {
                if (error.response) {
                  return new ApiError(
                    error.response.data?.message || error.message,
                    error.response.status,
                    error.response.data?.code
                  )
                }
                return new NetworkError(error.message, error)
              }
              return new Error(`${error}`)
            },
          }),
          Effect.map(response => response.data),
          Effect.flatMap(validateSchema(responseSchema))
        )
      )
    )
  }

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
            catch: error => {
              if (axios.isAxiosError(error)) {
                if (error.response) {
                  return new ApiError(
                    error.response.data?.message || error.message,
                    error.response.status,
                    error.response.data?.code
                  )
                }
                return new NetworkError(error.message, error)
              }
              return new Error(`${error}`)
            },
          }),
          Effect.map(response => response.data),
          Effect.flatMap(validateSchema(responseSchema))
        )
      )
    )
  }

  delete<T>(
    url: string,
    responseSchema: z.ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Effect.Effect<T, Error> {
    return pipe(
      Effect.tryPromise({
        try: () => this.client.delete(url, config),
        catch: error => {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              return new ApiError(
                error.response.data?.message || error.message,
                error.response.status,
                error.response.data?.code
              )
            }
            return new NetworkError(error.message, error)
          }
          return new Error(`${error}`)
        },
      }),
      Effect.map(response => response.data),
      Effect.flatMap(validateSchema(responseSchema))
    )
  }
}
