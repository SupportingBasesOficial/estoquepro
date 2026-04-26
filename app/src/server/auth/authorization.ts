import type { PermissionCode } from "../../shared/types/permissions";

export type PermissionChecker = {
  roleHasPermission(roleId: string, permissionCode: PermissionCode): Promise<boolean>;
};

export class AuthorizationService {
  constructor(private readonly permissionChecker: PermissionChecker) {}

  async can(roleId: string, permissionCode: PermissionCode) {
    return this.permissionChecker.roleHasPermission(roleId, permissionCode);
  }

  async assertCan(roleId: string, permissionCode: PermissionCode) {
    const isAllowed = await this.can(roleId, permissionCode);

    if (!isAllowed) {
      throw new Error(`Permission denied: ${permissionCode}`);
    }
  }
}
