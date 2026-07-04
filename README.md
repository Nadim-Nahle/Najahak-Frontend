# Client Requests Dashboard — Frontend

React + TypeScript client for the Client Requests dashboard. Lets a user
register/log in, view client requests, create new ones, and move each
one through the workflow: `New -> In Progress -> Done`.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS (v4)
- TanStack Query (React Query), server state, caching, mutations
- React Router, routing + protected routes

## Live Deployment

- **App:** https://najahak-frontend.vercel.app/
- **Test account:** `test@test.com` / `123456` (or use the "Create one" link on the login page to register your own)

This is a fully working deployment connected to a live backend and database, no local setup needed to try it. See "Local Setup" below if you'd like to run it yourself instead.

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Create your local environment file:

```bash
   cp .env.example .env
```

`VITE_API_URL` should point at the backend (defaults to `https://najahak-backend.vercel.app/api`).

3. start the dev server:

```bash
   npm run dev
```

4. Open the printed local URL (typically `http://localhost:5173`).

## Auth flow

- Visiting the app with no token redirects to `/login`.
- `/register` creates an account and logs you in immediately.
- The token is stored in `localStorage` and attached automatically to every API request via `api/client.ts`.
- `/dashboard` is wrapped in `ProtectedRoute`, redirects back to `/login` if there's no logged-in user.

## Data flow example: updating a request's status

1. `RequestsTable` calls `useUpdateRequestStatus()` (a TanStack Query mutation).
2. On success, the mutation calls `queryClient.invalidateQueries({ queryKey: ['requests'] })`.
3. TanStack Query refetches the list automatically, and every component using `useRequests()` re-renders with the fresh data, no manual state syncing.

## Notes on design decisions

- `api/client.ts` is a thin `fetch` wrapper instead of axios, already handles JSON parsing, the `Authorization` header, and typed errors, so an extra dependency wasn't needed.
- `RequestStatus` is a TypeScript string-literal union, not an enum, maps directly to the exact strings the backend sends/expects.
- The "next status" workflow is mirrored on the frontend purely for UX (hiding the button once a request is `Done`), the backend remains the actual source of truth and independently rejects any invalid transition.
