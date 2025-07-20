'use client'

import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateModal } from '@/components/ui/create-modal'
import { branchCreateConfig } from '@/lib/configs/form-configs'
import type { CreateBranchData } from '@/lib/configs/form-configs'

interface BranchCreateModalProps {
  trigger?: React.ReactNode
  onSubmit: (data: CreateBranchData) => Promise<{ success: boolean; error?: string }>
}

export function BranchCreateModal({ trigger, onSubmit }: BranchCreateModalProps) {
  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Criar nova filial
    </Button>
  )

  return (
    <CreateModal
      config={branchCreateConfig}
      onSubmit={onSubmit}
      trigger={trigger || defaultTrigger}
    />
  )
} 