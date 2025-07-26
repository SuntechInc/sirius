import type { ReactNode } from 'react'
import type { z } from 'zod'

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'select'
  | 'switch'
  | 'textarea'

export interface SelectOption {
  value: string
  label: string
}

export interface FormFieldConfig {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
  description?: string
  tooltip?: string
  gridCols?: 1 | 2
  validation?: z.ZodTypeAny
}

export interface FormConfig<T = any> {
  title: string
  description?: string
  schema: z.ZodType<T>
  fields: FormFieldConfig[]
  defaultValues: Partial<T>
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
  className?: string
}

export interface CreateModalProps<T = unknown> {
  config: FormConfig<T>
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  trigger?: ReactNode
  onSuccess?: () => void
}
