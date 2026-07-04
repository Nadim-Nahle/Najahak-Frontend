import { apiRequest } from "./client";
import type {
  ClientRequest,
  CreateRequestInput,
  RequestStatus,
} from "../types";

export function getAllRequests(
  status?: RequestStatus,
): Promise<ClientRequest[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiRequest<ClientRequest[]>(`/requests${query}`);
}

export function getRequestById(id: string): Promise<ClientRequest> {
  return apiRequest<ClientRequest>(`/requests/${id}`);
}

export function createRequest(
  input: CreateRequestInput,
): Promise<ClientRequest> {
  return apiRequest<ClientRequest>("/requests", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<ClientRequest> {
  return apiRequest<ClientRequest>(`/requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
