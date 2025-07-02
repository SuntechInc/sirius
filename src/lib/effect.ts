import { Data } from 'effect'
import type { TimeoutException } from 'effect/Cause'
import type { z } from 'zod'

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
}> {}

export type AppError =
  | ValidationError
  | AuthenticationError
  | NetworkError
  | TimeoutException

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

const createAuthError = (
  status: number,
  message?: string
): AuthenticationError => {
  const errorMap: Record<number, { message: string; code: string }> = {
    401: {
      message: 'Email ou senha incorretos',
      code: 'INVALID_CREDENTIALS',
    },
    403: {
      message: 'Conta bloqueada',
      code: 'ACCOUNT_BLOCKED',
    },
    422: {
      message: 'Dados inválidos',
      code: 'INVALID_DATA',
    },
    429: {
      message: 'Muitas tentativas. Tente novamente em alguns minutos',
      code: 'RATE_LIMIT',
    },
  }

  const errorInfo = errorMap[status] || {
    message: message || 'Erro no servidor',
    code: 'SERVER_ERROR',
  }

  return new AuthenticationError({
    message: errorInfo.message,
    code: errorInfo.code,
    statusCode: status,
  })
}

export const handleApiError = (error: unknown): AppError => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as {
      response: { status: number; data?: { message?: string } }
    }
    return createAuthError(
      apiError.response.status,
      apiError.response.data?.message
    )
  }

  if (error instanceof Error && error.message.includes('Network')) {
    return new NetworkError({
      message: 'Verifique sua conexão com a internet',
    })
  }

  return new AuthenticationError({
    message: 'Erro inesperado durante a autenticação',
    code: 'UNKNOWN_ERROR',
  })
}

export const getErrorMessage = (error: AppError) => {
  switch (error._tag) {
    case 'ValidationError':
      return `${error.field === 'email' ? 'Email' : 'Senha'}: ${error.message}`

    case 'AuthenticationError':
      return getAuthMessage(error.code, error.message)

    case 'NetworkError':
      return 'Problema de conexão. Verifique sua internet e tente novamente'
  }
}

const getAuthMessage = (code: string, fallback: string): string => {
  const messages: Record<string, string> = {
    INVALID_CREDENTIALS: 'Email ou senha incorretos',
    ACCOUNT_BLOCKED: 'Sua conta foi temporariamente bloqueada',
    RATE_LIMIT: 'Muitas tentativas de login. Tente novamente em alguns minutos',
  }

  return messages[code] || fallback
}

export const createError = {
  validation: (field: string, message: string) =>
    new ValidationError({ field, message, code: 'VALIDATION_ERROR' }),

  auth: (message: string, code: string, statusCode?: number) =>
    new AuthenticationError({ message, code, statusCode }),

  network: (message = 'Erro de conexão') => new NetworkError({ message }),
}
