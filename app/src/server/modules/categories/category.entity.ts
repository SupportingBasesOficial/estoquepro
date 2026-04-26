import type { EntityStatus } from "../../../shared/types/status";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryRow = {
  id: string;
  name: string;
  description: string | null;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export function toCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
