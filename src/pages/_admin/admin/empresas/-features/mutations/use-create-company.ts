import { api } from "@/lib/api";
import type z from "zod";
import type { createCompanySchema } from "../validations/company";
import type { Company } from "@/types/company";

type ResponseType = Company;

export async function createCompany(data: z.infer<typeof createCompanySchema>) {
  const res = await api.post<ResponseType>("/companies/company", data);

  return res.data;
}
