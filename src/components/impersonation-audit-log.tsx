'use client'

import { LogOut, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface AuditLogEntry {
  id: string
  timestamp: string
  adminEmail: string
  action: 'start_impersonation' | 'end_impersonation'
  targetCompany: string
  targetAdmin: string
  duration?: string
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-12-27 10:30:15',
    adminEmail: 'superadmin@sistema.com',
    action: 'end_impersonation',
    targetCompany: 'TechCorp Solutions',
    targetAdmin: 'admin@techcorp.com',
    duration: '15 min',
  },
  {
    id: '2',
    timestamp: '2024-12-27 10:15:00',
    adminEmail: 'superadmin@sistema.com',
    action: 'start_impersonation',
    targetCompany: 'TechCorp Solutions',
    targetAdmin: 'admin@techcorp.com',
  },
  {
    id: '3',
    timestamp: '2024-12-27 09:45:30',
    adminEmail: 'superadmin@sistema.com',
    action: 'end_impersonation',
    targetCompany: 'Indústria MetalMax',
    targetAdmin: 'admin@metalmax.com.br',
    duration: '8 min',
  },
  {
    id: '4',
    timestamp: '2024-12-27 09:37:22',
    adminEmail: 'superadmin@sistema.com',
    action: 'start_impersonation',
    targetCompany: 'Indústria MetalMax',
    targetAdmin: 'admin@metalmax.com.br',
  },
]

export function ImpersonationAuditLog() {
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('pt-BR')
  }

  const getActionBadge = (action: string, duration?: string) => {
    if (action === 'start_impersonation') {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <UserCheck className="mr-1 h-3 w-3" />
          Início
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800">
          <LogOut className="mr-1 h-3 w-3" />
          Fim {duration && `(${duration})`}
        </Badge>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Log de Auditoria - Impersonações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Super Admin</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Empresa Alvo</TableHead>
              <TableHead>Admin da Empresa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuditLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">
                  {formatDateTime(log.timestamp)}
                </TableCell>
                <TableCell>{log.adminEmail}</TableCell>
                <TableCell>
                  {getActionBadge(log.action, log.duration)}
                </TableCell>
                <TableCell className="font-medium">
                  {log.targetCompany}
                </TableCell>
                <TableCell>{log.targetAdmin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
