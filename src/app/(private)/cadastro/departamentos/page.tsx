import { DepartmentCreateModal } from '@/components/department-create-modal'
import type { CreateDepartmentData } from '@/lib/configs/form-configs'

export default function DepartamentosPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Gestão de Departamentos
      </h1>
          <p className="text-gray-600 mt-2">
            Gerencie os departamentos do sistema
          </p>
        </div>
        <DepartmentCreateModal 
          onSubmit={async (data: CreateDepartmentData) => {
            // TODO: Implementar chamada da API
            console.log('Dados do departamento:', data)
            
            // Simular delay da API
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            return { success: true }
          }}
        />
      </div>
      
      <div className="text-center py-12">
        <p className="text-gray-600">Tabela de departamentos será implementada aqui...</p>
      </div>
    </div>
  )
}
