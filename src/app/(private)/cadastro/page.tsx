import { Briefcase, Building2, User, Users2 } from 'lucide-react'
import Link from 'next/link'

const cadastros = [
  {
    title: 'Empresas e Filiais',
    description: 'Gerencie as empresas e filiais do sistema',
    url: '/cadastro/empresas',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    title: 'Departamentos',
    description: 'Gerencie os departamentos',
    url: '/cadastro/departamentos',
    icon: Users2,
    color: 'bg-orange-500',
  },
  {
    title: 'Funcionários',
    description: 'Gerencie os funcionários',
    url: '/cadastro/funcionarios',
    icon: User,
    color: 'bg-purple-500',
  },
  {
    title: 'Cargos',
    description: 'Gerencie os cargos e funções',
    url: '/cadastro/cargos',
    icon: Briefcase,
    color: 'bg-red-500',
  },
]

export default function CadastroPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cadastros</h1>
        <p className="text-gray-600 mt-2">
          Acesse e gerencie todos os cadastros do sistema.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cadastros.map(item => (
          <Link key={item.title} href={item.url} className="group block">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group-hover:border-gray-300">
              <div className="flex items-center space-x-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
