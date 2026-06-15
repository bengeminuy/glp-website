import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MetabolismCta() {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-stone-100 p-8 md:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex items-center justify-center gap-4">
              <div
                aria-hidden
                className="aspect-[3/4] w-1/2 max-w-[280px] rounded-2xl bg-gradient-to-br from-stone-200 to-stone-400 shadow-md"
              />
              <div
                aria-hidden
                className="aspect-[3/4] w-1/2 max-w-[280px] translate-y-4 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-400 shadow-md"
              />
            </div>

            <div className="flex flex-col items-start gap-6">
              <h3 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                We will fix your broken metabolism.
              </h3>
              <p className="text-base text-neutral-700 md:text-lg">
                Traditional diets don&apos;t work because nearly 70% of weight is{" "}
                <strong className="font-bold text-emerald-600">genetically determined</strong>. With
                medication, you will work{" "}
                <strong className="font-bold text-emerald-600">with your body</strong> rather than
                against it — to reach your goal weight and keep it that way.
              </p>
              <Link href="/questionnaire">
                <Button className="h-12 rounded-full bg-neutral-900 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
