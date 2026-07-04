import type { RequestStatus } from "../types";

const STATUS_STYLES: Record<RequestStatus, string> = {
  New: "bg-slate-100 text-slate-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Done: "bg-emerald-50 text-emerald-700",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
