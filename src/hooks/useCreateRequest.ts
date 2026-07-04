import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "../api/requestsApi";
import type { CreateRequestInput } from "../types";

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRequestInput) => createRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
