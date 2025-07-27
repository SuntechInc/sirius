import api from "@/lib/api";
import type { Branch } from "@/types/branch";
import { useQuery } from "@tanstack/react-query";

type ResponseType = {
  data: Branch[];
  pagination: {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
};

export function useGetBranchById(companyId?: string, branchId?: string) {
  return useQuery<ResponseType>({
    queryKey: ["/branches/filter?or.code=eq:", companyId],
    queryFn: async () => {
      const response = await api.get(
        `/branches/filter?companyId=${companyId}&or.id=eq:${branchId}`,
      );
      return response.data;
    },
    enabled: !!branchId,
  });
}
