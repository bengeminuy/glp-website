const MESSAGE = "FATLOSS25! Only $179 + Fast, Free Shipping";

export function PromoBanner() {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="overflow-hidden border-b border-emerald-700 bg-emerald-600 text-white">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-2 text-sm font-medium">
        {items.map((i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2">
            <span aria-hidden>★</span>
            {MESSAGE}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
