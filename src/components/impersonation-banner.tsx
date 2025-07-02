'use client'

import { ExternalLink, UserCheck, X } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useImpersonation } from '@/hooks/use-impersonation'

export function ImpersonationBanner() {
  const { isImpersonating, impersonatedTenant, stopImpersonation } =
    useImpersonation()

  if (!isImpersonating || !impersonatedTenant) {
    return null
  }

  const handleStopImpersonation = () => {
    stopImpersonation()
    toast.success('Impersonação encerrada', {
      description: 'Você voltou ao painel de super administrador.',
    })
  }

  const handleAccessCompanyPanel = () => {
    // This would typically navigate to the company's admin panel
    toast('Redirecionando', {
      description: `Acessando o painel administrativo de ${impersonatedTenant.name}...`,
    })
  }

  return (
    <Alert className="border-orange-200 bg-orange-50 mb-6">
      <UserCheck className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-orange-800 font-medium">
            Você está impersonando a empresa:
          </span>
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-300"
          >
            {impersonatedTenant.name}
          </Badge>
          <span className="text-sm text-orange-700">
            ({impersonatedTenant.adminEmail})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleAccessCompanyPanel}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
          >
            <ExternalLink className="mr-2 h-3 w-3" />
            Acessar Painel da Empresa
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleStopImpersonation}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
          >
            <X className="mr-2 h-3 w-3" />
            Sair da Impersonação
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
