import { useRequests } from "../hooks/useRequests";
import { useUpdateRequestStatus } from "../hooks/useUpdateRequestStatus";
import { StatusBadge } from "./StatusBadge";
import type { RequestStatus } from "../types";

const NEXT_STATUS: Record<RequestStatus, RequestStatus | null> = {
  New: "In Progress",
  "In Progress": "Done",
  Done: null,
};

export function RequestsTable() {
  const { data: requests, isLoading, isError, error } = useRequests();
  const updateStatus = useUpdateRequestStatus();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading requests...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {error instanceof Error ? error.message : "Failed to load requests."}
      </p>
    );
  }

  if (!requests || requests.length === 0) {
    return <p className="text-sm text-slate-500">No client requests yet.</p>;
  }

  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-slate-500">
          <th className="py-2 font-medium">Client</th>
          <th className="py-2 font-medium">Title</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => {
          const next = NEXT_STATUS[request.status];
          return (
            <tr key={request._id} className="border-b border-slate-100">
              <td className="py-3 text-slate-700">{request.clientName}</td>
              <td className="py-3 text-slate-700">{request.title}</td>
              <td className="py-3">
                <StatusBadge status={request.status} />
              </td>
              <td className="py-3 text-right">
                {next && (
                  <button
                    onClick={() =>
                      updateStatus.mutate({ id: request._id, status: next })
                    }
                    disabled={updateStatus.isPending}
                    className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Move to {next}
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
