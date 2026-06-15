"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Get approved",
    body: "Complete a quick online evaluation to determine if GLP-1 medication is right for you. Our team of licensed professionals will review your information and provide approval in no time.",
    tone: "from-stone-100 to-stone-300",
  },
  {
    title: "Get prescribed",
    body: "Once approved, you'll receive personalized care and a prescription to support your weight loss and health goals. Your care plan is designed to help you achieve lasting results safely and effectively.",
    tone: "from-emerald-100 to-emerald-200",
  },
  {
    title: "Receive your Rx",
    body: "Your medication will be shipped directly to your door for maximum convenience. With MEDVi, starting your treatment is as simple as opening your package and following our easy-to-use instructions.",
    tone: "from-amber-100 to-stone-200",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [thresholds, setThresholds] = useState<number[]>([]);

  useEffect(() => {
    let rafId: number | null = null;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const total = rect.height + wh;
      const scrolled = wh - rect.top;
      const raw = scrolled / total;
      const adjusted = (raw - 0.25) / 0.55;
      setProgress(Math.max(0, Math.min(1, adjusted)));
    };
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const compute = () => {
      const wrapper = timelineRef.current;
      if (!wrapper) return;
      const lineSpan = wrapper.offsetHeight - 24;
      if (lineSpan <= 0) return;
      const dots = dotRefs.current;
      if (dots.length < STEPS.length) return;
      if (dots.some((d) => !d || d.offsetHeight === 0)) return;
      const wrapperRect = wrapper.getBoundingClientRect();
      const next = dots.map((dot) => {
        const dotRect = dot!.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2 - wrapperRect.top;
        return Math.max(0, Math.min(1, (dotCenter - 12) / lineSpan));
      });
      setThresholds(next);
    };

    const rafId = requestAnimationFrame(() => requestAnimationFrame(compute));
    const observer = new ResizeObserver(compute);
    if (timelineRef.current) observer.observe(timelineRef.current);
    dotRefs.current.forEach((dot) => {
      if (dot) observer.observe(dot);
    });
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Begin your weight loss journey with MEDVi.
            </h2>
            <p className="text-base text-neutral-600 md:text-lg">
              Start your transformation today with MEDVi&apos;s easy, personalized process for
              accessing GLP-1 medications. Designed with your convenience in mind, our
              streamlined approach ensures you&apos;re supported{" "}
              <strong className="font-bold text-emerald-600">every step of the way</strong>, from
              approval to receiving your prescription.
            </p>
            <Link href="/questionnaire">
              <Button className="h-12 rounded-full bg-neutral-900 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          <div ref={timelineRef} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-3 bottom-3 hidden w-0.5 bg-neutral-200 lg:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-3 bottom-3 hidden w-0.5 origin-top bg-emerald-600 lg:block"
              style={{ transform: `scaleY(${progress})` }}
            />

            <ol className="flex flex-col gap-20">
              {STEPS.map((step, i) => {
                const threshold = thresholds[i];
                const filled = threshold !== undefined && progress >= threshold;
                return (
                  <li key={step.title} className="relative">
                    <span
                      aria-hidden
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className="absolute top-3 z-10 hidden h-3 w-3 lg:block"
                      style={{ left: "-45px" }}
                    >
                      <span
                        className={`absolute -inset-[10px] rounded-full bg-lime-100 transition-opacity duration-300 ${
                          filled ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`relative block h-3 w-3 rounded-full transition-colors duration-300 ${
                          filled ? "bg-emerald-700" : "bg-neutral-300"
                        }`}
                      />
                    </span>
                    <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base text-neutral-600 md:text-lg">{step.body}</p>
                    <div
                      aria-hidden
                      className={`mt-6 aspect-[16/10] rounded-3xl bg-gradient-to-br ${step.tone} shadow-sm`}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

      </div>
    </section>
  );
}
