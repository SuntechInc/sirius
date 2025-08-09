import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount, error: any) => {
        // Don't retry on authentication errors - let the interceptor handle it
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }

        return failureCount < 3;
      },

      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount, error: any) => {
        // Don't retry mutations on authentication errors
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }
        return failureCount < 1;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error("Mutation error:", error);
        // Don't show toast for auth errors as they're handled by interceptor
        if (
          error?.response?.status !== 401 &&
          error?.response?.status !== 403
        ) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "An error occurred"
          );
        }
      },
    },
  },
});
