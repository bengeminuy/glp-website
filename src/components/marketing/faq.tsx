"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How much does the program cost?",
    a: "The MEDVi Semaglutide program starts at $179 for your first month with no contract. This cost covers your physician review, full personalized plan, 1:1 guidance, metabolic report, and the cost of the prescription medication shipped right to your door. Refills are locked in at $299 and include all the same program benefits.",
  },
  {
    q: "Will this work for me?",
    a: "Our providers will explore prescribing compounded GLP-1 medications for you, if appropriate - with effective, GLP-1 ingredients. Compounded medication can provide incredible results for you, using active GLP-1 ingredients that help you reach your goals.",
  },
  {
    q: "What if my insurance doesn't cover the medication?",
    a: "While all MEDVi prescriptions are cash-pay, your insurance may reimburse you for branded options. We keep compounded medications fairly priced so no insurance is necessary while still working toward your goal weight.",
  },
  {
    q: "What can I expect after I sign up?",
    a: "After you complete your online visit, our medical providers will review your answers and determine whether treatment may be right for you. If appropriate, you will be prescribed medication which will be shipped right from the pharmacy to your door.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
        open ? "border-emerald-300 bg-emerald-50/40" : "border-neutral-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-neutral-900"
      >
        <span>{q}</span>
        <Plus
          className={`h-5 w-5 flex-shrink-0 text-emerald-600 transition-transform duration-300 ease-out ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-relaxed text-neutral-700">{a}</div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
