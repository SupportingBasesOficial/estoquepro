import type { PermissionCode } from "../../../shared/types/permissions";
import type { PermissionRepository } from "./permission.repository";

export class PermissionService {
  constructor(private readonly permissions: PermissionRepository) {}

  async listPermissions() {
    return this.permissions.list();
  }

  async ensurePermissionExists(code: PermissionCode) {
    const permission = await this.permissions.findByCode(code);

    if (!permission) {
      throw new Error(`Permission does not exist: ${code}`);
    }

    return permission;
  }
}
