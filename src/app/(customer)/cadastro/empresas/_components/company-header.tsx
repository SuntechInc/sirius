'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNewCompany } from '../_hooks/use-new-company'
import { NewCompanyDialog } from './new-company-dialog'

export function CompanyHeader() {
  const { onOpen } = useNewCompany()

  return (
    <>
      <NewCompanyDialog />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Empresas e Filiais</h1>
          <p className="text-gray-600">
            Gerencie as empresas e filiais do sistema
          </p>
        </div>
        <Button onClick={onOpen}>
          <Plus className="size-4" />
          Nova empresa
        </Button>
      </div>
    </>
  )
}
