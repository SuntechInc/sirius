import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, Search, User, Users2 } from "lucide-react";

export const Route = createFileRoute("/_app/cadastros/")({
  component: RouteComponent,
});

const cadastros = [
  {
    title: "Empresas e Filiais",
    description: "Gerencie as empresas e filiais do sistema",
    url: "/cadastros/empresas",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "Departamentos",
    description: "Gerencie os departamentos",
    url: "/cadastros/departamentos",
    icon: Users2,
    color: "bg-orange-500",
  },
  {
    title: "Funcionários",
    description: "Gerencie os funcionários",
    url: "/cadastros/funcionarios",
    icon: User,
    color: "bg-purple-500",
  },
  {
    title: "Cargos",
    description: "Gerencie os cargos e funções",
    url: "/cadastros/cargos",
    icon: Briefcase,
    color: "bg-red-500",
  },
];

function RouteComponent() {
  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cadastros</h1>
            <p className="text-gray-600">
              Acesse e gerencie todos os cadastros do sistema.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar por..."
                className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cadastros.map(item => (
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
    </div>
  );
}
