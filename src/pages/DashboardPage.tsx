import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RequestsTable } from "../components/RequestsTable";
import { CreateRequestForm } from "../components/CreateRequestForm";
import { Modal } from "../components/Modal";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Requests</h2>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              + New request
            </button>
          </div>
          <RequestsTable />
        </div>
      </main>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="New client request"
      >
        <CreateRequestForm onCreated={() => setIsCreateOpen(false)} />
      </Modal>
    </div>
  );
}
