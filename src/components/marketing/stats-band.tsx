import { Check } from "lucide-react";

const STATS = [
  "6x more weight loss than exercise and diet alone",
  "Lose an average of 18% of your body weight",
  "93% kept the weight off for good",
];

const COLLAGE = [
  // Column 1: short on top, tall on bottom
  [
    { tone: "bg-gradient-to-br from-emerald-100 to-emerald-200", aspect: "aspect-[5/4]" },
    { tone: "bg-gradient-to-br from-stone-300 to-stone-400", aspect: "aspect-[4/5]" },
  ],
  // Column 2: tall on top, short on bottom
  [
    { tone: "bg-gradient-to-br from-amber-100 to-stone-200", aspect: "aspect-[4/5]" },
    { tone: "bg-gradient-to-br from-emerald-200 to-emerald-300", aspect: "aspect-[5/4]" },
  ],
  // Column 3: one tall portrait
  [
    { tone: "bg-gradient-to-br from-stone-200 to-neutral-300", aspect: "aspect-[3/5]" },
  ],
  // Column 4: tall on top, short on bottom
  [
    { tone: "bg-gradient-to-br from-rose-100 to-stone-200", aspect: "aspect-[4/5]" },
    { tone: "bg-gradient-to-br from-neutral-200 to-stone-300", aspect: "aspect-[5/4]" },
  ],
];

export function StatsBand() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            The change we&apos;ve all been waiting for
          </h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">
            Join the over{" "}
            <strong className="font-bold text-emerald-600">500,000+</strong> MEDVi patients and
            we&apos;ll help you finally get real, lasting results.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 items-stretch gap-4 sm:grid-cols-4">
          {COLLAGE.map((column, c) => (
            <div key={c} className="flex flex-col gap-4">
              {column.map((tile, i) => (
                <div
                  key={i}
                  className={`${column.length === 1 ? "flex-1" : tile.aspect} ${tile.tone} rounded-3xl`}
                  aria-hidden
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STATS.map((text) => (
            <div key={text} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#c5a572" }}
              >
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
              </span>
              <p className="text-sm font-bold text-neutral-800 md:text-base">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          ** Data based on MEDVi patients over their first 6 months of treatment
        </p>
      </div>
    </section>
  );
}
