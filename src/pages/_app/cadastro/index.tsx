import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, Search, User, Users2 } from "lucide-react";

export const Route = createFileRoute("/_app/cadastro/")({
  component: RouteComponent,
});

const cadastros = [
  {
    title: "Empresas e Filiais",
    description: "Gerencie as empresas e filiais do sistema",
    url: "/cadastro/empresas",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "Departamentos",
    description: "Gerencie os departamentos",
    url: "/cadastro/departamentos",
    icon: Users2,
    color: "bg-orange-500",
  },
  {
    title: "Funcionários",
    description: "Gerencie os funcionários",
    url: "/cadastro/funcionarios",
    icon: User,
    color: "bg-purple-500",
  },
  {
    title: "Cargos",
    description: "Gerencie os cargos e funções",
    url: "/cadastro/cargos",
    icon: Briefcase,
    color: "bg-red-500",
  },
];

function RouteComponent() {
  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cadastros</h1>
            <p className="text-gray-600">
              Acesse e gerencie todos os cadastros do sistema.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cadastros.map((item) => (
            <Link key={item.title} to={item.url} className="group block">
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
    </div>
  );
}
