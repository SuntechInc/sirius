'use client'

import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateModal } from '@/components/ui/create-modal'
import { createCompanyAction } from '@/lib/actions/company'
import type { CreateCompanyData } from '@/lib/configs/form-configs'
import { companyCreateConfig } from '@/lib/configs/form-configs'

interface CompanyCreateModalProps {
  trigger?: React.ReactNode
}

export function CompanyCreateModal({ trigger }: CompanyCreateModalProps) {
  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Criar nova empresa
    </Button>
  )

  const handleSubmit = async (data: CreateCompanyData) => {
    const result = await createCompanyAction(data)
    return result
  }

  return (
    <CreateModal
      config={companyCreateConfig}
      onSubmit={handleSubmit}
      trigger={trigger || defaultTrigger}
    />
  )
}
