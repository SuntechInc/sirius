'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImpersonationBanner } from './impersonation-banner'
import { SystemHealth } from './system-health'
import { TenantManagement } from './tenant-management'
import { UserAdministration } from './user-administration'

export function SuperAdminPanel() {
  return (
    <div className="bg-gray-50 p-6">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel do Super Administrador
          </h1>
          <p className="text-gray-600 mt-2">
            Gerenciamento global do sistema de RH multi-empresa
          </p>
        </div>

        <ImpersonationBanner />

        <Tabs defaultValue="tenants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tenants">
              Gestão de Empresas (Tenants)
            </TabsTrigger>
            <TabsTrigger value="users">Administração de Usuários</TabsTrigger>
            <TabsTrigger value="system">Saúde do Sistema</TabsTrigger>
          </TabsList>
          <TabsContent value="tenants">
            <TenantManagement />
          </TabsContent>
          <TabsContent value="users">
            <UserAdministration />
          </TabsContent>
          <TabsContent value="system">
            <SystemHealth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
