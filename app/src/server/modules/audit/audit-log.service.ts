import type { CreateAdminLogInput } from "./audit-log.entity";
import type { AuditLogRepository } from "./audit-log.repository";

export type AuditRecorder = {
  recordAdminLog(input: CreateAdminLogInput): Promise<void>;
};

export class AuditLogService implements AuditRecorder {
  constructor(private readonly auditLogs: AuditLogRepository) {}

  async recordAdminLog(input: CreateAdminLogInput) {
    if (!input.action.trim()) {
      throw new Error("Audit action is required");
    }

    if (!input.entity.trim()) {
      throw new Error("Audit entity is required");
    }

    await this.auditLogs.create(input);
  }
}
