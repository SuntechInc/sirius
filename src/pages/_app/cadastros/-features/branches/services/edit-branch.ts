import api from "@/lib/api";
import type { Branch } from "@/types/branch";
import type z from "zod";
import type { createBranchSchema } from "../validations/branch";

type ResponseType = Branch;

type RequestType = {
  branchId: string;
  data: z.infer<typeof createBranchSchema>;
};

export async function editBranch({ branchId, data }: RequestType) {
  const res = await api.put<ResponseType>(`/branches/${branchId}`, data);

  return res.data;
}
