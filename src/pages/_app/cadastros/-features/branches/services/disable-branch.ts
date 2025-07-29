import api from "@/lib/api";
import type { Branch } from "@/types/branch";

type ResponseType = Branch;

export async function disableBranch(branchId: string) {
  const res = await api.delete<ResponseType>(`/branches/${branchId}`);

  return res.data;
}
