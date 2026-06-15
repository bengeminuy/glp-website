import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Billy",
    quote:
      "Ms. Gonzalez was great! She listened to my needs and provided details of the meds and any issues that rise.",
  },
  {
    name: "Terika",
    quote:
      "The provider was knowledgeable and helpful. She answered all my questions and made me feel as if this was not our first time meeting. I was very comfortable and enjoyed our conversation.",
  },
  {
    name: "Jamie",
    quote:
      "The questions are to the point and easy to navigate. I'm able to voice my concerns if needed and ask questions of MEDVi. They are quick to respond and keep me updated on my prescription.",
  },
  {
    name: "Jacqueline",
    quote:
      "My experience is very positive. I am doing very well. Slowly and surely reaching my goals with MEDVis help. They have been very attentive and have provided me with all the resources to be successful. I can't ask for more. Thank you",
  },
  {
    name: "Diana",
    quote:
      "The staff has been so friendly and caring. I didn't expect that! If I call, I get an immediate answer from a real person!",
  },
  {
    name: "Donna",
    quote:
      "The Physician was very knowledgeable and ready to answer all my concerns. She even told me about future checkups that will be needed throughout my journey.",
  },
  {
    name: "Terri",
    quote:
      "Losing weight without a crazy diet, without cardio...it just felt like magic. I was a snacker, but not anymore. I feel so much better.",
  },
  {
    name: "Alexandra",
    quote:
      "Everything was quick and concise. I was treated professionally and given the opportunity to ask questions and have my questions answered thoroughly.",
  },
  {
    name: "Greg",
    quote:
      "I was ready to give up. Wow. I would pay 10x as much if I had to. Dieting days are over. Thanks to the guys at medvi for the metabolic fix - game changer.",
  },
  {
    name: "Lou-Ann",
    quote:
      "MEDVi Doctors & Staff have been very professional and prompt with any questions I have and their support & care. I feel in great hands! I'm 13lbs away from goal...Thank you!",
  },
  {
    name: "Elizabeth",
    quote:
      "My Clinician was kind, informative, gave a clear understanding of expectations, what was needed and future follow ups and doasge changes. Very easy to understand and helpful.",
  },
  {
    name: "Dan",
    quote:
      "Dolores was very knowledgeable and very friendly she answered any questions I had. Very excited for my weight loss journey to begin",
  },
];

type RowItem =
  | { kind: "quote"; t: Testimonial; accent?: boolean }
  | { kind: "photo"; tone: string };

const ROWS: RowItem[][] = [
  [
    { kind: "quote", t: TESTIMONIALS[0], accent: true },
    { kind: "quote", t: TESTIMONIALS[2], accent: true },
    { kind: "photo", tone: "from-stone-300 via-stone-400 to-stone-500" },
    { kind: "quote", t: TESTIMONIALS[3], accent: true },
    { kind: "quote", t: TESTIMONIALS[4], accent: true },
    { kind: "photo", tone: "from-emerald-200 to-emerald-400" },
  ],
  [
    { kind: "photo", tone: "from-stone-200 to-stone-400" },
    { kind: "quote", t: TESTIMONIALS[7], accent: true },
    { kind: "quote", t: TESTIMONIALS[8] },
    { kind: "photo", tone: "from-amber-100 to-rose-200" },
    { kind: "quote", t: TESTIMONIALS[5], accent: true },
    { kind: "quote", t: TESTIMONIALS[9], accent: true },
  ],
  [
    { kind: "quote", t: TESTIMONIALS[1], accent: true },
    { kind: "photo", tone: "from-emerald-100 to-stone-300" },
    { kind: "quote", t: TESTIMONIALS[6], accent: true },
    { kind: "quote", t: TESTIMONIALS[10] },
    { kind: "photo", tone: "from-rose-200 to-stone-400" },
    { kind: "quote", t: TESTIMONIALS[11], accent: true },
  ],
];

function Initial({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
      {name.charAt(0)}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" aria-hidden />
      ))}
    </div>
  );
}

function QuoteCard({ t, accent }: { t: Testimonial; accent?: boolean }) {
  return (
    <figure
      className={`flex w-[360px] flex-shrink-0 flex-col gap-4 rounded-3xl p-6 sm:w-[400px] ${
        accent ? "bg-[#eef1da]" : "bg-stone-50 ring-1 ring-stone-100"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Initial name={t.name} />
          <figcaption className="font-semibold text-neutral-900">{t.name}</figcaption>
        </div>
        <Stars />
      </div>
      <blockquote className="text-sm text-neutral-700">&ldquo;{t.quote}&rdquo;</blockquote>
    </figure>
  );
}

function PhotoTile({ tone }: { tone: string }) {
  return (
    <div
      aria-hidden
      className={`w-[300px] flex-shrink-0 rounded-3xl bg-gradient-to-br shadow-sm sm:w-[340px] ${tone}`}
    />
  );
}

const ROW_DURATIONS = ["75s", "95s", "80s"];

export function TestimonialsGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 md:text-sm">
            Those who chose MEDVi
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            There&apos;s a reason people are{" "}
            <span className="text-emerald-600">raving about us.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 md:text-lg">
            Join the multitude of people who have trusted MEDVi to help change their lives,
            achieving significant,{" "}
            <strong className="font-bold text-emerald-600">lasting weight loss</strong>.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-6">
        {ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="group relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <div
              className="flex w-max animate-marquee items-stretch gap-6 pr-6 group-hover:[animation-play-state:paused]"
              style={{
                animationDuration: ROW_DURATIONS[rowIdx],
                animationDirection: rowIdx % 2 === 1 ? "reverse" : "normal",
              }}
            >
              {[...row, ...row].map((item, i) =>
                item.kind === "quote" ? (
                  <QuoteCard key={i} t={item.t} accent={item.accent} />
                ) : (
                  <PhotoTile key={i} tone={item.tone} />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
