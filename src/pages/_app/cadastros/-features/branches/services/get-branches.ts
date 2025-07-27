import api from "@/lib/api";
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

export function getBranches(companyId?: string) {
  return queryOptions<ResponseType>({
    queryKey: ["/branches/filter?companyId=", companyId],
    queryFn: async () => {
      const response = await api.get(`/branches/filter?companyId=${companyId}`);
      return response.data;
    },
    enabled: !!companyId,
  });
}
