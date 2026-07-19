import { useQuery } from "@tanstack/react-query";
import { listVerifications } from "@/lib/api/verifications";

export function useVerifications() {
  return useQuery({
    queryKey: ["verifications"],
    queryFn: listVerifications,
  });
}