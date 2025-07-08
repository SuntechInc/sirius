import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Gerenciar Empresas Clientes
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Onboard Nova Empresa
        </Button>
      </div>
    </div>
  )
}
