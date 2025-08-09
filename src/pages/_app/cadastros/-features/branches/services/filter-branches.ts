import { api } from "@/lib/api";
import type { Branch } from "@/types/branch";

type Operator = "eq" | "in";

export type FilterValue = `${Operator}:${string}`;

export type BranchFilter = {
  status?: FilterValue;
  isHeadquarter?: FilterValue;
  tradingName?: FilterValue;
  code?: FilterValue;
};

export type OrBranchFilter = {
  [K in keyof BranchFilter as `or.${string & K}`]?: BranchFilter[K];
};

export type FilterParams = BranchFilter &
  OrBranchFilter & {
    page?: number;
    size?: number;
  };

const buildParams = (filters: FilterParams) => {
  const params = new URLSearchParams();

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value = filters[key as keyof FilterParams];
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }
  }

  return params;
};

export async function filterBranches(filters: FilterParams = {}) {
  const params = buildParams(filters);

  const { data } = await api.get<{ data: Branch[]; total: number }>(
    "/branches/filter",
    {
      params,
    }
  );

  return data;
}
