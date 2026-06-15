"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  value: string;
  label: string;
  // When checked, clears all other options. When any non-exclusive option is
  // checked, this is cleared. Use for "None of the above" / "I prefer not to say".
  exclusive?: boolean;
}

export type CheckboxColumns = 1 | 2 | 3;

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  // Number of columns for regular (non-exclusive) options. Exclusive options
  // always render full-width below the grid.
  columns?: CheckboxColumns;
}

const columnsClass: Record<CheckboxColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function CheckboxGroup({
  options,
  value,
  onChange,
  className,
  columns = 1,
}: CheckboxGroupProps) {
  const exclusiveValues = React.useMemo(
    () => new Set(options.filter((o) => o.exclusive).map((o) => o.value)),
    [options],
  );

  const regularOptions = options.filter((o) => !o.exclusive);
  const exclusiveOptions = options.filter((o) => o.exclusive);

  function toggle(v: string) {
    const isChecked = value.includes(v);
    if (isChecked) {
      onChange(value.filter((x) => x !== v));
      return;
    }
    if (exclusiveValues.has(v)) {
      onChange([v]);
      return;
    }
    onChange([...value.filter((x) => !exclusiveValues.has(x)), v]);
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className={cn("grid gap-2", columnsClass[columns])}>
        {regularOptions.map((opt) => (
          <CheckboxItem
            key={opt.value}
            option={opt}
            selected={value.includes(opt.value)}
            onToggle={() => toggle(opt.value)}
          />
        ))}
      </div>

      {exclusiveOptions.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-neutral-200 pt-3">
          {exclusiveOptions.map((opt) => (
            <CheckboxItem
              key={opt.value}
              option={opt}
              selected={value.includes(opt.value)}
              onToggle={() => toggle(opt.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CheckboxItem({
  option,
  selected,
  onToggle,
}: {
  option: CheckboxOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "flex h-full cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm transition-colors",
        selected
          ? "border-emerald-500 ring-2 ring-emerald-500"
          : "border-neutral-300 hover:bg-neutral-50",
      )}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
      />
      <span className="text-neutral-900">{option.label}</span>
    </label>
  );
}
