import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { FilterParams } from "@/pages/_app/cadastros/-features/branches/services/get-branches";
import { getCompanies } from "../services/get-companies";
import type { Company } from "@/types/company";

type ResponseType = {
  data: Company[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

export function getCompaniesQueryOptions<TData = ResponseType, TError = Error>(
  params?: FilterParams,
  options?: Omit<
    UseQueryOptions<ResponseType, TError, TData>,
    "queryFn" | "queryKey"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["/companies/filter", params],
    queryFn: () => getCompanies(params),
  });
}
