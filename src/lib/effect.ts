import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { Data, Effect, Either, pipe } from 'effect'
import type { TimeoutException } from 'effect/Cause'
import { notFound } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

// ==================== TIPOS DE ERRO ====================
export class ValidationError extends Data.TaggedError('ValidationError')<{
  readonly field: string
  readonly message: string
  readonly code: string
}> {}

export class AuthenticationError extends Data.TaggedError(
  'AuthenticationError'
)<{
  readonly message: string
  readonly code: string
  readonly statusCode?: number
}> {}

export class NetworkError extends Data.TaggedError('NetworkError')<{
  readonly message: string
  readonly originalError?: unknown
}> {}

export class ApiError extends Data.TaggedError('ApiError')<{
  readonly message: string
  readonly statusCode: number
  readonly endpoint?: string
  readonly method?: string
  readonly data?: unknown
}> {}

export class ParseError extends Data.TaggedError('ParseError')<{
  readonly message: string
  readonly data?: unknown
}> {}

export class NotFoundError extends Data.TaggedError('NotFoundError')<{
  readonly message: string
  readonly resource?: string
  readonly id?: string | number
}> {}

export class ServerError extends Data.TaggedError('ServerError')<{
  readonly message: string
  readonly statusCode: number
}> {}

export class RateLimitError extends Data.TaggedError('RateLimitError')<{
  readonly message: string
  readonly retryAfter?: number
}> {}

export type AppError =
  | ValidationError
  | AuthenticationError
  | NetworkError
  | ApiError
  | ParseError
  | NotFoundError
  | ServerError
  | RateLimitError
  | TimeoutException

// ==================== UTILITÁRIOS DE ERRO ====================
export const createValidationError = (
  zodError: z.ZodError
): ValidationError => {
  const firstError = zodError.errors[0]
  const field = firstError.path.join('.')
  const message = firstError.message
  return new ValidationError({
    field,
    message,
    code: 'VALIDATION_ERROR',
  })
}

const handleAxiosError = (
  error: unknown,
  url?: string,
  method?: string
): AppError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message
    const data = error.response?.data

    if (status === 404) {
      return new NotFoundError({
        message: message || `Recurso não encontrado: ${url}`,
        resource: url,
      })
    }

    if (status === 401) {
      return new AuthenticationError({
        message: message || 'Não autorizado',
        code: 'UNAUTHORIZED',
        statusCode: status,
      })
    }

    if (status === 403) {
      return new AuthenticationError({
        message: message || 'Acesso negado',
        code: 'FORBIDDEN',
        statusCode: status,
      })
    }

    if (status === 429) {
      const retryAfter = error.response?.headers?.['retry-after']
      return new RateLimitError({
        message: message || 'Muitas requisições. Tente novamente mais tarde',
        retryAfter: retryAfter ? parseInt(retryAfter) : undefined,
      })
    }

    if (status && status >= 500) {
      return new ServerError({
        message: message || 'Erro interno do servidor',
        statusCode: status,
      })
    }

    if (status && status >= 400) {
      return new ApiError({
        message: message || `Erro na API: ${status}`,
        statusCode: status,
        endpoint: url,
        method: method,
        data: data,
      })
    }

    // Erro de rede (sem resposta)
    if (
      error.code === 'ECONNABORTED' ||
      error.code === 'ENOTFOUND' ||
      error.code === 'ECONNREFUSED'
    ) {
      return new NetworkError({
        message: 'Erro de conexão. Verifique sua internet',
        originalError: error,
      })
    }
  }

  return new NetworkError({
    message: 'Erro inesperado na requisição',
    originalError: error,
  })
}

// ==================== FUNÇÕES PRINCIPAIS ====================
export const httpRequest = <T>(
  axiosInstance: AxiosInstance,
  url: string,
  config: AxiosRequestConfig = {}
): Effect.Effect<T, AppError> =>
  Effect.tryPromise({
    try: async (): Promise<T> => {
      const response: AxiosResponse<T> = await axiosInstance.request({
        url,
        ...config,
      })
      return response.data
    },
    catch: error => handleAxiosError(error, url, config.method),
  })

