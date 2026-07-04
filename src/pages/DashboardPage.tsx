import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RequestsTable } from "../components/RequestsTable";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
        <h1 className="text-lg font-semibold text-slate-800">
          Client Requests
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <RequestsTable />
        </div>
      </main>
    </div>
  );
}
