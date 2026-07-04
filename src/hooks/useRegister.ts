import { useMutation } from "@tanstack/react-query";
import { register } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import type { RegisterInput } from "../types";

export function useRegister() {
  const { loginWithAuthResponse } = useAuth();

  return useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (data) => {
      loginWithAuthResponse(data);
    },
  });
}
