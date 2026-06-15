import { db, schema } from "@/lib/db";

export type AuditAction =
  | "user.signup"
  | "user.login"
  | "user.logout"
  | "user.role_changed"
  | "intake.created"
  | "intake.updated"
  | "intake.submitted"
  | "intake.viewed"
  | "intake.reviewed"
  | "order.created"
  | "order.paid"
  | "order.cancelled"
  | "product.created"
  | "product.updated"
  | "product.deleted";

export type AuditEntity = "user" | "intake" | "order" | "product";

export interface AuditEntry {
  actorUserId: string | null;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string | null;
  // metadata MUST NOT contain PHI. IDs, statuses, action verbs only.
  metadata?: Record<string, unknown>;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  await db.insert(schema.auditLog).values({
    actorUserId: entry.actorUserId,
    action: entry.action,
    entity: entry.entity,
    entityId: entry.entityId,
    metadata: entry.metadata ?? null,
  });
}
