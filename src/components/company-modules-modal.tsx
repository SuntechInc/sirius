'use client'

import { CheckCircle, Package, Settings, X, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  enableCompanyModuleAction,
  getAvailableModulesAction,
  getCompanyModulesAction,
} from '@/lib/actions/module'
import type { Company } from '@/lib/queries/company'
import type { CompanyModule, Module } from '@/lib/queries/module'
import { getFormattedIndustry, getFormattedSegment } from '@/lib/utils'

interface TenantModule {
  companyId: string
  moduleId: string
  segment: string
  status: 'ENABLED' | 'DISABLED'
  enabledAt: string
  disabledAt?: string
}

interface CompanyModulesModalProps {
  company: Company | null
  isOpen: boolean
  onClose: () => void
  onSave: (companyId: string, modules: TenantModule[]) => Promise<void>
}

export function CompanyModulesModal({
  company,
  isOpen,
  onClose,
  onSave,
}: CompanyModulesModalProps) {
  const [availableModules, setAvailableModules] = useState<Module[]>([])
  const [tenantModules, setTenantModules] = useState<TenantModule[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [togglingModules, setTogglingModules] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (company && isOpen) {
      fetchModulesData()
    }
  }, [company, isOpen])

  const fetchModulesData = async () => {
    setLoading(true)
    try {
      // Buscar módulos disponíveis da API
      const availableResult = await getAvailableModulesAction()
      if (!availableResult.success || !availableResult.data) {
        toast.error(
          availableResult.error || 'Erro ao carregar módulos disponíveis'
        )
        return
      }

      // Buscar módulos da empresa da API
      const companyResult = await getCompanyModulesAction(company!.id)
      if (!companyResult.success || !companyResult.data) {
        toast.error(
          companyResult.error || 'Erro ao carregar módulos da empresa'
        )
        return
      }

      const convertedTenantModules: TenantModule[] = (
        companyResult.data as any
      ).data.map((cm: CompanyModule) => ({
        companyId: company!.id,
        moduleId: cm.moduleId,
        segment: company!.segment,
        status: cm.status === 'ENABLED' ? 'ENABLED' : 'DISABLED',
        enabledAt: cm.enabledAt,
        disabledAt: cm.status === 'ENABLED' ? undefined : cm.updatedAt,
      }))

      setAvailableModules((availableResult.data as any).data)
      setTenantModules(convertedTenantModules)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleModuleToggle = async (moduleId: string, enabled: boolean) => {
    if (!company) return

    const module = availableModules.find(m => m.id === moduleId)
    if (!module) {
      toast.error('Módulo não encontrado')
      return
    }

    setTogglingModules(prev => new Set(prev).add(moduleId))

    try {
      if (enabled) {
        const result = await enableCompanyModuleAction(
          company.id,
          module.code,
          company.segment
        )

        if (!result.success) {
          toast.error(result.error || 'Erro ao ativar módulo')
          return
        }

        setTenantModules(prev => {
          const existing = prev.find(tm => tm.moduleId === moduleId)

          if (existing) {
            return prev.map(tm =>
              tm.moduleId === moduleId
                ? {
                    ...tm,
                    status: 'ENABLED',
                    enabledAt: (result.data as any).enabledAt,
                  }
                : tm
            )
          } else {
            // Criar novo módulo ativo
            return [
              ...prev,
              {
                companyId: company.id,
                moduleId: (result.data as any).moduleId,
                segment: company.segment,
                status: 'ENABLED',
                enabledAt: (result.data as any).enabledAt,
              },
            ]
          }
        })

        toast.success('Módulo ativado com sucesso!')
      } else {
        // TODO: Implementar desativação quando a API estiver disponível
        toast.info('Desativação de módulos será implementada em breve')
        return
      }
    } catch (error) {
      console.error('Erro ao alterar status do módulo:', error)
      toast.error('Erro ao alterar status do módulo')
    } finally {
      // Remover módulo do set de loading
      setTogglingModules(prev => {
        const newSet = new Set(prev)
        newSet.delete(moduleId)
        return newSet
      })
    }
  }

  const handleSave = async () => {
    if (!company) return

    setSaving(true)
    try {
      await onSave(company.id, tenantModules)
      toast.success('Módulos atualizados com sucesso!')
      onClose()
    } catch (error) {
      toast.error('Erro ao salvar módulos')
    } finally {
      setSaving(false)
    }
  }

  const isModuleEnabled = (moduleId: string) => {
    const tenantModule = tenantModules.find(tm => tm.moduleId === moduleId)
    return tenantModule?.status === 'ENABLED'
  }

  const getEnabledModulesCount = () => {
    return tenantModules.filter(tm => tm.status === 'ENABLED').length
  }

  if (!company || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[45vw] max-h-[90vh] bg-background rounded-lg border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6" />
            <h2 className="text-xl font-semibold">
              Gerenciar Módulos - {company.tradingName}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Company Info */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-base">
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">
                      Razão Social:
                    </span>
                    <p className="font-medium text-lg">{company.legalName}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">
                      Indústria:
                    </span>
                    <p className="font-medium text-lg">
                      {getFormattedIndustry(company.industry)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">
                      Segmento:
                    </span>
                    <p className="font-medium text-lg">
                      {getFormattedSegment(company.segment)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">
                      Módulos Ativos:
                    </span>
                    <p className="font-medium text-lg text-green-600">
                      {getEnabledModulesCount()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="modules" className="text-base">
                  Módulos Disponíveis
                </TabsTrigger>
                <TabsTrigger value="history" className="text-base">
                  Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-6 mt-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {availableModules.map(module => {
                      const enabled = isModuleEnabled(module.id)
                      return (
                        <Card
                          key={module.id}
                          className={`transition-all ${enabled ? 'ring-2 ring-green-500/20 bg-green-50/50' : ''}`}
                        >
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-6 flex-1 min-w-0">
                                <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                                  <Package className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-3 flex-1 min-w-0">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-semibold text-lg">
                                      {module.name}
                                    </h3>
                                    <Badge
                                      variant="outline"
                                      className="text-sm px-3 py-1 flex-shrink-0"
                                    >
                                      {module.code}
                                    </Badge>
                                  </div>
                                  {module.description && (
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                      {module.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Módulo disponível</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                                {enabled ? (
                                  <Badge
                                    variant="default"
                                    className="bg-green-500 text-sm px-3 py-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Ativo
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="text-sm px-3 py-1"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Inativo
                                  </Badge>
                                )}
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={checked =>
                                    handleModuleToggle(module.id, checked)
                                  }
                                  disabled={togglingModules.has(module.id)}
                                  className="scale-110"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Histórico de Alterações
                    </CardTitle>
                    <CardDescription className="text-base">
                      Últimas modificações nos módulos desta empresa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tenantModules.map(tm => {
                        const module = availableModules.find(
                          m => m.id === tm.moduleId
                        )
                        return (
                          <div
                            key={tm.moduleId}
                            className="flex items-center justify-between py-4 border-b border-border last:border-b-0"
                          >
                            <div className="space-y-2">
                              <p className="font-medium text-lg">
                                {module?.name}
                              </p>
                              <p className="text-base text-muted-foreground">
                                {tm.status === 'ENABLED'
                                  ? 'Ativado'
                                  : 'Desativado'}{' '}
                                em{' '}
                                {new Date(
                                  tm.status === 'ENABLED'
                                    ? tm.enabledAt
                                    : tm.disabledAt!
                                ).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <Badge
                              variant={
                                tm.status === 'ENABLED'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="text-sm px-3 py-1"
                            >
                              {tm.status === 'ENABLED' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end  gap-4 p-5 border-t bg-muted/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 text-base"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-base"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
    </div>
  )
}
