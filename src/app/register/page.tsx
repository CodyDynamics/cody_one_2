"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(name.trim() ? { name: name.trim() } : {}),
        }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(formatApiError(data, "Registration failed"));
        setPending(false);
        return;
      }
      router.push("/login");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-full bg-[#050507] px-4 py-16 text-[#f3f4f6]">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#32374380] bg-[#171a1f] p-8 shadow-xl">
        <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-[#bdc1ca]">
          After you register successfully, sign in to receive your session
          cookie.
        </p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e5e7eb]" htmlFor="name">
              Name (optional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full rounded-lg border border-[#323743] bg-black/40 px-3 py-2 text-sm outline-none ring-[#6941c6]/40 focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e5e7eb]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full rounded-lg border border-[#323743] bg-black/40 px-3 py-2 text-sm outline-none ring-[#6941c6]/40 focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[#e5e7eb]"
              htmlFor="password"
            >
              Password (at least 8 characters)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full rounded-lg border border-[#323743] bg-black/40 px-3 py-2 text-sm outline-none ring-[#6941c6]/40 focus:ring-2"
            />
          </div>
          {error ? (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-[#6941c6] hover:bg-[#5c36bc]"
          >
            {pending ? "Creating account…" : "Register"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[#94a3b8]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#c4b5fd] hover:text-[#ddd6fe]"
          >
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-[#94a3b8] hover:text-white",
            )}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
