import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {/* TODO: brand name */}
          GLP Health
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="text-neutral-700 hover:text-neutral-900">
            Products
          </Link>
          <Link href="/login" className="text-neutral-700 hover:text-neutral-900">
            Log in
          </Link>
          <Link
            href="/questionnaire"
            className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Get Approved
          </Link>
        </nav>
      </div>
    </header>
  );
}
