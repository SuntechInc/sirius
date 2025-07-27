import { useApiMutation } from "@/lib/react-query-utils";
import type { CreateBranchFormData } from "../-validations/company";

type ResponseType = any;

export function useCreateCompany() {
  return useApiMutation<ResponseType, CreateBranchFormData>(
    "POST",
    "/branches",
  );
}
