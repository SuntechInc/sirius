import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { Data, Effect, pipe } from 'effect'
import type { TimeoutException } from 'effect/Cause'
import { z } from 'zod'
import { api } from '@/lib/api'
import { getSession } from '@/lib/session'

// Classes de erro mantidas
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

// Solução 4: Verificar se a URL contém o padrão (mais simples)
const isPrivateRoute = (url: string): boolean => {
  const publicRoutes = ['/auth/login']

  // Verifica se a URL contém alguma das rotas públicas
  return !publicRoutes.some(route => url.includes(route))
}

// Interceptor corrigido
const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async config => {
      const { token } = await getSession()

      // Adiciona token apenas para rotas privadas
      if (token && isPrivateRoute(config.url || '')) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    error => Promise.reject(error)
  )
}

// Inicializa os interceptors
setupInterceptors(api)

// Função para converter erros do Axios para nossos tipos
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

// Função genérica para fazer requisições HTTP com Effect usando sua instância do axios
export const httpRequest = <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Effect.Effect<T, AppError> =>
  Effect.tryPromise({
    try: async (): Promise<T> => {
      const response: AxiosResponse<T> = await api.request({
        url,
        ...config,
      })
      return response.data
    },
    catch: error => handleAxiosError(error, url, config.method),
  })

// Função para GET com validação Zod
export const getWithValidation = <T>(
  url: string,
  schema: z.ZodSchema<T>,
  config: Omit<AxiosRequestConfig, 'method'> = {}
): Effect.Effect<T, AppError> =>
  pipe(
    httpRequest<unknown>(url, { ...config, method: 'GET' }),
    Effect.flatMap(data =>
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
    )
  )

// Função para POST com validação
export const postWithValidation = <TRequest, TResponse>(
  url: string,
  data: TRequest,
  responseSchema: z.ZodSchema<TResponse>,
  config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
): Effect.Effect<TResponse, AppError> =>
  pipe(
    httpRequest<unknown>(url, {
      ...config,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    }),
    Effect.flatMap(responseData =>
      Effect.try({
        try: () => responseSchema.parse(responseData),
        catch: (error): AppError => {
          if (error instanceof z.ZodError) {
            return createValidationError(error)
          }
          return new ParseError({
            message: 'Erro na validação da resposta',
            data: error,
          })
        },
      })
    )
  )

// Função para PUT com validação
export const putWithValidation = <TRequest, TResponse>(
  url: string,
  data: TRequest,
  responseSchema: z.ZodSchema<TResponse>,
  config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
): Effect.Effect<TResponse, AppError> =>
  pipe(
    httpRequest<unknown>(url, {
      ...config,
      method: 'PUT',
      data,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    }),
    Effect.flatMap(responseData =>
      Effect.try({
        try: () => responseSchema.parse(responseData),
        catch: (error): AppError => {
          if (error instanceof z.ZodError) {
            return createValidationError(error)
          }
          return new ParseError({
            message: 'Erro na validação da resposta',
            data: error,
          })
        },
      })
    )
  )

// Função para DELETE
export const deleteRequest = <T = void>(
  url: string,
  config: Omit<AxiosRequestConfig, 'method'> = {}
): Effect.Effect<T, AppError> =>
  httpRequest<T>(url, { ...config, method: 'DELETE' })

// Função para PATCH
export const patchWithValidation = <TRequest, TResponse>(
  url: string,
  data: TRequest,
  responseSchema: z.ZodSchema<TResponse>,
  config: Omit<AxiosRequestConfig, 'method' | 'data'> = {}
): Effect.Effect<TResponse, AppError> =>
  pipe(
    httpRequest<unknown>(url, {
      ...config,
      method: 'PATCH',
      data,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    }),
    Effect.flatMap(responseData =>
      Effect.try({
        try: () => responseSchema.parse(responseData),
        catch: (error): AppError => {
          if (error instanceof z.ZodError) {
            return createValidationError(error)
          }
          return new ParseError({
            message: 'Erro na validação da resposta',
            data: error,
          })
        },
      })
    )
  )

