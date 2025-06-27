'use client'

import type { ReactNode } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'

interface AdminLayoutProps {
  children: ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminLayout({
  children,
  activeSection,
  onSectionChange,
}: AdminLayoutProps) {
  const getSectionTitle = (section: string) => {
    const titles = {
      dashboard: 'Dashboard',
      empresas: 'Gestão de Empresas',
      filiais: 'Gestão de Filiais',
      departamentos: 'Gestão de Departamentos',
      funcionarios: 'Gestão de Funcionários',
      cargos: 'Gestão de Cargos',
    }
    return titles[section as keyof typeof titles] || 'Dashboard'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getSectionTitle(activeSection)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
