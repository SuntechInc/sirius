import { Effect } from 'effect'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCompanies } from '@/lib/company'
import { getErrorMessage } from '@/lib/effect'

export async function TenantManagement() {
  const result = await Effect.runPromise(
    Effect.catchAll(getCompanies(), error =>
      Effect.succeed({ error: getErrorMessage(error) })
    )
  )

  if ('error' in result) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">
          Erro ao carregar companies: {result.error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Gerenciar Empresas Clientes
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Onboard Nova Empresa
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Status da Empresa</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.legalName}</TableCell>
                <TableCell>{item.tradingName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.segment}</TableCell>
                <TableCell>{item.industry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
