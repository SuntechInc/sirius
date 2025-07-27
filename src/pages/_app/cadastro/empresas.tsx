import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { getCompanies } from "./-services/get-companies";
import { DataTable } from "@/components/data-table";
import { companyTableColumns } from "./-components/company-table-columns";
import { useNewCompany } from "./-hooks/use-new-company";

export const Route = createFileRoute("/_app/cadastro/empresas")({
  component: RouteComponent,
  loader: async ({ context: { queryClient, auth } }) => {
    await queryClient.prefetchQuery({
      queryKey: ["companies"],
      queryFn: async () => getCompanies(auth.user?.companyId),
    });
  },
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();
  const { data: companiesQuery } = useSuspenseQuery({
    queryKey: ["companies"],
    queryFn: async () => getCompanies(auth.user?.companyId),
  });

  const onOpen = useNewCompany((state) => state.onOpen);

  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Empresas e Filiais</h1>
            <p className="text-gray-600">
              Gerencie as empresas e filiais do sistema
            </p>
          </div>
          <Button onClick={onOpen} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova empresa
          </Button>
        </div>
        <DataTable columns={companyTableColumns} data={companiesQuery.data} />
      </div>
    </div>
  );
}
