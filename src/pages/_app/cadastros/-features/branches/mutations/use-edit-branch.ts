import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editBranch } from "../services/edit-branch";
import { getBranchesQueryOptions } from "../queries/get-branches";

export function useEditBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editBranch,
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: getBranchesQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getBranchesQueryOptions({ "or.id": `eq:${data.id}` })
          .queryKey,
      });
      toast.success(`Empresa ${data.tradingName} atualizada com sucesso!`);
    },
    onError: err => {
      toast.error(err.message);
      console.error(err);
    },
  });
}
