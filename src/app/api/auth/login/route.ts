import { NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants";
import { parseJwtExpiresToSeconds } from "@/lib/auth/jwt-expires";
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
  const upstream = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload: unknown = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }

  const data = payload as { accessToken?: string; user?: unknown };
  if (!data.accessToken) {
    return NextResponse.json(
      {
        statusCode: 502,
        message: "Login response missing token",
        error: "BadGateway",
      },
      { status: 502 },
    );
  }

  const expiresIn = process.env.JWT_EXPIRES_IN?.trim() || "7d";
  const maxAge = parseJwtExpiresToSeconds(expiresIn);
  const res = NextResponse.json({ ok: true, user: data.user ?? null });
  res.cookies.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
