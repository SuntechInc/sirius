import { api } from "@/lib/api";
import {
  buildParams,
  type FilterParams,
} from "@/pages/_app/cadastros/-features/branches/services/get-branches";
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

export async function getCompanies(filters: FilterParams = {}) {
  const params = buildParams(filters);

  const response = await api.get<ResponseType>("/companies/filter", {
    params,
  });

  return response.data;
}
