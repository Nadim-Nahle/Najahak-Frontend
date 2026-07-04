import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // fail fast in dev instead of retrying 3x on a real error
      staleTime: 30_000, // data is considered fresh for 30s, avoids refetch spam
    },
  },
});
