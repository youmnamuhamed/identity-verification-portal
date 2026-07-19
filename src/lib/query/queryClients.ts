import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30s — avoids refetching immediately on every mount
        retry: 1, // one retry on failure, not the default 3 (fails fast for demo/dev)
        refetchOnWindowFocus: false, // avoids surprise refetches during dev/testing
      },
      mutations: {
        retry: 0, // don't silently retry a failed submission
      },
    },
  });
}