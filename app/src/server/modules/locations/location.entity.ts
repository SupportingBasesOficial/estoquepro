import type { EntityStatus } from "../../../shared/types/status";

export type InternalLocation = {
  id: string;
  name: string;
  description: string | null;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type InternalLocationRow = {
  id: string;
  name: string;
  description: string | null;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateLocationInput = {
  name: string;
  description?: string | null;
};

export type UpdateLocationInput = Partial<CreateLocationInput>;

export function toInternalLocation(row: InternalLocationRow): InternalLocation {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
