"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { questionnaireSubmission } from "@/lib/db/schema";
import { requireUser } from "@/lib/rbac";
import { encryptJson } from "@/lib/crypto";
import { logAudit } from "@/lib/audit";
import { revalidatePath } from "next/cache";

// Answers are validated client-side against the question registry. On the
// server they are treated as an opaque PHI blob: parsed only to confirm shape,
// then immediately encrypted before hitting the database.
export const IntakeAnswersSchema = z.record(z.unknown());
export type IntakeAnswers = z.infer<typeof IntakeAnswersSchema>;

type IntakeStatus = "submitted" | "requires_review";

// Surfaces borderline cases for clinician review. Real eligibility rules
// land when the full question list is wired up — this is a placeholder so
// the status column exercises both branches end-to-end.
function triageAnswers(answers: IntakeAnswers): IntakeStatus {
  const conditions = answers["conditions"];
  if (Array.isArray(conditions)) {
    const flags = ["thyroid_history", "pancreatitis", "pregnant_or_nursing"];
    if (conditions.some((c) => flags.includes(String(c)))) return "requires_review";
  }
  return "submitted";
}

export async function submitIntake(rawAnswers: unknown) {
  const session = await requireUser();
  const parsed = IntakeAnswersSchema.parse(rawAnswers);
  const status = triageAnswers(parsed);

  const ciphertext = encryptJson(parsed);

  const [row] = await db
    .insert(questionnaireSubmission)
    .values({
      userId: session.user.id,
      status,
      answersEncrypted: ciphertext,
      submittedAt: new Date(),
    })
    .returning({ id: questionnaireSubmission.id });

  await logAudit({
    actorUserId: session.user.id,
    action: "intake.submitted",
    entity: "intake",
    entityId: row.id,
    metadata: { status },
  });

  revalidatePath("/account");
  return { id: row.id, status };
}
