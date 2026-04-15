"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clock3,
  TrendingUp,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { coreFeatureItems } from "./core-ai-modules-data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

type CoreAiModuleSectionProps = {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  onRequestLogin: () => void;
};

type PixelBlock = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  duration: number;
  rotate: number;
};

type AnalyticsSlide = {
  id: string;
  image: string;
  imageAlt: string;
  rightTitle: string;
  rightDescription: string;
  stats: Array<{
    label: string;
    value: string;
    icon: "trend" | "activity" | "clock";
  }>;
  integrationNote: string;
};

const analyticsSlides: AnalyticsSlide[] = [
  {
    id: "overview",
    image: "/images/version_2/image1.jpeg",
    imageAlt: "Analytics dashboard overview",
    rightTitle: "Key Performance Impact",
    rightDescription:
      "Our Analytics AI continuously monitors your revenue cycle, identifying bottlenecks and predicting outcomes to optimize financial health.",
    stats: [
      { label: "Denial Rate Reduction", value: "15%", icon: "trend" },
      { label: "Net Collection Increase", value: "12%", icon: "activity" },
      { label: "Days in A/R Reduced", value: "8 Days", icon: "clock" },
    ],
    integrationNote:
      "Integrates seamlessly with Epic, Cerner, and 40+ other major EHR/PM systems out of the box.",
  },
  {
    id: "denial",
    image: "/images/version_2/image2.png",
    imageAlt: "Denial trend insights",
    rightTitle: "Denial Intelligence",
    rightDescription:
      "Track denial categories in real time and identify root causes early, so teams can intervene before claims are rejected.",
    stats: [
      { label: "Preventable Denials", value: "31%", icon: "trend" },
      { label: "First-pass Claims", value: "96.4%", icon: "activity" },
      { label: "Appeal Cycle Time", value: "-2.1 Days", icon: "clock" },
    ],
    integrationNote:
      "Customizes insights per payer policy and claim type with continuously updated benchmarks.",
  },
  {
    id: "payer",
    image: "/images/version_2/image3.jpeg",
    imageAlt: "Payer performance analysis dashboard",
    rightTitle: "Payer Performance Lens",
    rightDescription:
      "Compare payer behavior side by side to highlight lagging authorization windows and reimbursement inconsistencies.",
    stats: [
      { label: "Payer SLA Adherence", value: "89%", icon: "trend" },
      { label: "Recovery Opportunity", value: "$1.2M", icon: "activity" },
      { label: "Avg. Settlement Delay", value: "4.8 Days", icon: "clock" },
    ],
    integrationNote:
      "Built to support multi-site systems with normalized metrics across payer contracts.",
  },
  {
    id: "forecast",
    image: "/images/version_2/image4.png",
    imageAlt: "Collections forecast dashboard",
    rightTitle: "Collections Forecast",
    rightDescription:
      "Forecast cash flow with confidence using trend-driven projections and scenario planning across service lines.",
    stats: [
      { label: "Projected Cash-in", value: "+18%", icon: "trend" },
      { label: "At-risk Accounts", value: "742", icon: "activity" },
      { label: "Time to Resolution", value: "6.2 Days", icon: "clock" },
    ],
    integrationNote:
      "Connects financial, denial, and operational data to produce a single forecast model.",
  },
  {
    id: "authorization",
    image: "/images/version_2/image5.png",
    imageAlt: "Authorization operations dashboard",
    rightTitle: "Authorization Control Tower",
    rightDescription:
      "Coordinate prior-auth requests across departments with a single timeline that highlights approval bottlenecks and escalation risks.",
    stats: [
      { label: "Approval Throughput", value: "+22%", icon: "trend" },
      { label: "Pending Requests", value: "184", icon: "activity" },
      { label: "Avg. Approval Time", value: "1.7 Days", icon: "clock" },
    ],
    integrationNote:
      "Aligns payer rules with clinician workflow to reduce delays before treatment is scheduled.",
  },
  {
    id: "coding-accuracy",
    image: "/images/version_2/image6.png",
    imageAlt: "Coding quality and compliance dashboard",
    rightTitle: "Coding Quality Monitor",
    rightDescription:
      "Surface coding drift early with AI-assisted anomaly detection and benchmark every team against compliance and reimbursement targets.",
    stats: [
      { label: "Coding Accuracy", value: "98.6%", icon: "trend" },
      { label: "High-risk Charts", value: "63", icon: "activity" },
      { label: "Review Cycle Time", value: "5.4 hrs", icon: "clock" },
    ],
    integrationNote:
      "Supports coding governance programs with audit-ready insights and explainable AI recommendations.",
  },
  {
    id: "patient-finance",
    image: "/images/version_2/image7.jpeg",
    imageAlt: "Patient financial experience dashboard",
    rightTitle: "Patient Financial Journey",
    rightDescription:
      "Track patient billing touchpoints end-to-end to improve transparency, reduce confusion, and increase on-time payments.",
    stats: [
      { label: "Self-pay Conversion", value: "+14%", icon: "trend" },
      { label: "Open Statements", value: "1,248", icon: "activity" },
      { label: "Payment Resolution", value: "3.2 Days", icon: "clock" },
    ],
    integrationNote:
      "Combines billing, call-center, and portal signals to improve patient experience and collection outcomes.",
  },
  {
    id: "claim-lifecycle",
    image: "/images/version_2/image8.jpeg",
    imageAlt: "Claim lifecycle performance dashboard",
    rightTitle: "Claim Lifecycle Intelligence",
    rightDescription:
      "Visualize every stage from submission to reimbursement, then prioritize intervention where claim leakage is highest.",
    stats: [
      { label: "Clean Claim Rate", value: "97.1%", icon: "trend" },
      { label: "Claims At Risk", value: "409", icon: "activity" },
      { label: "End-to-end Turnaround", value: "7.9 Days", icon: "clock" },
    ],
    integrationNote:
      "Built for revenue integrity teams that need rapid visibility across fragmented claim workflows.",
  },
  {
    id: "executive-view",
    image: "/images/version_2/image9.jpeg",
    imageAlt: "Executive revenue cycle summary dashboard",
    rightTitle: "Executive Performance Brief",
    rightDescription:
      "Deliver a board-ready summary of revenue cycle health with strategic KPIs, trend context, and immediate action priorities.",
    stats: [
      { label: "Revenue Efficiency", value: "+11.8%", icon: "trend" },
      { label: "Priority Initiatives", value: "9", icon: "activity" },
      { label: "Variance Detection", value: "< 24h", icon: "clock" },
    ],
    integrationNote:
      "Designed for leadership review sessions with concise, high-signal metrics and explainable movement drivers.",
  },
];

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function createPixelBlocks(total: number): PixelBlock[] {
  const rand = createSeededRandom(20260415);
  return Array.from({ length: total }, (_, id) => {
    const w = 6 + Math.floor(rand() * 18);
    const h = 6 + Math.floor(rand() * 18);
    return {
      id,
      x: Math.floor(rand() * 100),
      y: Math.floor(rand() * 100),
      w,
      h,
      delay: rand() * 0.85,
      duration: 1.05 + rand() * 1.15,
      rotate: Math.floor(rand() * 22) - 11,
    };
  });
}

