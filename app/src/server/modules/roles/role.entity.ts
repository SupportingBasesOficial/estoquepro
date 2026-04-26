import type { RoleCode } from "../../../shared/types/permissions";
import type { EntityStatus } from "../../../shared/types/status";
import type { Permission } from "../permissions/permission.entity";

export type Role = {
  id: string;
  code: RoleCode;
  name: string;
  description: string | null;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleWithPermissions = Role & {
  permissions: Permission[];
};

export type RoleRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export function toRole(row: RoleRow): Role {
  return {
    id: row.id,
    code: row.code as RoleCode,
    name: row.name,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