// Função para buscar com retry automático
export const fetchWithRetry = <T>(
  url: string,
  schema: z.ZodSchema<T>,
  retries: number = 3,
  config: AxiosRequestConfig = {}
): Effect.Effect<T, AppError> => {
  const retryLogic = (attempt: number): Effect.Effect<T, AppError> =>
    pipe(
      getWithValidation(url, schema, config),
      Effect.catchAll((error: AppError) => {
        // Só faz retry para erros de rede e servidor
        if (
          (error._tag === 'NetworkError' || error._tag === 'ServerError') &&
          attempt < retries
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

// Função para buscar lista paginada
export const fetchPaginated = <T>(
  url: string,
  schema: z.ZodSchema<T[]>,
  page: number = 1,
  limit: number = 10,
  config: AxiosRequestConfig = {}
): Effect.Effect<
  { data: T[]; pagination: { page: number; limit: number; total?: number } },
  AppError
> => {
  const params = {
    page: page.toString(),
    limit: limit.toString(),
    ...config.params,
  }

  return pipe(
    getWithValidation(url, schema, { ...config, params }),
    Effect.map(data => ({
      data,
      pagination: { page, limit },
    }))
  )
}

// Função para buscar por ID
export const fetchById = <T>(
  baseUrl: string,
  id: string | number,
  schema: z.ZodSchema<T>,
  config: AxiosRequestConfig = {}
): Effect.Effect<T, AppError> => {
  const url = `${baseUrl}/${id}`
  return getWithValidation(url, schema, config)
}

// Função para buscar com query parameters
export const fetchWithQuery = <T>(
  url: string,
  schema: z.ZodSchema<T>,
  queryParams: Record<string, string | number | boolean> = {},
  config: AxiosRequestConfig = {}
): Effect.Effect<T, AppError> => {
  const params = {
    ...queryParams,
    ...config.params,
  }

  return getWithValidation(url, schema, { ...config, params })
}

// Função para fazer upload de arquivos
export const uploadFile = <T>(
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
    httpRequest<unknown>(url, {
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
    }),
    Effect.flatMap(responseData =>
      Effect.try({
        try: () => responseSchema.parse(responseData),
        catch: (error): AppError => {
          if (error instanceof z.ZodError) {
            return createValidationError(error)
          }
          return new ParseError({
            message: 'Erro na validação da resposta',
            data: error,
          })
        },
      })
    )
  )
}

// Função para criar um cliente API tipado
export const createApiClient = () => {
  return {
    get: <T>(
      url: string,
      schema: z.ZodSchema<T>,
      config?: AxiosRequestConfig
    ) => getWithValidation(url, schema, config),

    post: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config?: AxiosRequestConfig
    ) => postWithValidation(url, data, responseSchema, config),

    put: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config?: AxiosRequestConfig
    ) => putWithValidation(url, data, responseSchema, config),

    patch: <TRequest, TResponse>(
      url: string,
      data: TRequest,
      responseSchema: z.ZodSchema<TResponse>,
      config?: AxiosRequestConfig
    ) => patchWithValidation(url, data, responseSchema, config),

    delete: <T = void>(url: string, config?: AxiosRequestConfig) =>
      deleteRequest<T>(url, config),

    fetchById: <T>(
      baseUrl: string,
      id: string | number,
      schema: z.ZodSchema<T>,
      config?: AxiosRequestConfig
    ) => fetchById(baseUrl, id, schema, config),

    fetchWithQuery: <T>(
      url: string,
      schema: z.ZodSchema<T>,
      queryParams?: Record<string, string | number | boolean>,
      config?: AxiosRequestConfig
    ) => fetchWithQuery(url, schema, queryParams, config),

    fetchPaginated: <T>(
      url: string,
      schema: z.ZodSchema<T[]>,
      page?: number,
      limit?: number,
      config?: AxiosRequestConfig
    ) => fetchPaginated(url, schema, page, limit, config),

    uploadFile: <T>(
      url: string,
      file: File,
      responseSchema: z.ZodSchema<T>,
      additionalFields?: Record<string, string>,
      config?: AxiosRequestConfig
    ) => uploadFile(url, file, responseSchema, additionalFields, config),
  }
}

// Instância do cliente API
export const apiClient = createApiClient()

// Funções helper existentes
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

export const handleApiError = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    return handleAxiosError(error)
  }

  if (error instanceof Error && error.message.includes('Network')) {
    return new NetworkError({
      message: 'Verifique sua conexão com a internet',
      originalError: error,
    })
  }

  return new ApiError({
    message: 'Erro inesperado na API',
    statusCode: 500,
  })
}

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