export const validateData = <T>(
  data: unknown,
  schema: z.ZodSchema<T>
): Effect.Effect<T, AppError> =>
  Effect.try({
    try: () => schema.parse(data),
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

// ==================== CLIENTE API ====================
export const createApiClient = (axiosInstance: AxiosInstance) => {
  const request = <T>(url: string, config: AxiosRequestConfig = {}) =>
    httpRequest<T>(axiosInstance, url, config)

  return {
    // GET com validação
    get: <T>(
      url: string,
      schema: z.ZodSchema<T>,
      config: Omit<AxiosRequestConfig, 'method'> = {}
    ): Effect.Effect<T, AppError> =>
      pipe(
        request<unknown>(url, { ...config, method: 'GET' }),
        Effect.flatMap(data => validateData(data, schema))
      ),

    // POST com validação
    post: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
    ): Effect.Effect<TResponse, AppError> =>
      pipe(
        request<unknown>(url, {
          ...config,
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
        }),
        Effect.flatMap(responseData =>
          validateData(responseData, responseSchema)
        )
      ),

    // PUT com validação
    put: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
    ): Effect.Effect<TResponse, AppError> =>
      pipe(
        request<unknown>(url, {
          ...config,
          method: 'PUT',
          data,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
        }),
        Effect.flatMap(responseData =>
          validateData(responseData, responseSchema)
        )
      ),

    // PATCH com validação
    patch: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
    ): Effect.Effect<TResponse, AppError> =>
      pipe(
        request<unknown>(url, {
          ...config,
          method: 'PATCH',
          data,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
        }),
        Effect.flatMap(responseData =>
          validateData(responseData, responseSchema)
        )
      ),

    // DELETE
    delete: <T = void>(
      url: string,
      config: Omit<AxiosRequestConfig, 'method'> = {}
    ): Effect.Effect<T, AppError> =>
      request<T>(url, { ...config, method: 'DELETE' }),

    // Upload de arquivo
    uploadFile: <T>(
      url: string,
      file: File,
      responseSchema: z.ZodSchema<T>,
      additionalFields: Record<string, string> = {},
      config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
    ): Effect.Effect<T, AppError> => {
      const formData = new FormData()
      formData.append('file', file)

      Object.entries(additionalFields).forEach(([key, value]) => {
        formData.append(key, value)
      })

      return pipe(
        request<unknown>(url, {
          ...config,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...config.headers,
          },
        }),
        Effect.flatMap(responseData =>
          validateData(responseData, responseSchema)
        )
      )
    },

    // Buscar por ID
    fetchById: <T>(
      baseUrl: string,
      id: string | number,
      schema: z.ZodSchema<T>,
      config: AxiosRequestConfig = {}
    ): Effect.Effect<T, AppError> => {
      const url = `${baseUrl}/${id}`
      return pipe(
        request<unknown>(url, { ...config, method: 'GET' }),
        Effect.flatMap(data => validateData(data, schema))
      )
    },

    // Buscar com query parameters
    fetchWithQuery: <T>(
      url: string,
      schema: z.ZodSchema<T>,
      queryParams: Record<string, string | number | boolean> = {},
      config: AxiosRequestConfig = {}
    ): Effect.Effect<T, AppError> => {
      const params = { ...queryParams, ...config.params }
      return pipe(
        request<unknown>(url, { ...config, params, method: 'GET' }),
        Effect.flatMap(data => validateData(data, schema))
      )
    },

    // Buscar lista paginada
    fetchPaginated: <T>(
      url: string,
      schema: z.ZodSchema<T[]>,
      page: number = 1,
      limit: number = 10,
      config: AxiosRequestConfig = {}
    ): Effect.Effect<
      {
        data: T[]
        pagination: { page: number; limit: number; total?: number }
      },
      AppError
    > => {
      const params = {
        page: page.toString(),
        limit: limit.toString(),
        ...config.params,
      }

      return pipe(
        request<unknown>(url, { ...config, params, method: 'GET' }),
        Effect.flatMap(data => validateData(data, schema)),
        Effect.map(data => ({
          data,
          pagination: { page, limit },
        }))
      )
    },
  }
}

// ==================== UTILITÁRIOS PARA RETRY ====================
export const withRetry = <T>(
  effect: Effect.Effect<T, AppError>,
  maxRetries: number = 3
): Effect.Effect<T, AppError> => {
  const retryLogic = (attempt: number): Effect.Effect<T, AppError> =>
    pipe(
      effect,
      Effect.catchAll((error: AppError) => {
        // Só faz retry para erros de rede e servidor
        if (
          (error._tag === 'NetworkError' || error._tag === 'ServerError') &&
          attempt < maxRetries
        ) {
          const delay = 2 ** attempt * 100
          return pipe(
            Effect.sleep(`${delay} millis`),
            Effect.flatMap(() => retryLogic(attempt + 1))
          )
        }
        return Effect.fail(error)
      })
    )

  return retryLogic(0)
}

