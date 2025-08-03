import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { FilterParams } from "@/pages/_app/cadastros/-features/branches/services/get-branches";
import { getCompanies } from "../services/get-companies";
import type { Company } from "@/types/company";

type ResponseType = {
  data: Company[];
  total: number;
};

export function getCompaniesQueryOptions<TData = ResponseType, TError = Error>(
  params?: FilterParams,
  options?: Omit<
    UseQueryOptions<ResponseType, TError, TData>,
    "queryFn" | "queryKey"
  >,
) {
  return queryOptions({
    ...options,
    queryKey: ["companies", params],
    queryFn: () => getCompanies(params),
  });
}
