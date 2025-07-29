import api from "@/lib/api";
import type z from "zod";
import type { createBranchSchema } from "../validations/branch";
import type { Branch } from "@/types/branch";

type ResponseType = Branch;

export async function createBranch(data: z.infer<typeof createBranchSchema>) {
  const res = await api.post<ResponseType>("/branches", data);

  return res.data;
}
