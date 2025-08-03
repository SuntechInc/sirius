import { api } from "@/lib/api";
import {
  buildParams,
  type FilterParams,
} from "@/pages/_app/cadastros/-features/branches/services/get-branches";
import type { Company } from "@/types/company";

export async function getCompanies(filters: FilterParams = {}) {
  const params = buildParams(filters);

  const response = await api.get<{ data: Company[]; total: number }>(
    "/companies/companies/filter",
    {
      params,
    },
  );

  return response.data;
}
