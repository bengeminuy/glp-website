import Link from "next/link";
import { requireAdmin } from "@/lib/rbac";
import { SignOutButton } from "@/components/app/sign-out-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-900 bg-neutral-900 text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/admin" className="text-lg font-semibold tracking-tight">
            GLP Health · Admin
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/admin" className="text-neutral-300 hover:text-white">
              Overview
            </Link>
            <Link href="/admin/products" className="text-neutral-300 hover:text-white">
              Products
            </Link>
            <Link href="/admin/orders" className="text-neutral-300 hover:text-white">
              Orders
            </Link>
            <Link href="/admin/intakes" className="text-neutral-300 hover:text-white">
              Intakes
            </Link>
            <span className="text-neutral-400">{session.user.email}</span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
