import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [p] = await db.select().from(product).where(eq(product.slug, slug)).limit(1);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{p.name}</h1>
      <p className="mt-2 text-lg text-neutral-600">${(p.priceCents / 100).toFixed(2)}</p>
      <p className="mt-6 text-neutral-700">{p.description}</p>

      <div className="mt-8">
        {/* Ordering requires completed intake — checkout enforces that. */}
        <Link href="/checkout">
          <Button size="lg">Continue to checkout</Button>
        </Link>
      </div>
    </div>
  );
}
