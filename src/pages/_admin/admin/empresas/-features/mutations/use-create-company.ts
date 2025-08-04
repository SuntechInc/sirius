import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "../services/create-company";
import { getCompaniesQueryOptions } from "../queries/get-companies";
import { toast } from "sonner";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [getCompaniesQueryOptions().queryKey],
      });
      toast.success(`Empresa ${data.tradingName} criada com sucesso!`);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
}
