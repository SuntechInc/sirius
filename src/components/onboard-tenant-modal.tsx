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
    tradingName: string
    legalName: string
    taxId: string
    taxCountry: string
    email: string
    industry: string
    segment: string
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
    tradingName: '',
    legalName: '',
    taxId: '',
    taxCountry: '',
    email: '',
    industry: '',
    segment: '',
    status: 'ACTIVE',
    plan: 'Básico',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setFormData({
      tradingName: '',
      legalName: '',
      taxId: '',
      taxCountry: '',
      email: '',
      industry: '',
      segment: '',
      status: 'ACTIVE',
      plan: 'Básico',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Onboard Nova Empresa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tradingName">Nome Fantasia</Label>
            <Input
              id="tradingName"
              value={formData.tradingName}
              onChange={e => setFormData(prev => ({ ...prev, tradingName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="legalName">Razão Social</Label>
            <Input
              id="legalName"
              value={formData.legalName}
              onChange={e => setFormData(prev => ({ ...prev, legalName: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">CNPJ</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={e => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxCountry">País do CNPJ</Label>
              <Input
                id="taxCountry"
                value={formData.taxCountry}
                onChange={e => setFormData(prev => ({ ...prev, taxCountry: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Indústria</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={e => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="segment">Segmento</Label>
              <Input
                id="segment"
                value={formData.segment}
                onChange={e => setFormData(prev => ({ ...prev, segment: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={value => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Ativa</SelectItem>
                  <SelectItem value="TRIAL">Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select
                value={formData.plan}
                onValueChange={value => setFormData(prev => ({ ...prev, plan: value }))}
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
