"use client";

import * as React from "react";
import { Check, Droplet, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Named icons render as SVGs sized by the parent bubble via [&>svg]:h-N classes.
// Unknown strings render as literal text (e.g. "♂"/"♀" Unicode glyphs).
const iconRegistry: Record<string, React.ReactNode> = {
  check: <Check strokeWidth={3} />,
  x: <X strokeWidth={3} />,
  droplet: <Droplet fill="currentColor" strokeWidth={0} />,
  heart: <Heart fill="currentColor" strokeWidth={0} />,
};

export interface RadioOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
  iconClassName?: string;
  sublabelClassName?: string;
}

export type RadioVariant = "list" | "tiles";

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: RadioVariant;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
  variant = "list",
}: RadioGroupProps) {
  if (variant === "tiles") {
    return (
      <div className={cn("grid grid-cols-2 gap-3", className)} role="radiogroup">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border bg-white px-6 py-8 transition-colors",
                selected
                  ? "border-emerald-500 ring-2 ring-emerald-500"
                  : "border-neutral-300 hover:bg-neutral-50",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.icon && (
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full text-2xl font-semibold [&>svg]:h-7 [&>svg]:w-7",
                    opt.iconClassName ?? "bg-neutral-100 text-neutral-700",
                  )}
                  aria-hidden
                >
                  {iconRegistry[opt.icon] ?? opt.icon}
                </span>
              )}
              <span className="text-sm font-medium text-neutral-900">{opt.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  const anyIcons = options.some((o) => !!o.icon);

  return (
    <div className={cn("flex flex-col gap-2", className)} role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.value;
        if (anyIcons) {
          return (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-md border bg-white px-4 py-3 transition-colors",
                selected
                  ? "border-emerald-500 ring-2 ring-emerald-500"
                  : "border-neutral-300 hover:bg-neutral-50",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.icon && (
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full [&>svg]:h-5 [&>svg]:w-5",
                    opt.iconClassName ?? "bg-neutral-100 text-neutral-700",
                  )}
                  aria-hidden
                >
                  {iconRegistry[opt.icon] ?? opt.icon}
                </span>
              )}
              <div className="flex flex-col">
                <span className="text-base font-medium text-neutral-900">{opt.label}</span>
                {opt.sublabel && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      opt.sublabelClassName ?? "text-neutral-600",
                    )}
                  >
                    {opt.sublabel}
                  </span>
                )}
              </div>
            </label>
          );
        }

        return (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors",
              selected
                ? "border-emerald-500 ring-2 ring-emerald-500"
                : "border-neutral-300 hover:bg-neutral-50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-emerald-600"
            />
            <span className="text-neutral-900">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
