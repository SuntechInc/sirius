import {
  useMutation,
  useQuery,
  type QueryOptions,
} from "@tanstack/react-query";
import api from "./api";

export const useApiQuery = <T>(endpoint: string, options?: QueryOptions) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async (): Promise<T> => {
      const response = await api.get(endpoint);
      return response.data;
    },
    ...options,
  });
};

export const useApiMutation = <TData, TVariables>(
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  options?: QueryOptions,
) => {
  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      const response = await api({
        method: method.toLowerCase(),
        url: endpoint,
        data: variables,
      });
      return response.data;
    },
    ...options,
  });
};
