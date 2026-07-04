// src/hooks/useRequests.ts
import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "../api/requestsApi";
import type { RequestStatus } from "../types";

export function useRequests(status?: RequestStatus) {
  return useQuery({
    queryKey: ["requests", status ?? "all"],
    queryFn: () => getAllRequests(status),
  });
}
