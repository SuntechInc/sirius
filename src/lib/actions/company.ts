'use server'

import { pipe } from 'effect'
import { revalidatePath } from 'next/cache'
import { ApiClient } from '@/lib/effect/api-client'
import { createServerAction } from '@/lib/effect/server-action'
import { createCompanySchema } from '@/lib/configs/form-configs'
import { companySchema } from '@/lib/queries/company'
import type { CreateCompanyData } from '@/lib/configs/form-configs'

const createCompany = createServerAction(
  createCompanySchema,
  (input: CreateCompanyData) => {
    const apiClient = new ApiClient()

    return pipe(
      apiClient.post(
        '/company',
        input,
        companySchema
      )
    )
  }
)

export const createCompanyAction = async (input: CreateCompanyData) => {
  try {
    const result = await createCompany(input)

    if (result.success) {
      revalidatePath('/admin/empresas')
      return { success: true }
    } else {
      console.error('Erro na criação da empresa:', result.error)
      return { 
        success: false, 
        error: result.error || 'Erro interno do servidor' 
      }
    }
  } catch (error) {
    console.error('Erro na criação da empresa:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
} 