export function CoreAiModuleSection({
  isAuthenticated,
  isCheckingAuth,
  onRequestLogin,
}: CoreAiModuleSectionProps) {
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showUnlockGlow, setShowUnlockGlow] = useState(false);
  const [showPixelReveal, setShowPixelReveal] = useState(false);
  const prevAuthRef = useRef(isAuthenticated);
  const pixelBlocks = useMemo(() => createPixelBlocks(140), []);
  const currentSlide = analyticsSlides[activeSlide];

  function goPrevSlide() {
    setActiveSlide((prev) => (prev - 1 + analyticsSlides.length) % analyticsSlides.length);
  }

  function goNextSlide() {
    setActiveSlide((prev) => (prev + 1) % analyticsSlides.length);
  }

  useEffect(() => {
    if (!prevAuthRef.current && isAuthenticated) {
      let glowTimer: number | undefined;
      let pixelTimer: number | undefined;
      const frame = window.requestAnimationFrame(() => {
        setShowUnlockGlow(true);
        setShowPixelReveal(true);

        glowTimer = window.setTimeout(() => setShowUnlockGlow(false), 1300);
        pixelTimer = window.setTimeout(() => setShowPixelReveal(false), 2300);
      });

      prevAuthRef.current = isAuthenticated;
      return () => {
        window.cancelAnimationFrame(frame);
        if (glowTimer !== undefined) {
          window.clearTimeout(glowTimer);
        }
        if (pixelTimer !== undefined) {
          window.clearTimeout(pixelTimer);
        }
      };
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  return (
    <section className="mx-auto w-full max-w-[1248px] px-4 py-5 md:px-8">
      <h2 className="text-center text-[36px] leading-[40px] font-bold text-[#f3f4f6]">
        Core AI Modules
      </h2>
      <p className="mx-auto mt-4 max-w-[720px] text-center text-[18px] leading-[28px] text-[#bdc1ca]">
        An integrated suite of AI-driven applications designed to automate and
        optimize every stage of your revenue cycle.
      </p>

      <div className="relative mt-4">
        <motion.div
          animate={
            isAuthenticated
              ? {
                filter: "blur(0px) saturate(1)",
                opacity: 1,
                scale: 1,
              }
              : {
                filter: "blur(5px) saturate(0.6)",
                opacity: 0.42,
                scale: 0.988,
              }
          }
          transition={{
            duration: isAuthenticated ? 1.15 : 0.62,
            ease: isAuthenticated ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "grid grid-cols-1 gap-4 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-4",
            !isAuthenticated && "pointer-events-none",
          )}
        >
          {coreFeatureItems.map((feature, index) => (
            <motion.article
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={cn(
                "flex flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300",
                feature.featured
                  ? "cursor-pointer border-cyan-400/45 bg-[#0d1a1f]/80 shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_12px_40px_rgba(34,211,238,0.12)] hover:border-cyan-400/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.28),0_16px_48px_rgba(34,211,238,0.16)]"
                  : "border-[#32374380] bg-[#171a1f66] hover:border-[#3d4454] hover:bg-[#1a1d24]/90",
              )}
              onClick={() => {
                if (feature.featured) {
                  setIsAnalyticsModalOpen(true);
                }
              }}
              onKeyDown={(e) => {
                if (!feature.featured) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsAnalyticsModalOpen(true);
                }
              }}
              tabIndex={feature.featured ? 0 : undefined}
              role={feature.featured ? "button" : undefined}
              aria-label={
                feature.featured
                  ? `${feature.title}, open analytics preview`
                  : undefined
              }
            >
              <div
                className={cn(
                  "mb-5 flex size-14 items-center justify-center rounded-xl",
                  feature.featured
                    ? "bg-cyan-400/15 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "bg-[#262a3380]",
                )}
              >
                <feature.icon
                  className={cn(
                    "size-6",
                    feature.featured ? "text-cyan-400" : "text-[#bca9ef]",
                  )}
                  aria-hidden
                />
              </div>
              <h3 className="text-lg font-semibold text-[#f3f4f6]">
                {feature.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#bdc1ca]">
                {feature.description}
              </p>
              {/* <span
                className={cn(
                  "mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-medium",
                  feature.featured
                    ? "bg-cyan-950/60 text-cyan-300 ring-1 ring-cyan-400/25"
                    : "bg-[#0f1116] text-[#9ca3af] ring-1 ring-[#32374399]",
                )}
              >
                {feature.badge}
              </span> */}
            </motion.article>
          ))}
        </motion.div>
        <AnimatePresence>
          {!isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className="absolute inset-0 grid place-items-center rounded-2xl bg-black/25"
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-[#323743] bg-[#11131a]/95 px-6 py-5 text-center shadow-xl"
              >
                <p className="text-sm text-[#bdc1ca]">
                  {isCheckingAuth
                    ? "Checking your session..."
                    : "Sign in to unlock Core AI Modules"}
                </p>
                <Button
                  type="button"
                  className="mt-4 bg-[#6941c6] hover:bg-[#5c36bc]"
                  onClick={onRequestLogin}
                  disabled={isCheckingAuth}
                >
                  Open login
                </Button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {isAuthenticated || showPixelReveal ? (
            <motion.div
              initial={false}
              animate={{ opacity: isAuthenticated && !showPixelReveal ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              {pixelBlocks.map((block) => (
                <motion.span
                  key={block.id}
                  initial={false}
                  animate={
                    isAuthenticated && showPixelReveal
                      ? {
                        opacity: 0,
                        scale: 0.15,
                        y: -6,
                        x: 6,
                        rotate: block.rotate,
                      }
                      : {
                        opacity: 0.42,
                        scale: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                      }
                  }
                  transition={{
                    delay: block.delay,
                    duration: block.duration,
                    ease: [0.2, 1, 0.25, 1],
                  }}
                  className="absolute rounded-[2px] border border-white/8 bg-[#0b0f15]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  style={{
                    left: `${block.x}%`,
                    top: `${block.y}%`,
                    width: `${block.w}px`,
                    height: `${block.h}px`,
                  }}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {showUnlockGlow ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-tr from-violet-500/10 via-cyan-400/8 to-emerald-300/10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute right-4 top-4 rounded-full border border-cyan-300/50 bg-cyan-400/20 px-3 py-1 text-xs font-medium text-cyan-100"
              >
                Unlocked
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAnalyticsModalOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Analytics AI details modal"
            onClick={() => setIsAnalyticsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-screen w-screen max-w-none flex-col overflow-hidden border border-[#32374366] bg-[#07090d] shadow-[0_25px_50px_rgba(0,0,0,0.35)] lg:h-svh"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-[#32374366] px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <BarChart3 className="size-4 text-[#7c4dff] sm:size-5" />
                    <h3 className="text-base font-bold tracking-[-0.02em] text-[#f3f4f6] sm:text-[28px] lg:text-[32px]">
                      Analytics AI
                    </h3>
                  </div>
                  <button
                    type="button"
                    aria-label="Close analytics modal"
                    className="rounded-md p-2 text-[#bdc1ca] hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    onClick={() => setIsAnalyticsModalOpen(false)}
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto border-b border-[#32374366] bg-black/40 px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6 [scrollbar-width:thin] [scrollbar-color:rgba(124,77,255,0.6)_rgba(255,255,255,0.06)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#7c4dff]/70 [&::-webkit-scrollbar-thumb:hover]:bg-[#8f65ff]/80">
                <div className="grid gap-3 sm:gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,400px)] lg:gap-5">
                  <div className="w-full">
                    <div className="h-[220px] overflow-hidden rounded-[18px] border border-[#32374399] bg-[#171a1f] shadow-[0_1px_2px_rgba(23,26,31,0.08)] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px]">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentSlide.id}
                          src={currentSlide.image}
                          alt={currentSlide.imageAlt}
                          initial={{ opacity: 0.4, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.35, scale: 0.99 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="h-full w-full object-contain"
                        />
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-1.5 sm:mt-4 sm:gap-2">
                      <button
                        type="button"
                        onClick={goPrevSlide}
                        aria-label="Previous analytics slide"
                        className="grid size-6 place-items-center rounded-md border border-[#32374399] bg-[#0f1116] text-[#bdc1ca] hover:text-white sm:size-8"
                      >
                        <ChevronLeft className="size-3.5 sm:size-4" />
                      </button>
                      {analyticsSlides.map((slide, idx) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          aria-label={`Go to analytics slide ${idx + 1}`}
                          className={cn(
                            "size-1.5 rounded-full bg-[#262a33] transition-all sm:size-2",
                            idx === activeSlide && "h-2 w-6 bg-[#6941c6]",
                          )}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={goNextSlide}
                        aria-label="Next analytics slide"
                        className="grid size-6 place-items-center rounded-md border border-[#32374399] bg-[#0f1116] text-[#bdc1ca] hover:text-white sm:size-8"
                      >
                        <ChevronRight className="size-3.5 sm:size-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0.35, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.25, y: -6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <h4 className="text-lg font-medium leading-[1.1] text-[#f3f4f6] sm:text-[26px] lg:text-[34px]">
                          {currentSlide.rightTitle}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#bdc1ca] sm:mt-3 sm:text-base lg:text-[16px]">
                          {currentSlide.rightDescription}
                        </p>
                        <div className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-4">
                          {currentSlide.stats.map((stat) => (
                            <div
                              key={`${currentSlide.id}-${stat.label}`}
                              className="rounded-xl border border-[#32374380] bg-[#171a1f] px-3 py-2.5 sm:rounded-2xl sm:px-5 sm:py-4"
                            >
                              <div className="flex items-center justify-between gap-2.5 sm:gap-4">
                                <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
                                  {stat.icon === "trend" ? (
                                    <TrendingUp className="size-4 text-[#f3f4f6] sm:size-5" />
                                  ) : null}
                                  {stat.icon === "activity" ? (
                                    <span className="grid size-8 place-items-center rounded-full bg-[#6941c61a] sm:size-10">
                                      <Activity className="size-4 text-[#6941c6] sm:size-5" />
                                    </span>
                                  ) : null}
                                  {stat.icon === "clock" ? (
                                    <span className="grid size-8 place-items-center rounded-full bg-[#32d5831a] sm:size-10">
                                      <Clock3 className="size-4 text-[#32d583] sm:size-5" />
                                    </span>
                                  ) : null}
                                  <p className="truncate text-sm text-[#bdc1ca] sm:text-base lg:text-[18px]">
                                    {stat.label}
                                  </p>
                                </div>
                                <p className="shrink-0 text-[22px] font-bold leading-none text-[#f3f4f6] sm:text-[28px] lg:text-[28px]">
                                  {stat.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-[#32374366] pt-3 text-[11px] leading-5 text-[#9ea3ad] sm:mt-5 sm:pt-5 sm:text-[11px]">
                          {currentSlide.integrationNote}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end bg-[#171a1f80] px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-4">
                <Button
                  variant="ghost"
                  className="h-8 px-3 text-xs text-[#bdc1ca] hover:bg-white/5 hover:text-[#f3f4f6] sm:h-10 sm:px-4 sm:text-sm"
                  onClick={() => setIsAnalyticsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
