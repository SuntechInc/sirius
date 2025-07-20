"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Settings, Package, X } from "lucide-react"
import { toast } from "sonner"
import type { Company } from "@/lib/queries/company"
import { getFormattedIndustry, getFormattedSegment } from "@/lib/utils"

interface Module {
  id: string
  code: string
  name: string
  description?: string
}

interface TenantModule {
  companyId: string
  moduleId: string
  segment: string
  status: "ENABLED" | "DISABLED"
  enabledAt: string
  disabledAt?: string
}

interface CompanyModulesModalProps {
  company: Company | null
  isOpen: boolean
  onClose: () => void
  onSave: (companyId: string, modules: TenantModule[]) => Promise<void>
}

export function CompanyModulesModal({ company, isOpen, onClose, onSave }: CompanyModulesModalProps) {
  const [availableModules, setAvailableModules] = useState<Module[]>([])
  const [tenantModules, setTenantModules] = useState<TenantModule[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    if (company && isOpen) {
      fetchModulesData()
    }
  }, [company, isOpen])

  const fetchModulesData = async () => {
    setLoading(true)
    try {
      // Mock available modules based on segment
      const mockModules: Module[] = [
        {
          id: "1",
          code: "EQUIPMENTS",
          name: "Gestão de Equipamentos",
          description: "Sistema completo para gestão de equipamentos médicos e hospitalares",
        },
        {
          id: "2",
          code: "INVENTORY",
          name: "Controle de Estoque",
          description: "Gerenciamento de inventário e suprimentos",
        },
        {
          id: "3",
          code: "MAINTENANCE",
          name: "Manutenção Preventiva",
          description: "Agendamento e controle de manutenções",
        },
        {
          id: "4",
          code: "REPORTS",
          name: "Relatórios Avançados",
          description: "Dashboard e relatórios personalizados",
        },
        {
          id: "5",
          code: "CALIBRATION",
          name: "Calibração",
          description: "Controle de calibração de equipamentos",
        },
        {
          id: "6",
          code: "DOCUMENTS",
          name: "Gestão de Documentos",
          description: "Controle de documentação técnica e certificados",
        },
      ]

      // Mock current tenant modules
      const mockTenantModules: TenantModule[] = [
        {
          companyId: company!.id,
          moduleId: "1",
          segment: company!.segment,
          status: "ENABLED",
          enabledAt: new Date().toISOString(),
        },
        {
          companyId: company!.id,
          moduleId: "2",
          segment: company!.segment,
          status: "DISABLED",
          enabledAt: new Date().toISOString(),
          disabledAt: new Date().toISOString(),
        },
      ]

      setAvailableModules(mockModules)
      setTenantModules(mockTenantModules)
    } catch (error) {
      toast.error("Erro ao carregar módulos")
    } finally {
      setLoading(false)
    }
  }

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    setTenantModules((prev) => {
      const existing = prev.find((tm) => tm.moduleId === moduleId)

      if (existing) {
        return prev.map((tm) =>
          tm.moduleId === moduleId
            ? {
                ...tm,
                status: enabled ? "ENABLED" : "DISABLED",
                disabledAt: enabled ? undefined : new Date().toISOString(),
              }
            : tm,
        )
      } else {
        return [
          ...prev,
          {
            companyId: company!.id,
            moduleId,
            segment: company!.segment,
            status: enabled ? "ENABLED" : "DISABLED",
            enabledAt: new Date().toISOString(),
            disabledAt: enabled ? undefined : new Date().toISOString(),
          },
        ]
      }
    })
  }

  const handleSave = async () => {
    if (!company) return

    setSaving(true)
    try {
      await onSave(company.id, tenantModules)
      toast.success("Módulos atualizados com sucesso!")
      onClose()
    } catch (error) {
      toast.error("Erro ao salvar módulos")
    } finally {
      setSaving(false)
    }
  }

  const isModuleEnabled = (moduleId: string) => {
    const tenantModule = tenantModules.find((tm) => tm.moduleId === moduleId)
    return tenantModule?.status === "ENABLED"
  }

  const getEnabledModulesCount = () => {
    return tenantModules.filter((tm) => tm.status === "ENABLED").length
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
                <CardTitle className="text-xl">Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-base">
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">Razão Social:</span>
                    <p className="font-medium text-lg">{company.legalName}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">Indústria:</span>
                    <p className="font-medium text-lg">{getFormattedIndustry(company.industry)}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">Segmento:</span>
                    <Badge variant="secondary" className="text-sm px-3 py-1">{getFormattedSegment(company.segment)}</Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-muted-foreground">Módulos Ativos:</span>
                    <p className="font-medium text-lg text-green-600">{getEnabledModulesCount()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="modules" className="text-base">Módulos Disponíveis</TabsTrigger>
                <TabsTrigger value="history" className="text-base">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-6 mt-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {availableModules.map((module) => {
                      const enabled = isModuleEnabled(module.id)
                      return (
                        <Card
                          key={module.id}
                          className={`transition-all ${enabled ? "ring-2 ring-green-500/20 bg-green-50/50" : ""}`}
                        >
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-6 flex-1 min-w-0">
                                <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                                  <Package className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-3 flex-1 min-w-0">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-semibold text-lg">{module.name}</h3>
                                    <Badge variant="outline" className="text-sm px-3 py-1 flex-shrink-0">
                                      {module.code}
                                    </Badge>
                                  </div>
                                  {module.description && (
                                    <p className="text-base text-muted-foreground leading-relaxed">{module.description}</p>
                                  )}
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Compatível com: {getFormattedSegment(company.segment)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                                {enabled ? (
                                  <Badge variant="default" className="bg-green-500 text-sm px-3 py-1">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Ativo
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="text-sm px-3 py-1">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Inativo
                                  </Badge>
                                )}
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
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
                    <CardTitle className="text-xl">Histórico de Alterações</CardTitle>
                    <CardDescription className="text-base">Últimas modificações nos módulos desta empresa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tenantModules.map((tm) => {
                        const module = availableModules.find((m) => m.id === tm.moduleId)
                        return (
                          <div key={tm.moduleId} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                            <div className="space-y-2">
                              <p className="font-medium text-lg">{module?.name}</p>
                              <p className="text-base text-muted-foreground">
                                {tm.status === "ENABLED" ? "Ativado" : "Desativado"} em{" "}
                                {new Date(tm.status === "ENABLED" ? tm.enabledAt : tm.disabledAt!).toLocaleDateString(
                                  "pt-BR",
                                )}
                              </p>
                            </div>
                            <Badge variant={tm.status === "ENABLED" ? "default" : "secondary"} className="text-sm px-3 py-1">
                              {tm.status === "ENABLED" ? "Ativo" : "Inativo"}
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
          <Button variant="outline" onClick={onClose} className="px-6 py-2 text-base">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving} className="px-6 py-2 text-base">
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </div>
    </div>
  )
} 