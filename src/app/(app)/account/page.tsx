import { db } from "@/lib/db";
import { order, questionnaireSubmission } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireUser } from "@/lib/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await requireUser();
  const userId = session.user.id;

  const [orders, intakes] = await Promise.all([
    db.select().from(order).where(eq(order.userId, userId)).orderBy(desc(order.createdAt)),
    db
      .select({
        id: questionnaireSubmission.id,
        status: questionnaireSubmission.status,
        submittedAt: questionnaireSubmission.submittedAt,
        updatedAt: questionnaireSubmission.updatedAt,
      })
      .from(questionnaireSubmission)
      .where(eq(questionnaireSubmission.userId, userId))
      .orderBy(desc(questionnaireSubmission.updatedAt)),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Your account</h1>

      <Card>
        <CardHeader>
          <CardTitle>Intake</CardTitle>
        </CardHeader>
        <CardContent>
          {intakes.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600">
                You haven&apos;t started your questionnaire yet.
              </p>
              <Link href="/questionnaire">
                <Button>Start questionnaire</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-2 text-sm">
              {intakes.map((i) => (
                <li key={i.id} className="flex items-center justify-between">
                  <span className="capitalize">{i.status}</span>
                  <span className="text-neutral-500">
                    {(i.submittedAt ?? i.updatedAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-neutral-600">No orders yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {orders.map((o) => (
                <li key={o.id} className="flex items-center justify-between">
                  <span className="capitalize">{o.status}</span>
                  <span>${(o.totalCents / 100).toFixed(2)}</span>
                  <span className="text-neutral-500">{o.createdAt.toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
