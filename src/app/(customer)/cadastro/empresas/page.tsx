import { AlertCircleIcon } from 'lucide-react'
import { branchColumns } from '@/components/company-table/branch-columns'
import { DataTable } from '@/components/data-table'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CompanyHeader } from './_components/company-header'
import { getBranches } from './_queries/get-branches'

export default async function BranchesPage() {
  const result = await getBranches()

  if ('error' in result) {
    return (
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          <CompanyHeader />
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{result.error}</AlertTitle>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6">
        <CompanyHeader />
        <DataTable columns={branchColumns} data={result.data.data} />
      </div>
    </div>
  )
}
