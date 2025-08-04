import type z from "zod";
import type { createCompanySchema } from "../validations/company";
import { api } from "@/lib/api";
import type { Company } from "@/types/company";

type ResponseType = Company;

export async function createCompany(data: z.input<typeof createCompanySchema>) {
  const res = await api.post<ResponseType>("/company", data);

  return res.data;
}
