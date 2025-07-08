'use client'

import { AlertTriangle, UserCheck } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { CompanyStatus, type Tenant } from '@/types/admin'

interface ImpersonationConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  tenant: Tenant | null
}

export function ImpersonationConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  tenant,
}: ImpersonationConfirmationModalProps) {
  if (!tenant) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-orange-600" />
            <span>Confirmar Impersonação</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm text-orange-800">
                Você está prestes a impersonar uma empresa. Esta ação será
                registrada nos logs de auditoria.
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Empresa:</span> {tenant.tradingName}
              </div>
              <div className="text-sm">
                <span className="font-medium">Admin Principal:</span>{' '}
                {tenant.email}
              </div>
              <div className="text-sm flex items-center space-x-2">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={tenant.status === CompanyStatus.ACTIVE ? 'default' : 'secondary'}
                  className={
                    tenant.status === CompanyStatus.ACTIVE
                      ? 'bg-green-100 text-green-800'
                      : tenant.status === CompanyStatus.SUSPENDED
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {tenant.status === CompanyStatus.ACTIVE
                    ? 'Ativa'
                    : tenant.status === CompanyStatus.SUSPENDED
                      ? 'Suspensa'
                      : 'Pendente'}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Durante a impersonação, você terá acesso total aos dados e
              funcionalidades desta empresa. Certifique-se de que esta ação é
              necessária para suporte ou resolução de problemas.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Confirmar Impersonação
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
