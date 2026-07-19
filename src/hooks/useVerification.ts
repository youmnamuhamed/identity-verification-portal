import { useQuery } from "@tanstack/react-query";
import { getVerification } from "@/lib/api/verifications";

export function useVerification(id: string | undefined) {
  return useQuery({
    queryKey: ["verifications", id],
    queryFn: () => getVerification(id as string),
    enabled: Boolean(id), // don't fire until we actually have an id
  });
}