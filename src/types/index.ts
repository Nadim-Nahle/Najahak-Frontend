export type RequestStatus = "New" | "In Progress" | "Done";

export interface ClientRequest {
  _id: string;
  clientName: string;
  title: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequestInput {
  clientName: string;
  title: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  count?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: string[];
}
