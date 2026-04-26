export type AdminLog = {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  occurredAt: Date;
  summary: string | null;
  payload: Record<string, unknown> | null;
};

export type CreateAdminLogInput = {
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  summary?: string | null;
  payload?: Record<string, unknown> | null;
};

export type AdminLogRow = {
  id: string;
  user_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  occurred_at: Date;
  summary: string | null;
  payload: Record<string, unknown> | null;
};

export function toAdminLog(row: AdminLogRow): AdminLog {
  return {
    id: row.id,
    userId: row.user_id,
    action: row.action,
    entity: row.entity,
    entityId: row.entity_id,
    occurredAt: row.occurred_at,
    summary: row.summary,
    payload: row.payload
  };
}
