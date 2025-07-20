'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Settings, Eye, Edit } from 'lucide-react'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Company } from '@/lib/queries/company'
import {
  getCompanyStatus,
  getFormattedIndustry,
  getFormattedSegment,
} from '@/lib/utils'
import type { CompanyStatus, Industry, Segment } from '@/types/enums'
import { priorities } from '../data-table/data'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Company>[] = [
  {
    header: 'Name',
    id: 'unifiedName',
    cell: ({ row }) => {
      const tradingName = row.original.tradingName
      const legalName = row.original.legalName
      return (
        <div className="relative group cursor-pointer">
          <span className="font-bold">{tradingName}</span>
          <br />
          <span className="text-xs text-gray-500">{legalName}</span>
          <div className="absolute z-20 hidden group-hover:block left-0 top-full mt-1 w-62 max-w-xs break-words rounded-lg border border-gray-200 bg-white text-gray-900 text-xs shadow-lg p-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            <div className="mb-1 font-semibold text-sm text-gray-700">
              Nome Fantasia:
            </div>
            <div className="mb-2 text-gray-900 break-words">{tradingName}</div>
            <div className="font-semibold text-sm text-gray-700">
              Razão Social:
            </div>
            <div className="text-gray-900 break-words">{legalName}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
  {
    accessorKey: 'industry',
    header: 'Industria',
    cell: ({ row }) => {
      const industry = row.getValue('industry') as Industry

      return <div>{getFormattedIndustry(industry)}</div>
    },
  },
  {
    accessorKey: 'segment',
    header: 'Segmento',
    cell: ({ row }) => {
      const segment = row.getValue('segment') as Segment

      return <div>{getFormattedSegment(segment)}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as CompanyStatus
      const statusText = getCompanyStatus(status)
      let colorClass = ''
      switch (status) {
        case 'ACTIVE':
          colorClass = 'bg-green-100 text-green-800 border-green-200'
          break
        case 'INACTIVE':
          colorClass = 'bg-gray-100 text-gray-800 border-gray-200'
          break
        case 'SUSPENDED':
          colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200'
          break
        case 'CLOSED':
          colorClass = 'bg-red-200 text-red-900 border-red-300'
          break
        case 'TRIAL':
          colorClass = 'bg-blue-100 text-blue-800 border-blue-200'
          break
        case 'CANCELLED':
          colorClass = 'bg-red-100 text-red-800 border-red-200'
          break
        default:
          colorClass = 'bg-gray-100 text-gray-800 border-gray-200'
      }
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold border ${colorClass}`}
        >
          {statusText}
        </span>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        priority => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const company = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('manageModules', { detail: company }))}>
              <Settings className="mr-2 h-4 w-4" />
              Gerenciar Módulos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(company.id)}>
              <Eye className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`/admin/empresas/${company.id}/editar`, '_blank')}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
