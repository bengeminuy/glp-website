"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
};

const PRODUCTS: Product[] = [
  {
    name: "GLP-1 Injections",
    description: "One simple injection per week.",
    price: "Starting at $179",
    highlight: true,
  },
  {
    name: "GLP-1 Tablets",
    description: "One dissolvable tablet per day.",
    price: "Starting at $149",
  },
  {
    name: "Wegovy® Pill",
    description: "One pill per day.",
    price: "$99 Membership + Medication Cost",
  },
  {
    name: "Wegovy® Injection",
    description: "Availability is subject to change.",
    price: "$99 Membership + Medication Cost",
  },
  {
    name: "Zepbound® Injection",
    description: "Availability is subject to change.",
    price: "$99 Membership + Medication Cost",
  },
];

const LOOP = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

function BottleShape() {
  return (
    <svg
      viewBox="0 0 220 290"
      className="h-full w-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="65" y="0" width="90" height="28" rx="6" fill="#8fbfa9" />
      <rect x="78" y="26" width="64" height="12" fill="#9fcab6" />
      <path
        d="M 40 38 C 18 42 12 62 12 82 L 12 254 C 12 274 28 285 46 285 L 174 285 C 192 285 208 274 208 254 L 208 82 C 208 62 202 42 180 38 Z"
        fill="#b2d7c4"
      />
      <rect x="22" y="112" width="176" height="96" rx="3" fill="#9ec9b4" opacity="0.6" />
      <rect x="40" y="134" width="140" height="4" rx="2" fill="#ffffff" opacity="0.65" />
      <rect x="40" y="184" width="140" height="4" rx="2" fill="#ffffff" opacity="0.65" />
    </svg>
  );
}

export function ProductsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const wrapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getMetrics = () => {
    const el = scrollerRef.current;
    if (!el) return null;
    const card = el.querySelector<HTMLElement>("[data-product-card]");
    if (!card) return null;
    const stride = card.offsetWidth + 24;
    const copyWidth = stride * PRODUCTS.length;
    return { el, stride, copyWidth };
  };

  useEffect(() => {
    const metrics = getMetrics();
    if (!metrics) return;
    metrics.el.scrollLeft = metrics.copyWidth;
    targetRef.current = metrics.copyWidth;
  }, []);

  const handleScroll = () => {
    if (wrapTimeoutRef.current) clearTimeout(wrapTimeoutRef.current);
    wrapTimeoutRef.current = setTimeout(() => {
      const metrics = getMetrics();
      if (!metrics) return;
      const { el, copyWidth } = metrics;
      if (el.scrollLeft >= copyWidth * 2) {
        el.scrollLeft -= copyWidth;
      } else if (el.scrollLeft < copyWidth) {
        el.scrollLeft += copyWidth;
      }
      targetRef.current = el.scrollLeft;
    }, 150);
  };

  const step = (direction: "left" | "right") => {
    const metrics = getMetrics();
    if (!metrics) return;
    const { el, stride, copyWidth } = metrics;

    let next = targetRef.current + (direction === "right" ? stride : -stride);

    if (next >= copyWidth * 2) {
      next -= copyWidth;
      el.scrollLeft -= copyWidth;
    } else if (next < copyWidth) {
      next += copyWidth;
      el.scrollLeft += copyWidth;
    }

    targetRef.current = next;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-4 md:grid-cols-2 md:gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:whitespace-nowrap md:text-3xl">
            Trusted by experts,{" "}
            <span className="text-emerald-600">priced for you.</span>
          </h2>
          <p className="text-sm text-neutral-600 md:text-base">
            Find the right GLP-1 medication with the confidence that comes from knowing it&apos;s{" "}
            <strong className="font-bold text-emerald-600">doctor-approved</strong> and budget-friendly.
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto px-6 pb-4 pt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          {LOOP.map((product, i) => (
            <article
              key={`${product.name}-${i}`}
              data-product-card
              className="relative flex w-[300px] flex-shrink-0 flex-col"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-8 left-1/2 z-10 h-[290px] w-[220px] -translate-x-1/2"
              >
                <BottleShape />
              </div>
              <div className="grid h-[500px] grid-rows-2 overflow-hidden rounded-3xl bg-neutral-50">
                <div className="bg-emerald-50/70" />
                <div className="flex flex-col items-center justify-between px-6 pb-6 pt-10 text-center">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-emerald-600">{product.price}</p>
                    <h3 className="mt-2 text-2xl font-bold text-neutral-900">{product.name}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
                  </div>
                  <Link href="/questionnaire" className="w-full">
                    <Button className="h-12 w-full rounded-full bg-neutral-900 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step("left")}
          aria-label="Scroll left"
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition hover:bg-neutral-50 hover:text-emerald-600 md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => step("right")}
          aria-label="Scroll right"
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition hover:bg-neutral-50 hover:text-emerald-600 md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
