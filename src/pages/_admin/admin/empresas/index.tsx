import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { tableColumns } from "./-features/components/table-columns";
import { getCompaniesQueryOptions } from "./-features/queries/get-companies";
import { useNewCompany } from "./-features/store/use-new-company";

export const Route = createFileRoute("/_admin/admin/empresas/")({
  component: RouteComponent,
  errorComponent: () => {
    return <div>Error</div>;
  },
  pendingComponent: () => {
    return <div>Carregando...</div>;
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getCompaniesQueryOptions());
  },
});

function RouteComponent() {
  const { data: companiesQuery } = useSuspenseQuery(getCompaniesQueryOptions());

  const onOpen = useNewCompany(state => state.onOpen);

  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Empresas</h1>
            <p className="text-gray-600">Gerencie as empresas do sistema</p>
          </div>
          <Button onClick={onOpen} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova empresa
          </Button>
        </div>
        <DataTable columns={tableColumns} data={companiesQuery.data} />
      </div>
    </div>
  );
}
