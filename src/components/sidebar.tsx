'use client'

import {
  Briefcase,
  Building2,
  LayoutDashboard,
  Network,
  User,
  Users2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
  { id: 'departamentos', label: 'Departamentos', icon: Users2 },
  { id: 'funcionarios', label: 'Funcionários', icon: User },
  { id: 'cargos', label: 'Cargos', icon: Briefcase },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">HR Manager</h2>
        <p className="text-sm text-gray-500">Sistema de Gestão</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <li key={item.id}>
                <Button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
