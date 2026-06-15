import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-10 w-full appearance-none rounded-md border border-neutral-300 bg-white bg-no-repeat px-3 py-2 pr-9 text-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Caret SVG embedded as background image so the field has the same styling as Input.
      "bg-[length:1rem_1rem] bg-[position:right_0.75rem_center]",
      "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
