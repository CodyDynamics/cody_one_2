"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

export function CoreAiModuleSection({
  isAuthenticated,
  isCheckingAuth,
  onRequestLogin,
}: CoreAiModuleSectionProps) {
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showUnlockGlow, setShowUnlockGlow] = useState(false);
  const prevAuthRef = useRef(isAuthenticated);

  const analyticsSlides = [
    { src: "/images/image_1.jpeg", title: "Revenue Overview Dashboard" },
    { src: "/images/image_2.jpeg", title: "Denial Trend Insights" },
    { src: "/images/image_3.jpeg", title: "Payer Performance Analysis" },
    { src: "/images/image_4.jpeg", title: "Collections Forecast View" },
  ];

  const goPrev = () =>
    setActiveSlide(
      (prev) => (prev - 1 + analyticsSlides.length) % analyticsSlides.length,
    );
  const goNext = () =>
    setActiveSlide((prev) => (prev + 1) % analyticsSlides.length);

  useEffect(() => {
    if (!prevAuthRef.current && isAuthenticated) {
      setShowUnlockGlow(true);
      const timer = window.setTimeout(() => setShowUnlockGlow(false), 900);
      prevAuthRef.current = isAuthenticated;
      return () => window.clearTimeout(timer);
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  return (
    <section className="mx-auto w-full max-w-[1248px] px-4 py-20 md:px-8">
      <h2 className="text-center text-[36px] leading-[40px] font-bold text-[#f3f4f6]">
        Core AI Modules
      </h2>
      <p className="mx-auto mt-4 max-w-[720px] text-center text-[18px] leading-[28px] text-[#bdc1ca]">
        An integrated suite of AI-driven applications designed to automate and
        optimize every stage of your revenue cycle.
      </p>

      <div className="relative mt-12">
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
            duration: isAuthenticated ? 0.75 : 0.45,
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
              <span
                className={cn(
                  "mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-medium",
                  feature.featured
                    ? "bg-cyan-950/60 text-cyan-300 ring-1 ring-cyan-400/25"
                    : "bg-[#0f1116] text-[#9ca3af] ring-1 ring-[#32374399]",
                )}
              >
                {feature.badge}
              </span>
            </motion.article>
          ))}
        </motion.div>
        <AnimatePresence>
          {!isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 grid place-items-center rounded-2xl bg-black/25"
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
            className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Analytics AI carousel"
            onClick={() => setIsAnalyticsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-5xl overflow-hidden rounded-2xl border border-[#323743] bg-[#1e2128] shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-[#32374366] px-6 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-4xl font-bold tracking-[-0.02em]">
                      Analytics AI
                    </h3>
                    <p className="mt-2 text-sm text-[#bdc1ca]">
                      Deep insights and customizable dashboards for complete
                      revenue cycle visibility.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close analytics modal"
                    className="rounded-md p-2 text-[#bdc1ca] hover:bg-black/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    onClick={() => setIsAnalyticsModalOpen(false)}
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              <div className="border-b border-[#32374366] p-6">
                <div className="relative overflow-hidden rounded-xl border border-[#32374380]">
                  <Image
                    src={analyticsSlides[activeSlide].src}
                    alt={analyticsSlides[activeSlide].title}
                    width={1200}
                    height={640}
                    className="h-[340px] w-full object-cover md:h-[420px]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/50 to-transparent p-5">
                    <span className="inline-flex rounded-md bg-black/45 px-3 py-1 text-sm">
                      {analyticsSlides[activeSlide].title}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous slide"
                    className="rounded-md border border-[#323743] bg-black px-3 py-2 text-sm hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {analyticsSlides.map((slide, idx) => (
                      <button
                        key={slide.src}
                        type="button"
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                          activeSlide === idx
                            ? "w-6 bg-cyan-500"
                            : "w-2.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next slide"
                    className="rounded-md border border-[#323743] bg-black px-3 py-2 text-sm hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {analyticsSlides.map((slide, idx) => (
                    <button
                      type="button"
                      key={slide.src}
                      onClick={() => setActiveSlide(idx)}
                      className={`overflow-hidden rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                        activeSlide === idx
                          ? "border-cyan-500 shadow-[0_0_0_1px_rgba(6,182,212,0.45)]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={`${slide.title} thumbnail`}
                        width={280}
                        height={140}
                        className="h-[88px] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 px-6 py-5">
                <Button
                  variant="outline"
                  className="border-[#323743] bg-black text-[#f3f4f6] hover:bg-black/80"
                  onClick={() => setIsAnalyticsModalOpen(false)}
                >
                  Close
                </Button>
                <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                  Request Demo
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
