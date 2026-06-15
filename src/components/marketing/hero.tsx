import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const BULLETS = [
  "Lose pounds of fat every week",
  "No membership or hidden fees! Everything you need is included",
  "Start for just $179, no insurance required + free shipping",
  "Free dietician visits & care coaching included*",
  "HSA/FSA Approved!",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Join 500,000+ MEDVi patients
          </span>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Finally serious about weight loss?{" "}
            <span className="text-emerald-600">So are we.</span>
          </h1>

          <p className="max-w-xl text-lg text-neutral-700 md:text-xl">
            Fat loss made easy with personalized care and GLP-1 medication.
          </p>

          <ul className="flex flex-col gap-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-base text-neutral-800">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link href="/questionnaire">
              <Button
                size="lg"
                className="h-14 bg-emerald-600 px-10 text-lg hover:bg-emerald-700"
              >
                Am I Qualified?
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-md justify-self-center rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-200 lg:max-w-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white/80 px-6 py-4 text-center shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Hero image</p>
              <p className="mt-1 text-sm text-neutral-700">
                Replace with patient or product photography
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
