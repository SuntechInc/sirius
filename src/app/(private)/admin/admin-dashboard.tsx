"use client"

import { useState } from "react"
import { Building2, FileText, Settings, LogIn, Search, Plus, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados fictícios das empresas
const empresas = [
  {
    id: 1,
    nome: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@techsolutions.com.br",
    telefone: "(11) 99999-9999",
    status: "Ativa",
    plano: "Premium",
    ultimoAcesso: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nome: "Inovação Digital S.A.",
    cnpj: "98.765.432/0001-10",
    email: "admin@inovacaodigital.com.br",
    telefone: "(21) 88888-8888",
    status: "Ativa",
    plano: "Básico",
    ultimoAcesso: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nome: "Consultoria Empresarial",
    cnpj: "11.222.333/0001-44",
    email: "contato@consultoria.com.br",
    telefone: "(31) 77777-7777",
    status: "Inativa",
    plano: "Premium",
    ultimoAcesso: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    nome: "StartUp Inovadora",
    cnpj: "55.666.777/0001-88",
    email: "hello@startup.com.br",
    telefone: "(41) 66666-6666",
    status: "Ativa",
    plano: "Básico",
    ultimoAcesso: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    nome: "Corporação Global",
    cnpj: "99.888.777/0001-66",
    email: "admin@corporacao.com.br",
    telefone: "(51) 55555-5555",
    status: "Ativa",
    plano: "Enterprise",
    ultimoAcesso: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const empresasFiltradas = empresas.filter(
    (empresa) =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm) ||
      empresa.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    return status === "Ativa" ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Ativa
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        Inativa
      </Badge>
    )
  }

  const getPlanoBadge = (plano: string) => {
    const variants = {
      "Básico": "secondary",
      "Premium": "default",
      "Enterprise": "destructive",
    }
    return <Badge variant={variants[plano as keyof typeof variants] || "secondary"}>{plano}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Área Administrativa</h1>
            <p className="text-muted-foreground">Gerencie todas as empresas cadastradas no sistema</p>
          </div>
          <Button className="w-fit">
            <Plus className="mr-2 h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Empresas Cadastradas
            </CardTitle>
            <CardDescription>Total de {empresas.length} empresas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Tabela */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Empresa</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empresasFiltradas.map((empresa) => (
                    <TableRow key={empresa.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={empresa.avatar || "/placeholder.svg"} alt={empresa.nome} />
                            <AvatarFallback>
                              {empresa.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{empresa.nome}</div>
                            <div className="text-sm text-muted-foreground">{empresa.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{empresa.cnpj}</div>
                        <div className="text-sm text-muted-foreground">{empresa.telefone}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(empresa.status)}</TableCell>
                      <TableCell>{getPlanoBadge(empresa.plano)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(empresa.ultimoAcesso).toLocaleDateString("pt-BR")}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Faturas">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            title="Configurações"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Entrar">
                            <LogIn className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Ver Faturas
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Configurações
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <LogIn className="mr-2 h-4 w-4" />
                                Entrar na Empresa
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Desativar Empresa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {empresasFiltradas.length === 0 && (
              <div className="text-center py-8">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhuma empresa encontrada</h3>
                <p className="mt-1 text-sm text-muted-foreground">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 