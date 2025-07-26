import type { AxiosError } from 'axios'

import { z } from 'zod'

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
})

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  total: z.number().optional(),
  totalPages: z.number().optional(),
})

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = ApiResponse<T> & {
  pagination: z.infer<typeof PaginationSchema>
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public issues: z.ZodIssue[]
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ApiError extends Error {
  readonly _tag = 'ApiError'

  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NetworkError extends Error {
  readonly _tag = 'NetworkError'

  constructor(
    message: string,
    public originalError: AxiosError
  ) {
    super(message)
    this.name = 'NetworkError'
  }
}
