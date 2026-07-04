import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import type { LoginInput } from "../types";

export function useLogin() {
  const { loginWithAuthResponse } = useAuth();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (data) => {
      loginWithAuthResponse(data);
    },
  });
}
