"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  accent?: string;
  tail?: string;
  label: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { value: 18, accent: "%", label: "Average weight loss" },
  { value: 9, accent: "/", tail: "10", label: "Patients call it the most effective treatment to date." },
  { value: 6.5, tail: '"', label: "Potential waist reduction", decimals: 1 },
  { value: 93, accent: "%", label: "Kept the weight off" },
];

const DURATION_MS = 1800;

function useCountUp(target: number, start: boolean, decimals = 0) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);
  return decimals ? current.toFixed(decimals) : Math.round(current).toString();
}

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const display = useCountUp(stat.value, start, stat.decimals);
  return (
    <div className="flex flex-col items-center rounded-3xl bg-[#eef1da] p-8 text-center md:p-10">
      <p className="text-5xl font-bold tabular-nums text-neutral-900 md:text-6xl">
        {display}
        {stat.accent && <span className="text-emerald-600">{stat.accent}</span>}
        {stat.tail && <span>{stat.tail}</span>}
      </p>
      <p className="mt-6 text-sm font-bold text-neutral-800">{stat.label}</p>
    </div>
  );
}

export function AnimatedStats() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Why are so many patients signing up for MEDVi?{" "}
            <span className="text-emerald-600">It works.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">
            On average, patients in the MEDVi program lose 15-20% of their body weight.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
