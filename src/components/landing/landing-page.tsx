"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  Building2,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Code2,
  X,
  FileText,
  HeartPulse,
  Network,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = ["Product", "Solutions", "Pricing", "Resources", "Company"];

const partnerItems = [
  { label: "MediCorp", icon: Building2 },
  { label: "HealthSystems", icon: HeartPulse },
  { label: "CarePartners", icon: Stethoscope },
  { label: "UnityHealth", icon: Network },
];

const featureItems = [
  {
    title: "Code AI",
    description: "Automated, accurate medical coding to reduce manual errors.",
    icon: Code2,
  },
  {
    title: "Prior AUTH AI",
    description:
      "Streamline authorizations and reduce delays in patient care.",
    icon: ShieldCheck,
  },
  {
    title: "Denial AI",
    description: "Predict and prevent denials before claims are submitted.",
    icon: TriangleAlert,
  },
  {
    title: "Posting AI",
    description: "Automated payment posting and reconciliation processes.",
    icon: FileText,
  },
  {
    title: "Analytics AI",
    description: "Deep insights and custom dashboards for complete revenue visibility.",
    icon: ChartColumn,
    featured: true,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function LandingPage() {
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const analyticsSlides = [
    {
      src: "/images/image_1.jpeg",
      title: "Revenue Overview Dashboard",
    },
    {
      src: "/images/image_2.jpeg",
      title: "Denial Trend Insights",
    },
    {
      src: "/images/image_3.jpeg",
      title: "Payer Performance Analysis",
    },
    {
      src: "/images/image_4.jpeg",
      title: "Collections Forecast View",
    },
  ];

  const goPrev = () =>
    setActiveSlide((prev) => (prev - 1 + analyticsSlides.length) % analyticsSlides.length);
  const goNext = () => setActiveSlide((prev) => (prev + 1) % analyticsSlides.length);

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
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" className="text-[#6941c6] hover:bg-transparent hover:text-[#7d56d9]">
              Request demo
            </Button>
            <Button className="bg-[#6941c6] hover:bg-[#5c36bc]">Get Started</Button>
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
              className="h-14 rounded-[16px] border-[#32374399] bg-transparent px-7 text-[18px] font-medium text-[#f3f4f6] hover:bg-white/5"
            >
              Request Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[560px] rounded-[40px] border border-[#32374380] bg-linear-to-br from-[#171a1f] to-[#262a33] p-3 shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        >
          <div className="rounded-[34px] border border-[#32374399] bg-[#171a1f66] p-4 backdrop-blur-xl md:p-5">
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

      <section className="mx-auto w-full max-w-[1248px] px-4 py-20 md:px-8">
        <h2 className="text-center text-[36px] leading-[40px] font-bold">Core AI Modules</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[18px] leading-[28px] text-[#bdc1ca]">
          An integrated suite of AI-driven applications designed to automate and
          optimize every stage of your revenue cycle.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {featureItems.map((feature, index) => (
            <motion.article
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -6, scale: 1.015 }}
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className={`rounded-3xl border p-6 ${
                feature.featured
                  ? "border-[#6941c666] bg-[#1f113b4d] shadow-[0_0_0_1px_rgba(105,65,198,0.25)]"
                  : "border-[#32374380] bg-[#171a1f66]"
              } cursor-pointer transition-all duration-300 hover:border-[#6941c64d] hover:bg-[#1a1d244d]`}
              onClick={() => {
                if (feature.featured) {
                  setIsAnalyticsModalOpen(true);
                }
              }}
            >
              <div
                className={`mb-6 flex size-14 items-center justify-center rounded-2xl ${
                  feature.featured ? "bg-[#6941c633]" : "bg-[#262a3380]"
                }`}
              >
                <feature.icon className="size-6 text-[#bca9ef]" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#bdc1ca]">{feature.description}</p>
              {feature.featured && (
                <button
                  type="button"
                  className="mt-5 text-sm font-medium text-[#6941c6] transition-colors hover:text-[#8f70da]"
                >
                  Explore Insights
                </button>
              )}
            </motion.article>
          ))}
        </div>
      </section>

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
                ["Code AI", "Prior AUTH AI", "Denial AI", "Posting AI", "Analytics AI"],
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
      {isAnalyticsModalOpen && (
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
                  <h3 className="text-4xl font-bold tracking-[-0.02em]">Analytics AI</h3>
                  <p className="mt-2 text-sm text-[#bdc1ca]">
                    Deep insights and customizable dashboards for complete revenue cycle visibility.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close analytics modal"
                  className="rounded-md p-2 text-[#bdc1ca] hover:bg-black/20 hover:text-white"
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
                  className="rounded-md border border-[#323743] bg-black px-3 py-2 text-sm hover:bg-black/70"
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
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlide === idx ? "w-6 bg-[#6941c6]" : "w-2.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-md border border-[#323743] bg-black px-3 py-2 text-sm hover:bg-black/70"
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
                    className={`overflow-hidden rounded-md border ${
                      activeSlide === idx
                        ? "border-[#6941c6] shadow-[0_0_0_1px_rgba(105,65,198,0.4)]"
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
                className="border-[#323743] bg-black text-[#f3f4f6]"
                onClick={() => setIsAnalyticsModalOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-[#6941c6] hover:bg-[#5c36bc]">Request Demo</Button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </main>
  );
}
