export const ROLE_CODES = ["owner_admin", "operator", "viewer"] as const;

export type RoleCode = (typeof ROLE_CODES)[number];

export const PERMISSION_CODES = [
  "users.manage",
  "roles.view",
  "permissions.view",
  "products.create",
  "products.update",
  "products.view",
  "products.deactivate",
  "categories.manage",
  "categories.view",
  "suppliers.manage",
  "suppliers.view",
  "locations.manage",
  "locations.view",
  "audit.view"
] as const;

export type PermissionCode = (typeof PERMISSION_CODES)[number];

export const CATALOG_VIEW_PERMISSION_CODES = [
  "products.view",
  "categories.view",
  "suppliers.view",
  "locations.view"
] as const satisfies readonly PermissionCode[];

export function isPermissionCode(value: string): value is PermissionCode {
  return PERMISSION_CODES.includes(value as PermissionCode);
}

export function assertPermissionCode(value: string): PermissionCode {
  if (!isPermissionCode(value)) {
    throw new Error(`Invalid permission code: ${value}`);
  }

  return value;
}
