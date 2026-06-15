"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className }: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors",
              selected
                ? "border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900"
                : "border-neutral-300 hover:bg-neutral-50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-neutral-900"
            />
            <span className="text-neutral-900">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
