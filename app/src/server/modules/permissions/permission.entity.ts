import type { PermissionCode } from "../../../shared/types/permissions";

export type Permission = {
  id: string;
  code: PermissionCode;
  name: string;
  description: string | null;
  createdAt: Date;
};

export type PermissionRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  created_at: Date;
};

export function toPermission(row: PermissionRow): Permission {
  return {
    id: row.id,
    code: row.code as PermissionCode,
    name: row.name,
    description: row.description,
    createdAt: row.created_at
  };
}
