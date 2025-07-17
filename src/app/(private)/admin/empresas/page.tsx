import { pipe } from 'effect'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { columns } from '@/components/company-table/columns'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
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
    <div className="p-6">
      <div className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
            <p className="text-gray-600 mt-2">
              Gerenciamento de todas as empresas
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/empresas/criar">
              <PlusCircle className="size-4" />
              Criar nova empresa
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={result.data.data} />
      </div>
    </div>
  )
}
