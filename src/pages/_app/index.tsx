import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  User,
  Users2,
} from "lucide-react";

const quickActions = [
  {
    title: "Cadastros",
    description: "Acesse todos os cadastros do sistema",
    url: "/cadastros",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "Relatórios",
    description: "Visualize relatórios e estatísticas",
    url: "/relatorios",
    icon: BarChart3,
    color: "bg-green-500",
  },
  {
    title: "Atividades",
    description: "Acompanhe as atividades recentes",
    url: "/atividades",
    icon: Activity,
    color: "bg-purple-500",
  },
];

export const Route = createFileRoute("/_app/")({
  component: DashboardComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard | Quality Flow",
      },
    ],
  }),
});

function DashboardComponent() {
  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total de Empresas
                </h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Funcionários Ativos
                </h3>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Departamentos
                </h3>
                <p className="text-2xl font-bold text-orange-600">45</p>
              </div>
              <Users2 className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Filiais</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <Briefcase className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map(item => (
              <Link key={item.title} to={item.url} className="group block">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 group-hover:border-gray-300 hover:shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Atividades recentes */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Atividades Recentes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">
                Novo funcionário cadastrado - João Silva
              </span>
              <span className="ml-auto text-xs text-gray-400">2 min atrás</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">
                Departamento "TI" atualizado
              </span>
              <span className="ml-auto text-xs text-gray-400">
                15 min atrás
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">
                Nova filial criada - São Paulo
              </span>
              <span className="ml-auto text-xs text-gray-400">
                1 hora atrás
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
