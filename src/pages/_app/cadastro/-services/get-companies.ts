import api from "@/lib/api";
import type { BranchStatus } from "@/types/enum";

export type Company = {
  id: string;
  taxId: string;
  tradingName: string;
  legalName: string;
  code: string;
  email: string;
  phone: string;
  responsible: string;
  isHeadquarter: boolean;
  status: BranchStatus;
  companyId: string;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ResponseType = {
  data: Company[];
  pagination: {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
};

export async function getCompanies(companyId?: string) {
  if (!companyId) {
    throw new Error("CompanyId Not Found");
  }

  const res = await api.get<ResponseType>(
    `/branches/filter?companyId=${companyId}`,
  );

  return res.data;
}
