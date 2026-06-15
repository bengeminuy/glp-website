import { db } from "@/lib/db";
import { user, order, questionnaireSubmission, product } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { StatCard } from "@/components/admin/stat-card";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [[users], [orders], [intakes], [products]] = await Promise.all([
    db.select({ n: count() }).from(user),
    db.select({ n: count() }).from(order),
    db
      .select({ n: count() })
      .from(questionnaireSubmission)
      .where(eq(questionnaireSubmission.status, "submitted")),
    db.select({ n: count() }).from(product),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users" value={users.n} />
        <StatCard label="Orders" value={orders.n} />
        <StatCard label="Pending intakes" value={intakes.n} />
        <StatCard label="Products" value={products.n} />
      </div>
    </div>
  );
}
