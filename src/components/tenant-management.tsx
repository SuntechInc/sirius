'use client'

import {
  Ban,
  Eye,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useImpersonation } from '@/hooks/use-impersonation'
import type { Tenant } from '@/types/admin'
import { ImpersonationConfirmationModal } from './impersonation-confirmation-modal'
import { OnboardTenantModal } from './onboard-tenant-modal'

// Dados mock para demonstração
const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    adminEmail: 'admin@techcorp.com',
    status: 'ativa',
    plan: 'Enterprise',
    employeeCount: 1247,
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Indústria MetalMax',
    adminEmail: 'admin@metalmax.com.br',
    status: 'ativa',
    plan: 'Pro',
    employeeCount: 856,
    createdAt: '2023-03-22',
  },
  {
    id: '3',
    name: 'StartupXYZ',
    adminEmail: 'ceo@startupxyz.com',
    status: 'pendente',
    plan: 'Básico',
    employeeCount: 12,
    createdAt: '2024-12-01',
  },
  {
    id: '4',
    name: 'Comércio ABC Ltda',
    adminEmail: 'admin@comercioabc.com',
    status: 'suspensa',
    plan: 'Pro',
    employeeCount: 234,
    createdAt: '2022-08-10',
  },
]

export function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [isLoading, setIsLoading] = useState(false)
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const { startImpersonation } = useImpersonation()

  const [impersonationTenant, setImpersonationTenant] = useState<Tenant | null>(
    null
  )
  const [isImpersonationModalOpen, setIsImpersonationModalOpen] =
    useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      ativa: 'bg-green-100 text-green-800',
      suspensa: 'bg-orange-100 text-orange-800',
      pendente: 'bg-yellow-100 text-yellow-800',
    }

    const labels = {
      ativa: 'Ativa',
      suspensa: 'Suspensa',
      pendente: 'Pendente',
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const handleSuspendTenant = async (tenantId: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setTenants(prev =>
      prev.map(tenant =>
        tenant.id === tenantId ? { ...tenant, status: 'suspensa' } : tenant
      )
    )

    setIsLoading(false)
    toast.success('Conta suspensa', {
      description: 'A conta da empresa foi suspensa com sucesso.',
    })
  }

  const handleDeleteTenant = async (tenantId: string, tenantName: string) => {
    if (confirmationText !== tenantName) {
      toast.error('Erro na confirmação', {
        description: 'O nome da empresa não confere. Tente novamente.',
      })
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setTenants(prev => prev.filter(tenant => tenant.id !== tenantId))
    setConfirmationText('')
    setIsLoading(false)

    toast.success('Empresa excluída', {
      description: 'A empresa foi removida permanentemente do sistema.',
    })
  }

  const handleImpersonateTenant = (tenant: Tenant) => {
    setImpersonationTenant(tenant)
    setIsImpersonationModalOpen(true)
  }

  const confirmImpersonation = () => {
    if (impersonationTenant) {
      startImpersonation(impersonationTenant)
      toast('Impersonação iniciada', {
        description: `Você está agora acessando como ${impersonationTenant.name}.`,
      })
    }
    setIsImpersonationModalOpen(false)
    setImpersonationTenant(null)
  }

  if (isLoading && tenants.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Admin Principal</TableHead>
                <TableHead>Status da Conta</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Nº de Funcionários</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-row-${index}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Gerenciar Empresas Clientes
        </h2>
        <Button
          onClick={() => setIsOnboardModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Onboard Nova Empresa
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Admin Principal</TableHead>
              <TableHead>Status da Conta</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Nº de Funcionários</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map(tenant => (
              <TableRow key={tenant.id}>
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{tenant.adminEmail}</TableCell>
                <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                <TableCell>{tenant.plan}</TableCell>
                <TableCell>{tenant.employeeCount.toLocaleString()}</TableCell>
                <TableCell>{formatDate(tenant.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleImpersonateTenant(tenant)}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Impersonar Empresa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSuspendTenant(tenant.id)}
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Suspender Conta
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Gerenciar Admins da Empresa
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={e => e.preventDefault()}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir Empresa
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar exclusão da empresa
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação é irreversível. Todos os dados da
                              empresa "{tenant.name}" serão permanentemente
                              excluídos.
                              <br />
                              <br />
                              Para confirmar, digite o nome da empresa abaixo:
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="space-y-2">
                            <Label htmlFor="confirmation">
                              Nome da empresa:
                            </Label>
                            <Input
                              id="confirmation"
                              value={confirmationText}
                              onChange={e =>
                                setConfirmationText(e.target.value)
                              }
                              placeholder={tenant.name}
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setConfirmationText('')}
                            >
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteTenant(tenant.id, tenant.name)
                              }
                              className="bg-red-600 hover:bg-red-700"
                              disabled={confirmationText !== tenant.name}
                            >
                              Excluir Permanentemente
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OnboardTenantModal
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        onSave={tenantData => {
          const newTenant: Tenant = {
            ...tenantData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString().split('T')[0],
            employeeCount: 0,
          }
          setTenants(prev => [...prev, newTenant])
          setIsOnboardModalOpen(false)
          toast('Empresa adicionada', {
            description: 'Nova empresa foi adicionada ao sistema com sucesso.',
          })
        }}
      />
      <ImpersonationConfirmationModal
        isOpen={isImpersonationModalOpen}
        onClose={() => {
          setIsImpersonationModalOpen(false)
          setImpersonationTenant(null)
        }}
        onConfirm={confirmImpersonation}
        tenant={impersonationTenant}
      />
    </div>
  )
}
