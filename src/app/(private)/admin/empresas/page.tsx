import { pipe } from 'effect'
import { z } from 'zod'
import { CompaniesTable } from '@/components/company-table/companies-table'
import { CompanyCreateModal } from '@/components/company-create-modal'
import { ApiClient } from '@/lib/effect/api-client'
import { runEffect } from '@/lib/effect/utils'
import { companySchema } from '@/lib/queries/company'

export default async function CompaniesPage() {
  const apiClient = new ApiClient()

  const result = await runEffect(
    pipe(
      apiClient.get(
        '/companies/filter',
        z.object({
          data: z.array(companySchema),
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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Empresas</h1>
          <p className="text-muted-foreground">Gerenciamento de todas as empresas</p>
        </div>
        <CompanyCreateModal />
      </div>

      <CompaniesTable data={result.data.data} />
    </div>
  )
}
