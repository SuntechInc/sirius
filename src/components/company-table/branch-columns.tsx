import type { ColumnDef } from '@tanstack/react-table'
import type { Branch } from '@/lib/queries/branch'

export const branchColumns: ColumnDef<Branch>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'tradingName',
    header: 'Nome Fantasia',
  },
  {
    accessorKey: 'legalName',
    header: 'Razão Social',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'responsible',
    header: 'Responsável',
  },
  {
    accessorKey: 'isHeadquarter',
    header: 'Matriz',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]
