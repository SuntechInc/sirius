import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCompany } from "../services/edit-company";
import { getCompaniesQueryOptions } from "../queries/get-companies";
import { toast } from "sonner";

export function useEditCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCompany,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: getCompaniesQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getCompaniesQueryOptions({ "or.id": `eq:${data.id}` })
          .queryKey,
      });
      toast.success(`Empresa ${data.tradingName} atualizada com sucesso!`);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
}
