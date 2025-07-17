import { ApiError, NetworkError, ValidationError } from '@/types/api'

export const handleError = (error: unknown): string => {
  if (error instanceof ValidationError) {
    return `Erro de validação: ${error.issues.map(i => i.message).join(', ')}`
  }

  if (error instanceof ApiError) {
    return `Erro da API (${error.status}): ${error.message}`
  }

  if (error instanceof NetworkError) {
    return `Erro de conexão: ${error.message}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Erro desconhecido'
}
