import type { EntityStatus } from "../../../shared/types/status";
import type { RoleRepository } from "../roles/role.repository";
import { normalizeEmail, type CreateUserInput } from "./user.entity";
import type { UserRepository } from "./user.repository";

export type AdminAuditRecorder = {
  recordAdminLog(input: {
    userId: string | null;
    action: string;
    entity: string;
    entityId: string | null;
    summary?: string | null;
    payload?: Record<string, unknown> | null;
  }): Promise<void>;
};

export class UserService {
  constructor(
    private readonly users: UserRepository,
    private readonly roles: RoleRepository,
    private readonly audit: AdminAuditRecorder
  ) {}

  async createUser(input: CreateUserInput, actorUserId: string | null) {
    if (!input.name.trim()) {
      throw new Error("User name is required");
    }

    if (!input.email.trim()) {
      throw new Error("User email is required");
    }

    const role = await this.roles.findById(input.roleId);

    if (!role) {
      throw new Error(`Role does not exist: ${input.roleId}`);
    }

    const existingUser = await this.users.findByEmailNormalized(
      normalizeEmail(input.email)
    );

    if (existingUser) {
      throw new Error("User email already exists");
    }

    const user = await this.users.create(input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "users.create",
      entity: "users",
      entityId: user.id,
      summary: `User created: ${user.emailNormalized}`,
      payload: { roleId: user.roleId, status: user.status }
    });

    return user;
  }

  async getUserById(id: string) {
    return this.users.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.users.findByEmailNormalized(normalizeEmail(email));
  }

  async getActiveUserByEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user || user.status !== "active") {
      return null;
    }

    return user;
  }

  async deactivateUser(id: string, actorUserId: string | null) {
    const user = await this.updateStatus(id, "inactive");

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "users.deactivate",
      entity: "users",
      entityId: user.id,
      summary: `User deactivated: ${user.emailNormalized}`,
      payload: { status: user.status }
    });

    return user;
  }

  private async updateStatus(id: string, status: EntityStatus) {
    return this.users.updateStatus(id, status);
  }
}
