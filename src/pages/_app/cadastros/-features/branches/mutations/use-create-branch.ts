import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBranch } from "../services/create-branch";
import { getBranchesQueryOptions } from "../queries/get-branches";

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [getBranchesQueryOptions().queryKey],
      });
      toast.success(`Empresa ${data.tradingName} criada com sucesso!`);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
}
