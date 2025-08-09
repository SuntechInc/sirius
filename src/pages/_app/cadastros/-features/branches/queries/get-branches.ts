import type { Branch } from "@/types/branch";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { getBranches, type FilterParams } from "../services/get-branches";

type ResponseType = {
  data: Branch[];
  total: number;
};

export function getBranchesQueryOptions<TData = ResponseType, TError = Error>(
  params?: FilterParams,
  options?: Omit<
    UseQueryOptions<ResponseType, TError, TData>,
    "queryFn" | "queryKey"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["/branches/filter", params],
    queryFn: () => getBranches(params),
  });
}
