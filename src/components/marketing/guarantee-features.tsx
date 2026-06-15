import { BadgeCheck, Truck, Stethoscope, CircleDollarSign } from "lucide-react";

const FEATURES = [
  { icon: BadgeCheck, label: "MEDVi guarantee" },
  { icon: Truck, label: "Free, expedited delivery" },
  { icon: Stethoscope, label: "Doctor-led plans & coaching" },
  { icon: CircleDollarSign, label: "No hidden fees" },
];

export function GuaranteeFeatures() {
  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-4 px-6 py-6"
          >
            <Icon
              className="h-8 w-8 flex-shrink-0 text-neutral-900"
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="text-sm font-medium text-neutral-800 md:text-base">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
