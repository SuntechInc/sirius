import { getProfile } from "@/services/get-profile";
import type { User } from "@/types/user";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

type ResponseType = User;

export function getProfileQueryOptions<TData = ResponseType, TError = Error>(
  options?: Omit<
    UseQueryOptions<ResponseType, TError, TData>,
    "queryFn" | "queryKey"
  >,
) {
  return queryOptions({
    ...options,
    queryKey: ["get-profile"],
    queryFn: () => getProfile(),
  });
}
