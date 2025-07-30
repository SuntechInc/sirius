import { api } from "@/lib/api";
import type { Branch } from "@/types/branch";
import { queryOptions } from "@tanstack/react-query";

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

export function getBranch(branchId?: string) {
  return queryOptions<ResponseType>({
    queryKey: ["/branches/filter", branchId],
    queryFn: async () => {
      const response = await api.get(`/branches/filter`);
      return response.data;
    },
  });
}
