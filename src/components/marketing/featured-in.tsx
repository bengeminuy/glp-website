const OUTLETS = [
  "Headline",
  "WebMD",
  "FORTUNE",
  "Fast Company",
  "The New York Times",
  "Bloomberg",
  "Forbes",
  "Healthline",
  "Yahoo",
  "USA Today",
  "Business Insider",
  "NBC",
];

export function FeaturedIn() {
  return (
    <section className="bg-white py-12">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
        <p className="relative bg-white px-6 text-center text-sm italic text-neutral-500">
          Proud To Be Featured And Advertised In
        </p>
      </div>

      <div
        className="group relative mt-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {[...OUTLETS, ...OUTLETS].map((outlet, i) => (
            <div
              key={`${outlet}-${i}`}
              className="flex-shrink-0 font-serif text-3xl font-bold text-neutral-800"
            >
              {outlet}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 h-px bg-neutral-200" />
    </section>
  );
}
