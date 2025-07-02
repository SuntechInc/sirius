'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ImpersonationAuditLog } from './impersonation-audit-log'

const mockLogs = `[2024-12-27 10:30:01] [INFO] User authentication successful for admin@techcorp.com
[2024-12-27 10:29:45] [INFO] Database backup completed successfully
[2024-12-27 10:29:30] [WARN] High memory usage detected on server-02 (85%)
[2024-12-27 10:29:15] [INFO] Email notification sent to 1,247 users
[2024-12-27 10:29:00] [ERROR] Failed to connect to payment gateway - retrying in 30s
[2024-12-27 10:28:45] [INFO] Scheduled maintenance task completed
[2024-12-27 10:28:30] [INFO] New tenant onboarded: StartupXYZ
[2024-12-27 10:28:15] [WARN] API rate limit reached for tenant: metalmax-corp
[2024-12-27 10:28:00] [INFO] System health check passed
[2024-12-27 10:27:45] [ERROR] Database connection timeout - connection restored
[2024-12-27 10:27:30] [INFO] User session expired for user ID: 12847
[2024-12-27 10:27:15] [INFO] File upload completed: employee-data.xlsx
[2024-12-27 10:27:00] [WARN] Disk space low on backup server (15% remaining)
[2024-12-27 10:26:45] [INFO] Password reset email sent to maria.santos@metalmax.com.br
[2024-12-27 10:26:30] [INFO] API request processed successfully`

export function SystemHealth() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const formatLogLine = (line: string) => {
    if (line.includes('[ERROR]')) {
      return <span className="text-red-400">{line}</span>
    }
    if (line.includes('[WARN]')) {
      return <span className="text-yellow-400">{line}</span>
    }
    if (line.includes('[INFO]')) {
      return <span className="text-green-400">{line}</span>
    }
    return <span className="text-gray-300">{line}</span>
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Saúde do Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Saúde do Sistema</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status dos Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status dos Serviços</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Principal</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Banco de Dados</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Serviço de Email</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Operacional</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gateway de Pagamento</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-600">Instável</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Uso */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uso da API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">
                Requisições nas últimas 24h
              </div>
              <div className="text-2xl font-bold text-blue-600">1,450,234</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Taxa de Erro</div>
              <div className="text-2xl font-bold text-green-600">0.12%</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">
                Tempo de Resposta Médio
              </div>
              <div className="text-2xl font-bold text-orange-600">245ms</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Usuários Ativos</div>
              <div className="text-2xl font-bold text-purple-600">2,847</div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Recentes */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Logs Recentes do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-md p-4 h-64 overflow-y-auto">
              <pre className="text-xs font-mono leading-relaxed">
                <code>
                  {mockLogs.split('\n').map((line, index) => (
                    <div key={`log-line-${index}`} className="mb-1">
                      {formatLogLine(line)}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600">Total de Empresas</div>
            <div className="text-2xl font-bold text-blue-600">47</div>
            <div className="text-xs text-green-600 mt-1">+3 este mês</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600">Usuários Totais</div>
            <div className="text-2xl font-bold text-green-600">12,847</div>
            <div className="text-xs text-green-600 mt-1">+234 esta semana</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600">Armazenamento Usado</div>
            <div className="text-2xl font-bold text-orange-600">2.4 TB</div>
            <div className="text-xs text-gray-500 mt-1">
              de 10 TB disponíveis
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600">Uptime do Sistema</div>
            <div className="text-2xl font-bold text-purple-600">99.97%</div>
            <div className="text-xs text-green-600 mt-1">Últimos 30 dias</div>
          </CardContent>
        </Card>
      </div>

      {/* Impersonation Audit Log */}
      <ImpersonationAuditLog />
    </div>
  )
}
