import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { useNewBranch } from "./-features/branches/store/use-new-branch";
import { tableColumns } from "./-features/branches/components/table-columns";
import { getBranches } from "./-features/branches/services/get-branches";

export const Route = createFileRoute("/_app/cadastros/empresas")({
  component: RouteComponent,
  errorComponent: () => {
    return <div>Error</div>;
  },
  pendingComponent: () => {
    return <div>Carregando...</div>;
  },
  loader: async ({ context: { queryClient, auth } }) => {
    await queryClient.ensureQueryData(getBranches(auth.user?.actionCompanyId));
  },
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();
  const { data: branchesQuery } = useSuspenseQuery(
    getBranches(auth.user?.actionCompanyId),
  );

  const onOpen = useNewBranch((state) => state.onOpen);

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
        <DataTable columns={tableColumns} data={branchesQuery.data} />
      </div>
    </div>
  );
}
