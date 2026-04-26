import type { PermissionCode, RoleCode } from "../../../shared/types/permissions";
import type { RoleRepository } from "./role.repository";

export class RoleService {
  constructor(private readonly roles: RoleRepository) {}

  async getRoleByCode(code: RoleCode) {
    const role = await this.roles.findByCode(code);

    if (!role) {
      throw new Error(`Role does not exist: ${code}`);
    }

    return role;
  }

  async getRolePermissions(roleId: string) {
    return this.roles.findPermissionsByRoleId(roleId);
  }

  async roleHasPermission(roleId: string, permissionCode: PermissionCode) {
    const permissions = await this.roles.findPermissionsByRoleId(roleId);
    return permissions.some((permission) => permission.code === permissionCode);
  }
}
