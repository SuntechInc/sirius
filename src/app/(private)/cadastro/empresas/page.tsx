import { pipe } from 'effect'
import { z } from 'zod'
import { branchColumns } from '@/components/company-table/branch-columns'
import { DataTable } from '@/components/data-table'
import { BranchCreateModal } from '@/components/branch-create-modal'
import { ApiClient } from '@/lib/effect/api-client'
import { runEffect } from '@/lib/effect/utils'
import { branchSchema } from '@/lib/queries/branch'
import { getUser } from '@/lib/session'
import type { CreateBranchData } from '@/lib/configs/form-configs'

export default async function BranchesPage() {
  const user = await getUser()
  const apiClient = new ApiClient()

  const result = await runEffect(
    pipe(
      apiClient.get(
        `/branches/filter?companyId=${user.companyId}`,
        z.object({
          data: z.array(branchSchema),
          pagination: z.object({
            hasNext: z.boolean(),
            hasPrevious: z.boolean(),
            page: z.number(),
            size: z.number(),
            total: z.number(),
            totalPages: z.number(),
          }),
          filter: z.any().optional(),
        })
      )
    )
  )

  if ('error' in result) {
    return <div>{result.error}</div>
  }

  return (
    <div className="p-6">
      <div className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Empresas e Filiais
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie as empresas e filiais do sistema
            </p>
          </div>
          <BranchCreateModal 
            onSubmit={async (data: CreateBranchData) => {
              // TODO: Implementar chamada da API
              console.log('Dados da filial:', data)
              
              // Simular delay da API
              await new Promise(resolve => setTimeout(resolve, 1000))
              
              return { success: true }
            }}
          />
        </div>
        <DataTable columns={branchColumns} data={result.data.data} />
      </div>
    </div>
  )
}
