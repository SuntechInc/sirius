import { api } from "@/lib/api";
import type { Company } from "@/types/company";
import type z from "zod";
import type { createCompanySchema } from "../validations/company";

type ResponseType = Company;

type RequestType = {
  companyId: string;
  data: z.input<typeof createCompanySchema>;
};

export async function editCompany({ companyId, data }: RequestType) {
  const res = await api.put<ResponseType>(`/companies/${companyId}`, data);

  return res.data;
}
