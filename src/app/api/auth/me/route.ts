import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants";
import { getBackendBaseUrl } from "@/lib/server/backend-url";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json(
      { statusCode: 401, message: "Unauthorized", error: "Unauthorized" },
      { status: 401 },
    );
  }

  const base = getBackendBaseUrl();
  const upstream = await fetch(`${base}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const payload: unknown = await upstream.json().catch(() => ({}));
  return NextResponse.json(payload, { status: upstream.status });
}
