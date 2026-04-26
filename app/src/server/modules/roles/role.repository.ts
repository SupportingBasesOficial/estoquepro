import { db } from "../../db";
import type { PermissionCode, RoleCode } from "../../../shared/types/permissions";
import { toPermission, type Permission, type PermissionRow } from "../permissions/permission.entity";
import { toRole, type Role, type RoleRow } from "./role.entity";

export type RoleRepository = {
  findByCode(code: RoleCode): Promise<Role | null>;
  findById(id: string): Promise<Role | null>;
  findPermissionsByRoleId(roleId: string): Promise<Permission[]>;
};

export class PgRoleRepository implements RoleRepository {
  async findByCode(code: RoleCode) {
    const result = await db.query<RoleRow>(
      "select * from roles where code = $1 limit 1",
      [code]
    );

    return result.rows[0] ? toRole(result.rows[0]) : null;
  }

  async findById(id: string) {
    const result = await db.query<RoleRow>(
      "select * from roles where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toRole(result.rows[0]) : null;
  }

  async findPermissionsByRoleId(roleId: string) {
    const result = await db.query<PermissionRow>(
      `select permissions.*
       from permissions
       join role_permissions on role_permissions.permission_id = permissions.id
       where role_permissions.role_id = $1
       order by permissions.code`,
      [roleId]
    );

    return result.rows.map(toPermission);
  }
}

export function hasPermissionCode(
  permissions: Permission[],
  permissionCode: PermissionCode
) {
  return permissions.some((permission) => permission.code === permissionCode);
}
