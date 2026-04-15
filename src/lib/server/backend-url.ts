/**
 * Base URL of the Nest API (Route Handler — server-only calls).
 * Prefer `API_URL` (stays out of the client bundle unless imported from a Client Component).
 * `NEXT_PUBLIC_API_URL` is supported for deploy convenience; use only in Route Handler server code.
 */
export function getBackendBaseUrl(): string {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "";
  if (!raw) {
    throw new Error(
      "Missing API_URL or NEXT_PUBLIC_API_URL for server-side backend calls.",
    );
  }
  return raw.replace(/\/$/, "");
}
