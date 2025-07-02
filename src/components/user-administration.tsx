'use client'

import { Edit, MoreHorizontal, RotateCcw, Search, UserX } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SystemUser } from '@/types/admin'
import { UserType } from '@/types/enums'
import { EditUserRoleModal } from './edit-user-role-modal'

// Dados mock para demonstração
const mockUsers: SystemUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@techcorp.com',
    company: 'TechCorp Solutions',
    accessLevel: UserType.COMPANY_ADMIN,
    lastLogin: '2024-12-27 09:30:00',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@metalmax.com.br',
    company: 'Indústria MetalMax',
    accessLevel: UserType.COMPANY_ADMIN,
    lastLogin: '2024-12-26 16:45:00',
  },
  {
    id: '3',
    name: 'Admin Sistema',
    email: 'admin@sistema.com',
    company: 'Sistema',
    accessLevel: UserType.GLOBAL_ADMIN,
    lastLogin: '2024-12-27 10:15:00',
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@startupxyz.com',
    company: 'StartupXYZ',
    accessLevel: UserType.EMPLOYEE,
    lastLogin: '2024-12-25 14:20:00',
  },
  {
    id: '5',
    name: 'Ana Costa',
    email: 'ana.costa@comercioabc.com',
    company: 'Comércio ABC Ltda',
    accessLevel: UserType.EMPLOYEE,
    lastLogin: '2024-12-24 11:30:00',
  },
]

export function UserAdministration() {
  const [users, setUsers] = useState<SystemUser[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('pt-BR')
  }

  const getAccessLevelBadge = (level: string) => {
    const variants = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin_empresa: 'bg-blue-100 text-blue-800',
      usuario_padrao: 'bg-gray-100 text-gray-800',
    }

    const labels = {
      super_admin: 'Super Admin',
      admin_empresa: 'Admin da Empresa',
      usuario_padrao: 'Usuário Padrão',
    }

    return (
      <Badge className={variants[level as keyof typeof variants]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    )
  }

  const handleEditUser = (user: SystemUser) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  const handleResetPassword = async (_userId: string, userEmail: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast.success('Email de redefinição enviado', {
      description: `Um email de redefinição de senha foi enviado para ${userEmail}.`,
    })
  }

  const handleDeactivateUser = async (userId: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setUsers(prev => prev.filter(user => user.id !== userId))
    setIsLoading(false)

    toast.success('Usuário desativado', {
      description: 'O usuário foi desativado com sucesso.',
    })
  }

  const handleUpdateUserRole = (userId: string, newRole: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, accessLevel: newRole } : user
      )
    )

    toast.success('Nível de acesso atualizado', {
      description: 'O nível de acesso do usuário foi alterado com sucesso.',
    })
  }

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Empresa Associada</TableHead>
                <TableHead>Nível de Acesso</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Administração de Usuários Globais
        </h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Filtrar por nome ou email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Empresa Associada</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{getAccessLevelBadge(user.accessLevel)}</TableCell>
                <TableCell>{formatDateTime(user.lastLogin)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Nível de Acesso
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleResetPassword(user.id, user.email)}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Resetar Senha
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeactivateUser(user.id)}
                        className="text-red-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Desativar Usuário
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          Nenhum usuário encontrado para "{searchTerm}"
        </div>
      )}

      <EditUserRoleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingUser(null)
        }}
        user={editingUser}
        onSave={handleUpdateUserRole}
      />
    </div>
  )
}
