import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { branchColumns } from '@/components/company-table/branch-columns'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { getBranches } from '@/lib/company'
import { runServerEffect } from '@/lib/effect'
import { getUser } from '@/lib/session'

export default async function BranchesPage() {
  const user = await getUser()
 
  const result = await runServerEffect(getBranches({ companyId: user.actionCompanyId }))
  console.log('result', result)

  return (
    <div className="p-6">
      <div className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Empresas e Filiais</h1>
            <p className="text-gray-600 mt-2">
              Gerencie as empresas e filiais do sistema
            </p>
          </div>
          <Button asChild>
            <Link href="/cadastro/empresas/criar">
              <PlusCircle className="size-4" />
              Cadastrar nova filial
            </Link>
          </Button>
        </div>
        <DataTable columns={branchColumns} data={result.data} />
      </div>
    </div>
  )
}
