import { useState } from "react";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { ApiClientError } from "../api/client";

interface CreateRequestFormProps {
  onCreated: () => void;
}

export function CreateRequestForm({ onCreated }: CreateRequestFormProps) {
  const [clientName, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createRequest = useCreateRequest();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createRequest.mutate(
      { clientName, title, description: description || undefined },
      {
        onSuccess: () => {
          setClientName("");
          setTitle("");
          setDescription("");
          onCreated();
        },
      },
    );
  }

  const errorMessage =
    createRequest.error instanceof ApiClientError
      ? createRequest.error.message
      : null;

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Client name
        </label>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={createRequest.isPending}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {createRequest.isPending ? "Creating..." : "Create request"}
      </button>
    </form>
  );
}
