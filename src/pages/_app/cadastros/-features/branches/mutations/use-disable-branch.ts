import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { disableBranch } from "../services/disable-branch";
import { getBranchesQueryOptions } from "../queries/get-branches";

export function useDisableBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disableBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getBranchesQueryOptions().queryKey,
      });
      toast.success(`Empresa ${data.tradingName} desativada com sucesso!`);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
}