// ==================== UTILITÁRIOS PARA SERVER ACTIONS ====================
export const runServerAction = async <T>(
  effect: Effect.Effect<T, AppError>
): Promise<
  { success: true; data: T } | { success: false; error: AppError }
> => {
  return pipe(effect, Effect.either, Effect.runPromise, promise =>
    promise.then(either =>
      Either.match(either, {
        onLeft: error => ({ success: false as const, error }),
        onRight: data => ({ success: true as const, data }),
      })
    )
  )
}

// ==================== HOOK REACT ====================
export const useApiEffect = <T>(
  effect: Effect.Effect<T, AppError>,
  deps: React.DependencyList = []
): {
  data: T | null
  error: AppError | null
  loading: boolean
  refetch: () => void
} => {
  const [state, setState] = React.useState<{
    data: T | null
    error: AppError | null
    loading: boolean
  }>({
    data: null,
    error: null,
    loading: true,
  })

  const executeEffect = React.useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await Effect.runPromise(effect)
      setState({ data: result, error: null, loading: false })
    } catch (error) {
      setState({
        data: null,
        error: error as AppError,
        loading: false,
      })
    }
  }, deps)

  React.useEffect(() => {
    executeEffect()
  }, [executeEffect])

  return {
    ...state,
    refetch: executeEffect,
  }
}

export const runServerEffect = async <T>(
  effect: Effect.Effect<T, AppError>
): Promise<T> => {
  const result = await runServerAction(effect)

  if (!result.success) {
    // Se for erro 404, usar notFound() do Next.js
    if (result.error._tag === 'NotFoundError') {
      notFound()
    }

    // Para outros erros, propagar
    throw new Error(result.error.message || 'Erro no servidor')
  }

  return result.data
}

// ==================== UTILITÁRIOS DE MENSAGENS ====================
export const getErrorMessage = (error: AppError): string => {
  switch (error._tag) {
    case 'ValidationError':
      return `${error.field} => ${error.message}`
    case 'AuthenticationError':
      return getAuthMessage(error.code, error.message)
    case 'NetworkError':
      return 'Problema de conexão. Verifique sua internet e tente novamente'
    case 'ApiError':
      return `Erro na API (${error.statusCode}): ${error.message}`
    case 'ParseError':
      return 'Erro ao processar dados recebidos'
    case 'NotFoundError':
      return error.resource
        ? `${error.resource} não encontrado`
        : 'Recurso não encontrado'
    case 'ServerError':
      return `Erro no servidor (${error.statusCode}). Tente novamente em alguns minutos`
    case 'RateLimitError':
      return error.retryAfter
        ? `Muitas requisições. Tente novamente em ${error.retryAfter} segundos`
        : 'Muitas requisições. Tente novamente em alguns minutos'
    default:
      return 'Erro inesperado'
  }
}

const getAuthMessage = (code: string, fallback: string): string => {
  const messages: Record<string, string> = {
    INVALID_CREDENTIALS: 'Email ou senha incorretos',
    ACCOUNT_BLOCKED: 'Sua conta foi temporariamente bloqueada',
    RATE_LIMIT: 'Muitas tentativas de login. Tente novamente em alguns minutos',
    UNAUTHORIZED: 'Você precisa estar logado para acessar este recurso',
    FORBIDDEN: 'Você não tem permissão para acessar este recurso',
  }
  return messages[code] || fallback
}

// ==================== FACTORY DE ERROS ====================
export const createError = {
  validation: (field: string, message: string) =>
    new ValidationError({ field, message, code: 'VALIDATION_ERROR' }),
  auth: (message: string, code: string, statusCode?: number) =>
    new AuthenticationError({ message, code, statusCode }),
  network: (message = 'Erro de conexão', originalError?: unknown) =>
    new NetworkError({ message, originalError }),
  api: (
    message: string,
    statusCode: number,
    endpoint?: string,
    method?: string,
    data?: unknown
  ) => new ApiError({ message, statusCode, endpoint, method, data }),
  parse: (message: string, data?: unknown) => new ParseError({ message, data }),
  notFound: (message: string, resource?: string, id?: string | number) =>
    new NotFoundError({ message, resource, id }),
  server: (message: string, statusCode: number) =>
    new ServerError({ message, statusCode }),
  rateLimit: (message: string, retryAfter?: number) =>
    new RateLimitError({ message, retryAfter }),
}
