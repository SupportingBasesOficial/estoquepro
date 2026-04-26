import { describe, expect, it } from "vitest";

import type { EntityStatus } from "../../src/shared/types/status";
import type { Role } from "../../src/server/modules/roles/role.entity";
import type { RoleRepository } from "../../src/server/modules/roles/role.repository";
import { normalizeEmail, type CreateUserInput, type User } from "../../src/server/modules/users/user.entity";
import type { AdminAuditRecorder } from "../../src/server/modules/users/user.service";
import { UserService } from "../../src/server/modules/users/user.service";
import type { UserRepository } from "../../src/server/modules/users/user.repository";

class FakeUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async create(input: CreateUserInput) {
    const id = `user-${this.users.size + 1}`;
    const user: User = {
      id,
      name: input.name,
      email: input.email,
      emailNormalized: normalizeEmail(input.email),
      passwordHash: input.passwordHash,
      roleId: input.roleId,
      status: "active",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z")
    };

    this.users.set(user.id, user);
    return user;
  }

  async findById(id: string) {
    return this.users.get(id) ?? null;
  }

  async findByEmailNormalized(emailNormalized: string) {
    const normalized = normalizeEmail(emailNormalized);
    return (
      [...this.users.values()].find(
        (user) => user.emailNormalized === normalized
      ) ?? null
    );
  }

  async updateStatus(id: string, status: EntityStatus) {
    const user = this.users.get(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = { ...user, status };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  setUser(user: User) {
    this.users.set(user.id, user);
  }
}

class FakeRoleRepository implements RoleRepository {
  async findByCode() {
    return null;
  }

  async findById(id: string) {
    if (id !== "role-owner") {
      return null;
    }

    return {
      id: "role-owner",
      code: "owner_admin",
      name: "Dono/Admin",
      description: null,
      status: "active",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z")
    } satisfies Role;
  }

  async findPermissionsByRoleId() {
    return [];
  }
}

class FakeAuditRecorder implements AdminAuditRecorder {
  public records: unknown[] = [];

  async recordAdminLog(input: {
    userId: string | null;
    action: string;
    entity: string;
    entityId: string | null;
    summary?: string | null;
    payload?: Record<string, unknown> | null;
  }) {
    this.records.push(input);
  }
}

describe("foundation users", () => {
  it("normalizes email for user lookup", async () => {
    const repository = new FakeUserRepository();
    const audit = new FakeAuditRecorder();
    const service = new UserService(repository, new FakeRoleRepository(), audit);

    const createdUser = await service.createUser(
      {
        name: "Admin",
        email: " Admin@Example.COM ",
        passwordHash: "hash",
        roleId: "role-owner"
      },
      "actor-1"
    );

    const foundUser = await service.getUserByEmail("admin@example.com");

    expect(foundUser?.id).toBe(createdUser.id);
    expect(createdUser.emailNormalized).toBe("admin@example.com");
    expect(audit.records).toHaveLength(1);
  });

  it("does not authenticate inactive users", async () => {
    const repository = new FakeUserRepository();
    const service = new UserService(
      repository,
      new FakeRoleRepository(),
      new FakeAuditRecorder()
    );
    repository.setUser({
      id: "user-inactive",
      name: "Inactive User",
      email: "inactive@example.com",
      emailNormalized: "inactive@example.com",
      passwordHash: "hash",
      roleId: "role-owner",
      status: "inactive",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z")
    });

    await expect(
      service.getActiveUserByEmail("inactive@example.com")
    ).resolves.toBeNull();
  });

  it("requires a valid role when creating a user", async () => {
    const service = new UserService(
      new FakeUserRepository(),
      new FakeRoleRepository(),
      new FakeAuditRecorder()
    );

    await expect(
      service.createUser(
        {
          name: "Operator",
          email: "operator@example.com",
          passwordHash: "hash",
          roleId: "missing-role"
        },
        "actor-1"
      )
    ).rejects.toThrow("Role does not exist");
  });
});
