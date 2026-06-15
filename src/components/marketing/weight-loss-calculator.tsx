"use client";

import { useId, useState } from "react";

const MIN_WEIGHT = 120;
const MAX_WEIGHT = 400;
const DEFAULT_WEIGHT = 237;
const PROJECTED_LOSS_PCT = 0.2;
const GOLD = "#c5a572";
const TRACK = "#e5e5e5";

export function WeightLossCalculator() {
  const sliderId = useId();
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const projectedLoss = Math.round(weight * PROJECTED_LOSS_PCT);
  const sliderProgress = ((weight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT)) * 100;

  return (
    <div className="rounded-3xl bg-neutral-50 p-8 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-neutral-700 md:text-base">
          Select your current weight:
        </p>
        <p className="text-4xl font-bold tabular-nums text-neutral-900 md:text-5xl">
          {weight}
          <span className="ml-1.5 align-baseline text-base font-medium text-neutral-500 md:text-lg">
            lbs
          </span>
        </p>
      </div>

      <div className="mt-8">
        <label htmlFor={sliderId} className="sr-only">
          Current weight in pounds
        </label>
        <input
          id={sliderId}
          type="range"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          step={1}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          aria-valuetext={`${weight} pounds`}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#c5a572] [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#c5a572] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
          style={{
            background: `linear-gradient(to right, ${GOLD} 0%, ${GOLD} ${sliderProgress}%, ${TRACK} ${sliderProgress}%, ${TRACK} 100%)`,
          }}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-neutral-700 md:text-base">Weight you could lose:</p>
        <p className="text-4xl font-bold tabular-nums text-neutral-900 md:text-5xl">
          {projectedLoss}
          <span className="ml-1.5 align-baseline text-base font-medium text-neutral-500 md:text-lg">
            lbs
          </span>
        </p>
      </div>
    </div>
  );
}
