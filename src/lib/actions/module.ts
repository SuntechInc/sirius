'use server'

import { pipe } from 'effect'
import { z } from 'zod'
import { ApiClient } from '@/lib/effect/api-client'
import { runEffect } from '@/lib/effect/utils'
import { moduleSchema, companyModuleSchema } from '@/lib/queries/module'

const apiClient = new ApiClient()

// Buscar módulos disponíveis
export const getAvailableModulesAction = async () => {
  try {
    
    const result = await runEffect(
      pipe(
        apiClient.get(
          '/companies/modules',
          z.array(moduleSchema)
        )
      )
    )


    if ('error' in result) {
      return {
        success: false,
        error: result.error || 'Erro interno do servidor'
      }
    } else {
      return { success: true, data: result }
    }
  } catch (error) {
    console.error('💥 Erro ao buscar módulos disponíveis:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

// Buscar módulos da empresa
export const getCompanyModulesAction = async (companyId: string) => {
  try {
    
    const result = await runEffect(
      pipe(
        apiClient.get(
          `/companies/${companyId}/modules`,
          z.array(companyModuleSchema)
        )
      )
    )

    if ('error' in result) {
      return {
        success: false,
        error: result.error || 'Erro interno do servidor'
      }
    } else {
      return { success: true, data: result }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

// Ativar módulo da empresa
export const enableCompanyModuleAction = async (companyId: string, moduleCode: string, segment: string) => {
  try {
    
    const result = await runEffect(
      pipe(
        apiClient.post(
          `/companies/${companyId}/modules`,
          { moduleCode, segment },
          companyModuleSchema
        )
      )
    )

    if ('error' in result) {
      console.error('❌ Erro ao ativar módulo:', result.error)
      return {
        success: false,
        error: result.error || 'Erro interno do servidor'
      }
    } else {
      return { success: true, data: result }
    }
  } catch (error) {
    console.error('💥 Erro ao ativar módulo:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
} 