'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface OnboardTenantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (tenantData: {
    name: string
    adminEmail: string
    status: string
    plan: string
  }) => void
}

export function OnboardTenantModal({
  isOpen,
  onClose,
  onSave,
}: OnboardTenantModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    status: 'pendente',
    plan: 'Básico',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setFormData({
      name: '',
      adminEmail: '',
      status: 'pendente',
      plan: 'Básico',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Onboard Nova Empresa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Empresa</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email do Admin Principal</Label>
            <Input
              id="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={e =>
                setFormData(prev => ({ ...prev, adminEmail: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status Inicial</Label>
              <Select
                value={formData.status}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="ativa">Ativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select
                value={formData.plan}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, plan: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Adicionar Empresa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
