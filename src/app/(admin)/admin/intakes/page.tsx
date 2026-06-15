import { db } from "@/lib/db";
import { questionnaireSubmission, user } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export default async function AdminIntakesPage() {
  const session = await requireAdmin();

  const rows = await db
    .select({
      id: questionnaireSubmission.id,
      status: questionnaireSubmission.status,
      submittedAt: questionnaireSubmission.submittedAt,
      userEmail: user.email,
      userName: user.name,
    })
    .from(questionnaireSubmission)
    .leftJoin(user, eq(questionnaireSubmission.userId, user.id))
    .orderBy(desc(questionnaireSubmission.submittedAt));

  // Listing intake records is auditable in itself (PHI access).
  await logAudit({
    actorUserId: session.user.id,
    action: "intake.viewed",
    entity: "intake",
    entityId: null,
    metadata: { count: rows.length },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Intakes</h1>
      <p className="text-sm text-neutral-500">
        Encrypted answers are decrypted on-demand only when an individual record is opened.
        Each access is recorded in the audit log.
      </p>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-neutral-500">
                  No intake submissions yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3">
                    {r.submittedAt ? r.submittedAt.toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r.userName} <span className="text-neutral-500">({r.userEmail})</span>
                  </td>
                  <td className="px-4 py-3 capitalize">{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
