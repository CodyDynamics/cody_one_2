import { NextResponse } from "next/server";

import { getBackendBaseUrl } from "@/lib/server/backend-url";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { statusCode: 400, message: "Invalid JSON body", error: "BadRequest" },
      { status: 400 },
    );
  }

  const base = getBackendBaseUrl();
  const upstream = await fetch(`${base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload: unknown = await upstream.json().catch(() => ({}));
  return NextResponse.json(payload, { status: upstream.status });
}
