import { db } from "../../db";
import {
  toAdminLog,
  type AdminLog,
  type AdminLogRow,
  type CreateAdminLogInput
} from "./audit-log.entity";

export type AuditLogRepository = {
  create(input: CreateAdminLogInput): Promise<AdminLog>;
  listByEntity(entity: string, entityId?: string): Promise<AdminLog[]>;
  listByUser(userId: string): Promise<AdminLog[]>;
  listRecent(limit?: number): Promise<AdminLog[]>;
};

export class PgAuditLogRepository implements AuditLogRepository {
  async create(input: CreateAdminLogInput) {
    const result = await db.query<AdminLogRow>(
      `insert into admin_logs (user_id, action, entity, entity_id, summary, payload)
       values ($1, $2, $3, $4, $5, $6)
       returning *`,
      [
        input.userId,
        input.action,
        input.entity,
        input.entityId,
        input.summary ?? null,
        input.payload ?? null
      ]
    );

    return toAdminLog(result.rows[0]);
  }

  async listByEntity(entity: string, entityId?: string) {
    const result = await db.query<AdminLogRow>(
      `select *
       from admin_logs
       where entity = $1 and ($2::uuid is null or entity_id = $2::uuid)
       order by occurred_at desc`,
      [entity, entityId ?? null]
    );

    return result.rows.map(toAdminLog);
  }

  async listByUser(userId: string) {
    const result = await db.query<AdminLogRow>(
      `select *
       from admin_logs
       where user_id = $1
       order by occurred_at desc`,
      [userId]
    );

    return result.rows.map(toAdminLog);
  }

  async listRecent(limit = 50) {
    const result = await db.query<AdminLogRow>(
      `select *
       from admin_logs
       order by occurred_at desc
       limit $1`,
      [limit]
    );

    return result.rows.map(toAdminLog);
  }
}
