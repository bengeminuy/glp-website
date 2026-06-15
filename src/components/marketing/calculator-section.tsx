import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WeightLossCalculator } from "./weight-loss-calculator";

export function CalculatorSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Want to <span className="text-emerald-600">reach your goal</span> weight fast?
          </h2>
          <p className="text-base text-neutral-600 md:text-lg">
            It&apos;s not magic—it&apos;s{" "}
            <strong className="font-bold text-emerald-600">metabolic science</strong>. GLP-1 is a
            naturally occurring hormone that regulates appetite and blood sugar,{" "}
            <strong className="font-bold text-emerald-600">improving your metabolism</strong> and
            knocking out cravings.
          </p>
          <Link href="/questionnaire">
            <Button className="h-12 rounded-full bg-neutral-900 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg">
              Get Started
            </Button>
          </Link>
        </div>
        <WeightLossCalculator />
      </div>
    </section>
  );
}
