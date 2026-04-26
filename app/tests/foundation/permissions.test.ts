import { describe, expect, it } from "vitest";

import type { PermissionCode, RoleCode } from "../../src/shared/types/permissions";
import type { Permission } from "../../src/server/modules/permissions/permission.entity";
import type { Role } from "../../src/server/modules/roles/role.entity";
import type { RoleRepository } from "../../src/server/modules/roles/role.repository";
import { RoleService } from "../../src/server/modules/roles/role.service";
import { AuthorizationService } from "../../src/server/auth/authorization";

const roles: Record<RoleCode, Role> = {
  owner_admin: {
    id: "role-owner",
    code: "owner_admin",
    name: "Dono/Admin",
    description: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  },
  operator: {
    id: "role-operator",
    code: "operator",
    name: "Operador",
    description: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  },
  viewer: {
    id: "role-viewer",
    code: "viewer",
    name: "Visualizacao",
    description: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  }
};

function permission(code: PermissionCode): Permission {
  return {
    id: `permission-${code}`,
    code,
    name: code,
    description: null,
    createdAt: new Date("2026-01-01T00:00:00.000Z")
  };
}

class FakeRoleRepository implements RoleRepository {
  private readonly permissionsByRoleId = new Map<string, Permission[]>([
    [
      "role-operator",
      [
        permission("products.view"),
        permission("categories.view"),
        permission("suppliers.view"),
        permission("locations.view")
      ]
    ],
    [
      "role-viewer",
      [
        permission("products.view"),
        permission("categories.view"),
        permission("suppliers.view"),
        permission("locations.view")
      ]
    ],
    [
      "role-owner",
      [
        permission("products.view"),
        permission("products.create"),
        permission("products.update"),
        permission("products.deactivate")
      ]
    ]
  ]);

  async findByCode(code: RoleCode) {
    return roles[code] ?? null;
  }

  async findById(id: string) {
    return Object.values(roles).find((role) => role.id === id) ?? null;
  }

  async findPermissionsByRoleId(roleId: string) {
    return this.permissionsByRoleId.get(roleId) ?? [];
  }
}

describe("foundation permissions", () => {
  const roleService = new RoleService(new FakeRoleRepository());
  const authorization = new AuthorizationService(roleService);

  it("allows operator and viewer to view catalog entities", async () => {
    await expect(
      authorization.assertCan("role-operator", "products.view")
    ).resolves.toBeUndefined();
    await expect(
      authorization.assertCan("role-viewer", "categories.view")
    ).resolves.toBeUndefined();
    await expect(
      authorization.assertCan("role-viewer", "suppliers.view")
    ).resolves.toBeUndefined();
    await expect(
      authorization.assertCan("role-operator", "locations.view")
    ).resolves.toBeUndefined();
  });

  it("denies product write permissions to operator", async () => {
    await expect(
      authorization.assertCan("role-operator", "products.create")
    ).rejects.toThrow("Permission denied");
    await expect(
      authorization.assertCan("role-operator", "products.update")
    ).rejects.toThrow("Permission denied");
    await expect(
      authorization.assertCan("role-operator", "products.deactivate")
    ).rejects.toThrow("Permission denied");
  });

  it("denies product write permissions to viewer", async () => {
    await expect(
      authorization.assertCan("role-viewer", "products.create")
    ).rejects.toThrow("Permission denied");
    await expect(
      authorization.assertCan("role-viewer", "products.update")
    ).rejects.toThrow("Permission denied");
    await expect(
      authorization.assertCan("role-viewer", "products.deactivate")
    ).rejects.toThrow("Permission denied");
  });
});
