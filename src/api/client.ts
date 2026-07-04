import type { ApiErrorResponse, ApiSuccessResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL as string;

export class ApiClientError extends Error {
  status: number;
  details?: string[];

  constructor(status: number, message: string, details?: string[]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function getToken(): string | null {
  return localStorage.getItem("token");
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await response.json();

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse;
    throw new ApiClientError(
      response.status,
      errorBody.message,
      errorBody.details,
    );
  }

  const successBody = body as ApiSuccessResponse<T>;
  return successBody.data;
}
