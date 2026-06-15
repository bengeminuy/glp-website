export function SupportSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-stone-100 p-8 md:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <h3 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Unlimited 24/7 support{" "}
                <span className="text-emerald-600">included.</span>
              </h3>
              <p className="text-base text-neutral-700 md:text-lg">
                MEDVi provides 24/7 access to a dedicated team of specialists, ensuring you have
                the support you need{" "}
                <strong className="font-bold text-emerald-600">around the clock</strong>. With
                unlimited appointments, messaging and support, you can confidently reach out for
                guidance, ask questions, or address concerns at any time.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div
                aria-hidden
                className="aspect-[3/4] w-1/2 max-w-[280px] rounded-2xl bg-gradient-to-br from-stone-200 to-stone-400 shadow-md"
              />
              <div
                aria-hidden
                className="aspect-[3/4] w-1/2 max-w-[280px] translate-y-4 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-300 shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
