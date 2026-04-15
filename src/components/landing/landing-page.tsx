"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Building2,
  CheckCircle2,
  HeartPulse,
  Network,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { CoreAiModuleSection } from "@/components/landing/core-ai-module-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { cn } from "@/lib/utils";

const navItems = ["Product", "Solutions", "Pricing", "Resources", "Company"];

const partnerItems = [
  { label: "MediCorp", icon: Building2 },
  { label: "HealthSystems", icon: HeartPulse },
  { label: "CarePartners", icon: Stethoscope },
  { label: "UnityHealth", icon: Network },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

type MeResponse =
  | { id: string; email: string; name?: string | null }
  | { statusCode?: number };

export function LandingPage() {
  const [authPhase, setAuthPhase] = useState<"loading" | "guest" | "authed">(
    "loading",
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPending, setLoginPending] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  async function refreshAuthState() {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) {
        setAuthPhase("guest");
        setUserEmail(null);
        return;
      }
      const data = (await res.json()) as MeResponse;
      if ("email" in data && typeof data.email === "string") {
        setAuthPhase("authed");
        setUserEmail(data.email);
      } else {
        setAuthPhase("guest");
        setUserEmail(null);
      }
    } catch {
      setAuthPhase("guest");
      setUserEmail(null);
    }
  }

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await refreshAuthState();
      if (cancelled) {
        return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLoginSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoginError(null);
    setLoginPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const payload: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoginError(formatApiError(payload, "Login failed."));
        return;
      }
      await refreshAuthState();
      setIsLoginModalOpen(false);
      setLoginEmail("");
      setLoginPassword("");
    } catch {
      setLoginError("Unable to reach server.");
    } finally {
      setLoginPending(false);
    }
  }

  return (
    <main className="bg-[#050507] text-[#f3f4f6]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1248px] items-center justify-between px-4 md:px-8">
          <a href="#" className="flex items-center gap-2" aria-label="Cody One home">
            <span className="grid size-9 place-items-center rounded-md bg-[#6941c6]">
              <Activity className="size-4" />
            </span>
            <span className="text-[23px] leading-[23px] font-bold text-[#6941c6]">Cody One</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#bdc1ca] lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            {authPhase === "authed" && userEmail ? (
              <>
                <span
                  className="hidden max-w-[200px] truncate text-sm text-[#bdc1ca] sm:inline"
                  title={userEmail}
                >
                  {userEmail}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#323743] bg-black text-xs text-[#f3f4f6] hover:bg-black/80"
                  onClick={async () => {
                    await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "same-origin",
                    });
                    setAuthPhase("guest");
                    setUserEmail(null);
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsLoginModalOpen(true);
                  }}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "cursor-pointer text-[#6941c6] hover:bg-transparent hover:text-[#7d56d9]",
                  )}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "cursor-pointer bg-[#6941c6] hover:bg-[#5c36bc]",
                  )}
                >
                  Register
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden cursor-pointer text-[#6941c6] hover:bg-transparent hover:text-[#7d56d9] md:inline-flex"
            >
              Request demo
            </Button>
            <Button
              size="sm"
              className="cursor-pointer bg-[#6941c6] hover:bg-[#5c36bc]"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1248px] gap-14 px-4 pb-16 pt-16 md:px-8 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="space-y-6"
        >
          <div className="inline-flex items-center rounded-full border border-[#6941c633] bg-[#6941c61a] px-3 py-1 text-xs font-medium text-[#6941c6]">
            <span className="mr-2 size-2 rounded bg-[#6941c6]" />
            Platform 2.0 Now Available
          </div>
          <h1 className="text-pretty text-5xl font-bold leading-[1.02] tracking-[-0.02em] lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.8px]">
            <span className="text-[#6941c6]">Cody One</span>
            <br />
            AI-powered Revenue Cycle Automation
          </h1>
          <p className="max-w-[564px] text-[18px] leading-[30px] text-[#bdc1ca] lg:text-[20px] lg:leading-[33px]">
            Transform your enterprise healthcare operations with intelligent
            automation designed to maximize revenue, minimize denials, and
            streamline administrative workflows.
          </p>
          <ul className="grid max-w-[560px] grid-cols-1 gap-y-3 text-[16px] leading-7 text-[#bdc1ca] sm:grid-cols-2 lg:text-[18px] lg:leading-[28px]">
            {["Medical coding", "Prior authorization", "Denial management", "Payment posting", "Advanced Analytics"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#6941c6]" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="lg" className="h-14 rounded-[16px] bg-[#6941c6] px-7 text-[18px] font-medium hover:bg-[#5c36bc]">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 cursor-pointer rounded-[16px] border-[#32374399] bg-transparent px-7 text-[18px] font-medium text-[#f3f4f6] hover:border-[#4a5161] hover:bg-white/5 hover:text-[#f3f4f6]"
            >
              Request Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-[560px] rounded-[40px]  p-3 shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rotate-3 rounded-[40px] border border-[#32374366] bg-[#12151b] opacity-80"
          />
          <div className="relative z-10 rounded-[34px] border border-[#32374399] bg-[#171a1f66] p-4 backdrop-blur-xl md:p-5">
            <div className="mb-3 flex items-start justify-between border-b border-[#32374366] pb-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-[#6941c633]">
                  <Activity className="size-4 text-[#6941c6]" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-[#f3f4f633]" />
                  <div className="h-3 w-16 rounded bg-[#bdc1ca4d]" />
                </div>
              </div>
              <div className="grid size-8 place-items-center rounded-full bg-white/5">
                <div className="size-1.5 rounded-full bg-[#bdc1ca]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex min-h-[235px] flex-col justify-between rounded-2xl border border-[#32374366] bg-[rgba(0,0,0,0.6)] p-5">
                <p className="text-sm text-[#f3f4f6]">↗</p>
                <div>
                  <p className="text-[40px] leading-[1.05] font-bold">$2.4M</p>
                  <p className="mt-1 text-[14px] leading-5 text-[#bdc1ca]">Recovered Revenue</p>
                </div>
              </div>
              <div className="flex min-h-[235px] flex-col justify-between rounded-2xl border border-[#32374366] bg-[rgba(0,0,0,0.6)] p-5">
                <ShieldCheck className="size-4 text-[#f3f4f6]" />
                <div>
                  <p className="text-[40px] leading-[1.05] font-bold">98.2%</p>
                  <p className="mt-1 text-[14px] leading-5 text-[#bdc1ca]">Auth Success Rate</p>
                </div>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-[#32374366] bg-[rgba(0,0,0,0.6)] p-4">
              <div className="flex h-[94px] items-end gap-2">
                {[38, 57, 43, 76, 52, 85, 71, 94].map((height, index) => (
                  <div
                    // Matches the bar sequence from node 1:287.
                    key={`${height}-${index}`}
                    className="flex-1 rounded-t-[4px] bg-[#6941c633]"
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#32374380] bg-[#171a1f33]">
        <div className="mx-auto w-full max-w-[1248px] px-4 py-10 md:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-[#bdc1ca]">
            Trusted by leading healthcare enterprises
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5 text-[#f3f4f699] md:grid-cols-4">
            {partnerItems.map((partner) => (
              <div key={partner.label} className="flex items-center justify-center gap-2 text-base font-semibold">
                <partner.icon className="size-5" />
                <span>{partner.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoreAiModuleSection
        isAuthenticated={authPhase === "authed"}
        isCheckingAuth={authPhase === "loading"}
        onRequestLogin={() => setIsLoginModalOpen(true)}
      />

      <section className="border-y border-[#32374380] bg-[#1f113b33]">
        <div className="mx-auto flex w-full max-w-[1248px] flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-4xl font-bold">Ready to transform your revenue cycle?</h2>
            <p className="mt-3 text-[#bdc1ca]">
              Join industry leaders who are maximizing revenue and minimizing
              administrative burden with Cody One.
            </p>
          </div>
          <Button className="h-14 rounded-2xl bg-[#f3f4f6] px-8 text-black hover:bg-white">
            Get Started Now
          </Button>
        </div>
      </section>

      <footer className="bg-[#f8fafc] text-[#bdc1ca]">
        <div className="mx-auto w-full max-w-[1248px] px-4 py-14 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_3fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded bg-[#6941c6] text-white">
                  <Activity className="size-3.5" />
                </span>
                <span className="font-bold text-[#6941c6]">Cody One</span>
              </div>
              <p className="mt-4 max-w-[300px] text-sm">
                AI-powered Revenue Cycle Automation Platform designed for enterprise
                healthcare.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
              {[
                [
                  "Patient Access AI",
                  "Eligibility AI",
                  "Prior Authorization AI",
                  "Coding AI",
                  "Claims AI",
                  "Denial AI",
                  "Collections AI",
                  "Analytics AI",
                ],
                ["Hospitals", "Private Practices", "Billing Companies", "Specialty Clinics"],
                ["Documentation", "Case Studies", "Blog", "API Reference"],
                ["About Us", "Careers", "Contact", "Partners"],
              ].map((group, idx) => (
                <ul key={idx} className="space-y-3">
                  {group.map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#151923]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-[#1519234d] pt-5 text-sm">
            © 2026 Cody One. All rights reserved.
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {isLoginModalOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md rounded-2xl border border-[#323743] bg-[#11131a] p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#f3f4f6]">Login</h3>
              <p className="mt-2 text-sm text-[#bdc1ca]">
                Sign in to unlock Core AI Modules.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
                <div className="space-y-2">
                  <label htmlFor="landing-login-email" className="text-sm text-[#e5e7eb]">
                    Email
                  </label>
                  <input
                    id="landing-login-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    className="w-full rounded-lg border border-[#323743] bg-black/40 px-3 py-2 text-sm outline-none ring-[#6941c6]/40 focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="landing-login-password" className="text-sm text-[#e5e7eb]">
                    Password
                  </label>
                  <input
                    id="landing-login-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    className="w-full rounded-lg border border-[#323743] bg-black/40 px-3 py-2 text-sm outline-none ring-[#6941c6]/40 focus:ring-2"
                  />
                </div>
                {loginError ? (
                  <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                    {loginError}
                  </p>
                ) : null}
                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#323743] bg-transparent text-[#f3f4f6] hover:bg-white/5"
                    onClick={() => setIsLoginModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#6941c6] hover:bg-[#5c36bc]"
                    disabled={loginPending}
                  >
                    {loginPending ? "Signing in..." : "Log in"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
