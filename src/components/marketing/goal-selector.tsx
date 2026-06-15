"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GOALS = [
  "Losing 1-20 lbs",
  "Losing 21-50 lbs",
  "Losing 51+ lbs",
  "Not sure, I just want to lose the weight",
];

export function GoalSelector() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    const params = new URLSearchParams({ goal: selected });
    router.push(`/questionnaire?${params.toString()}`);
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-stone-100 p-8 md:p-12 lg:p-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            What&apos;s your weight loss goal?
          </h2>

          <div className="mt-10 grid gap-4" role="radiogroup" aria-label="Weight loss goal">
            {GOALS.map((goal) => {
              const isSelected = selected === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelected(goal)}
                  className={`cursor-pointer rounded-2xl bg-white px-6 py-5 text-left text-base font-semibold transition-all duration-200 ${
                    isSelected
                      ? "text-emerald-900 ring-2 ring-emerald-500"
                      : "text-neutral-900 ring-1 ring-neutral-200 hover:ring-neutral-300 hover:shadow-sm"
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="mt-8 h-14 w-full cursor-pointer rounded-full bg-neutral-900 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
          >
            Continue
          </Button>
        </div>

        <p className="mt-6 text-center text-sm italic text-neutral-600">
          *Free to end users subject to insurance and copays eligibility to be determined at time of
          visit.
        </p>
      </div>
    </section>
  );
}
