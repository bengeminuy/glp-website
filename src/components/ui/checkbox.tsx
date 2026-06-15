"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function CheckboxGroup({ options, value, onChange, className }: CheckboxGroupProps) {
  function toggle(v: string) {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {options.map((opt) => {
        const selected = value.includes(opt.value);
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
              type="checkbox"
              checked={selected}
              onChange={() => toggle(opt.value)}
              className="h-4 w-4 accent-neutral-900"
            />
            <span className="text-neutral-900">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
