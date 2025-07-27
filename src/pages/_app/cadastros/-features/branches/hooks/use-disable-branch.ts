import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "@/lib/api";

type ResponseType = any;

export function useDisableBranch(branchId?: string) {
  return useMutation<ResponseType, AxiosError>({
    mutationFn: async () => {
      const res = await api.delete<ResponseType>(`/branches/${branchId}`);

      return res.data;
    },
  });
}
