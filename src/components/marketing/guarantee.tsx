import Link from "next/link";

function GuaranteeCheckIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="h-48 w-48 md:h-56 md:w-56"
      aria-hidden
    >
      <defs>
        <linearGradient id="medvi-guarantee-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#medvi-guarantee-gradient)"
        strokeWidth="5"
      />
      <path
        d="M30 52 L44 66 L70 38"
        stroke="url(#medvi-guarantee-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Guarantee() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-orange-50 p-8 md:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="flex justify-center lg:justify-start">
              <GuaranteeCheckIcon />
            </div>
            <div className="flex flex-col items-start gap-5">
              <p className="text-sm font-semibold tracking-wide text-amber-600 md:text-base">
                MEDVi Guarantee
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                The only thing you&apos;ll lose is extra weight.
              </h2>
              <p className="text-base text-neutral-700 md:text-lg">
                With over 500,000+ patients, we&apos;re confident you will reach your goal with our
                personalized program.
              </p>
              <Link href="/questionnaire" className="mt-2">
                <button
                  type="button"
                  className="h-12 cursor-pointer rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Continue with confidence
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
