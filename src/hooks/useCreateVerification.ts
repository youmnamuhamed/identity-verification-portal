import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVerification } from "@/lib/api/verifications";

export function useCreateVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVerification,
    onSuccess: () => {
      // Ensures the dashboard shows the new record immediately after redirect,
      // rather than waiting for staleTime to expire.
      queryClient.invalidateQueries({ queryKey: ["verifications"] });
    },
  });
}