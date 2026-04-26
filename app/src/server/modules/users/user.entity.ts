import type { EntityStatus } from "../../../shared/types/status";

export type User = {
  id: string;
  name: string;
  email: string;
  emailNormalized: string;
  passwordHash: string;
  roleId: string;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  email_normalized: string;
  password_hash: string;
  role_id: string;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
  roleId: string;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function toUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailNormalized: row.email_normalized,
    passwordHash: row.password_hash,
    roleId: row.role_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
