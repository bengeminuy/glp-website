import Link from "next/link";
import { requireUser } from "@/lib/rbac";
import { SignOutButton } from "@/components/app/sign-out-button";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/account" className="text-lg font-semibold tracking-tight">
            GLP Health
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/questionnaire" className="text-neutral-700 hover:text-neutral-900">
              Questionnaire
            </Link>
            <Link href="/account" className="text-neutral-700 hover:text-neutral-900">
              Account
            </Link>
            <span className="text-neutral-500">{session.user.email}</span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
