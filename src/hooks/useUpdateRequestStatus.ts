import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequestStatus } from "../api/requestsApi";
import type { RequestStatus } from "../types";

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RequestStatus }) =>
      updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
