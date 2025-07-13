"use client"

import {
  Command,
  LayoutDashboard,
  FileText,
  Building2,
  Network,
  Users2,
  User,
  Briefcase,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const cadastrosItems = [
  { title: 'Empresas e Filiais', url: '/cadastro/empresas', icon: Building2 },
  { title: 'Departamentos', url: '/cadastro/departamentos', icon: Users2 },
  { title: 'Funcionários', url: '/cadastro/funcionarios', icon: User },
  { title: 'Cargos', url: '/cadastro/cargos', icon: Briefcase },
]

export function AppSidebar() {
  const [cadastrosOpen, setCadastrosOpen] = useState(false)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema de Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center w-full">
                  <SidebarMenuButton asChild className="flex-1">
                    <Link href="/cadastro">
                      <FileText />
                      <span>Cadastros</span>
                    </Link>
                  </SidebarMenuButton>
                  <button
                    type="button"
                    aria-label={cadastrosOpen ? 'Fechar submenu' : 'Abrir submenu'}
                    onClick={() => setCadastrosOpen((open) => !open)}
                    className="ml-1 p-1 rounded hover:bg-sidebar-accent"
                  >
                    {cadastrosOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {cadastrosOpen && (
                  <SidebarMenuSub>
                    {cadastrosItems.map(item => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.url}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
