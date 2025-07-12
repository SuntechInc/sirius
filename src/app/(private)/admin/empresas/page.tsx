import { Effect } from 'effect'
import { AlertCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { columns } from '@/components/company-table/columns'
import { DataTable } from '@/components/data-table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { getCompanies } from '@/lib/company'
import { runServerEffect } from '@/lib/effect'

export default async function CompaniesPage() {
  const result = await runServerEffect(getCompanies())

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
        <DataTable columns={columns} data={result.data} />
      </div>
    </div>
  )
}
