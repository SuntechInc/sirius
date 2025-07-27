import { useMutation } from "@tanstack/react-query";
import type { createBranchSchema } from "../validations/branch";
import type z from "zod";
import type { AxiosError } from "axios";
import api from "@/lib/api";

type ResponseType = any;

type RequestType = z.infer<typeof createBranchSchema>;

export function useCreateBranch() {
  return useMutation<ResponseType, AxiosError, RequestType>({
    mutationFn: async (json) => {
      const res = await api.post<ResponseType>("/branches", json);

      return res.data;
    },
  });
}
