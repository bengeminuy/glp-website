import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await db.select().from(product).where(eq(product.active, true));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Products</h1>

      {products.length === 0 ? (
        <p className="text-neutral-500">
          {/* TODO: replace with real product copy once seeded */}
          No products yet. Seed product data via the admin dashboard.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>${(p.priceCents / 100).toFixed(2)}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-neutral-600">{p.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
