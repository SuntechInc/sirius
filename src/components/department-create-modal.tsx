'use client'

import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateModal } from '@/components/ui/create-modal'
import { departmentCreateConfig } from '@/lib/configs/form-configs'
import type { CreateDepartmentData } from '@/lib/configs/form-configs'

interface DepartmentCreateModalProps {
  trigger?: React.ReactNode
  onSubmit: (data: CreateDepartmentData) => Promise<{ success: boolean; error?: string }>
}

export function DepartmentCreateModal({ trigger, onSubmit }: DepartmentCreateModalProps) {
  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Criar novo departamento
    </Button>
  )

  return (
    <CreateModal
      config={departmentCreateConfig}
      onSubmit={onSubmit}
      trigger={trigger || defaultTrigger}
    />
  )
} 