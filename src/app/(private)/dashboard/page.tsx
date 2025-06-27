'use client'

import { AdminLayout } from '@/components/admin-layout'
import { CompanyManagement } from '@/components/company-management'
import { useState } from 'react'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('empresas')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500">
                  Total de Empresas
                </h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500">
                  Funcionários Ativos
                </h3>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500">
                  Departamentos
                </h3>
                <p className="text-2xl font-bold text-orange-600">45</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500">Filiais</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </div>
        )
      case 'empresas':
        return <CompanyManagement />
      case 'filiais':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Filiais
            </h1>
            <p className="text-gray-600 mt-2">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )
      case 'departamentos':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Departamentos
            </h1>
            <p className="text-gray-600 mt-2">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )
      case 'funcionarios':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Funcionários
            </h1>
            <p className="text-gray-600 mt-2">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )
      case 'cargos':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Cargos
            </h1>
            <p className="text-gray-600 mt-2">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )
      default:
        return <CompanyManagement />
    }
  }

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  )
}
