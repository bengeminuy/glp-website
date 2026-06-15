"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const LEFT_QUOTES = [
  "Very easy and convenient for a very busy working lady.",
  "Very nice and informative Dr. Quick and easy!",
  "The company, staff, and docs are amazing they take care of everything.",
];

const RIGHT_QUOTES = [
  "…the weight vanished!",
  "Every person I have contact with shows compassion.",
  "NP was very helpful and friendly!",
];

const VIDEOS = [
  { name: "Sarah M.", quote: "Lost 32 lbs in 4 months", tone: "from-emerald-100 to-emerald-300" },
  { name: "James T.", quote: "Energy is back!", tone: "from-emerald-200 to-emerald-400" },
  { name: "Lily K.", quote: "Pants size dropped twice", tone: "from-teal-100 to-teal-300" },
  { name: "Marcus R.", quote: "Off my insulin", tone: "from-emerald-100 to-teal-300" },
  { name: "Diane P.", quote: "Best decision ever", tone: "from-emerald-200 to-emerald-300" },
  { name: "Anita L.", quote: "Sleeping better than ever", tone: "from-teal-200 to-emerald-300" },
  { name: "Brad N.", quote: "Down 4 sizes", tone: "from-emerald-300 to-emerald-500" },
  { name: "Emily R.", quote: "Confidence is back", tone: "from-teal-100 to-emerald-200" },
];

function VerifiedBadge({ muted = false }: { muted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          muted ? "bg-neutral-300" : "bg-emerald-600"
        }`}
      >
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
      </span>
      <span className={muted ? "text-neutral-400" : "text-neutral-700"}>
        Verified MEDVi Customer
      </span>
    </span>
  );
}

function BottleShape() {
  return (
    <svg
      viewBox="0 0 220 290"
      className="h-full w-full drop-shadow-xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="65" y="0" width="90" height="28" rx="6" fill="#5a8d7b" />
      <rect x="78" y="26" width="64" height="12" fill="#8aae9e" />
      <path
        d="M 40 38 C 18 42 12 62 12 82 L 12 254 C 12 274 28 285 46 285 L 174 285 C 192 285 208 274 208 254 L 208 82 C 208 62 202 42 180 38 Z"
        fill="#3f6b5c"
      />
      <rect x="22" y="112" width="176" height="96" rx="3" fill="#cce4d8" opacity="0.95" />
      <text
        x="110"
        y="140"
        fill="#3f6b5c"
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="sans-serif"
        letterSpacing="2"
      >
        PRESCRIPTION
      </text>
      <text
        x="110"
        y="172"
        fill="#3f6b5c"
        fontSize="28"
        fontWeight="800"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        GLP
      </text>
      <text
        x="110"
        y="196"
        fill="#3f6b5c"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="sans-serif"
        letterSpacing="1.5"
      >
        MEDICATION
      </text>
      <text
        x="110"
        y="252"
        fill="#ffffff"
        fontSize="8"
        textAnchor="middle"
        fontFamily="sans-serif"
        letterSpacing="1.5"
        opacity="0.8"
      >
        RX ONLY
      </text>
      <text
        x="110"
        y="265"
        fill="#ffffff"
        fontSize="8"
        textAnchor="middle"
        fontFamily="sans-serif"
        opacity="0.8"
      >
        Dose Varies
      </text>
    </svg>
  );
}

export function TestimonialSpotlight() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    const update = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      setProgress((sectionCenter - wh / 2) / wh);
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

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-4 md:grid-cols-2 md:gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:whitespace-nowrap md:text-3xl">
            The results speak for themselves.
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm text-neutral-600 md:text-base">
              Sometimes you have to see it to believe it. GLP-1 medication can be{" "}
              <strong className="font-bold text-emerald-600">life-changing</strong> and improves
              mood, sleep, energy and longevity. Photos, testimonials and results are from MEDVi
              patients.
            </p>
            <Link href="/questionnaire">
              <Button className="h-12 rounded-full bg-neutral-900 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg">
                I&apos;m Ready, Let&apos;s Go
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="group relative mt-16 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {[...VIDEOS, ...VIDEOS].map((video, i) => (
            <article
              key={`${video.name}-${i}`}
              className="group/card relative aspect-[9/16] w-44 flex-shrink-0 overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03] sm:w-48"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${video.tone}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover/card:scale-110">
                  <Play className="h-5 w-5 translate-x-0.5 fill-neutral-900 text-neutral-900" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-semibold text-white">{video.name}</p>
                <p className="text-xs text-white/85">{video.quote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-600">10,000+ Patients Agree</p>
          <div className="mt-3 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            &ldquo;When nothing else worked,{" "}
            <span className="text-emerald-600">MEDVi did</span>&rdquo;
          </h2>
          <div className="mt-4 flex justify-center">
            <VerifiedBadge />
          </div>
        </div>

        <div ref={parallaxRef} className="relative mt-12 min-h-[560px]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[38%] flex-col justify-around gap-12 text-right lg:flex"
            style={{ transform: `translateY(${progress * -90}px)` }}
          >
            {LEFT_QUOTES.map((quote, i) => (
              <div key={i} className="flex flex-col items-end gap-2">
                <p className="text-xl font-bold leading-snug text-neutral-300">{quote}</p>
                <VerifiedBadge muted />
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[38%] flex-col justify-around gap-12 text-left lg:flex"
            style={{ transform: `translateY(${progress * -130}px)` }}
          >
            {RIGHT_QUOTES.map((quote, i) => (
              <div key={i} className="flex flex-col items-start gap-2">
                <p className="text-xl font-bold leading-snug text-neutral-300">{quote}</p>
                <VerifiedBadge muted />
              </div>
            ))}
          </div>

          <div
            className="relative z-30 mx-auto h-[480px] w-[300px] sm:h-[560px] sm:w-[340px]"
            style={{ transform: `translateY(${progress * 220}px) rotate(-6deg)` }}
          >
            <BottleShape />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 lg:hidden">
          {[...LEFT_QUOTES, ...RIGHT_QUOTES].map((quote, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center">
              <p className="text-base font-semibold leading-snug text-neutral-400">{quote}</p>
              <VerifiedBadge muted />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-600">
              <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
            </span>
            HSA/FSA Eligible
          </div>
        </div>
      </div>
    </section>
  );
}
