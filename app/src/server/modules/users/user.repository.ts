import { db } from "../../db";
import type { EntityStatus } from "../../../shared/types/status";
import { normalizeEmail, toUser, type CreateUserInput, type User, type UserRow } from "./user.entity";

export type UserRepository = {
  create(input: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmailNormalized(emailNormalized: string): Promise<User | null>;
  updateStatus(id: string, status: EntityStatus): Promise<User>;
};

export class PgUserRepository implements UserRepository {
  async create(input: CreateUserInput) {
    const result = await db.query<UserRow>(
      `insert into users (name, email, password_hash, role_id)
       values ($1, $2, $3, $4)
       returning *`,
      [input.name, input.email, input.passwordHash, input.roleId]
    );

    return toUser(result.rows[0]);
  }

  async findById(id: string) {
    const result = await db.query<UserRow>(
      "select * from users where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toUser(result.rows[0]) : null;
  }

  async findByEmailNormalized(emailNormalized: string) {
    const result = await db.query<UserRow>(
      "select * from users where email_normalized = $1 limit 1",
      [normalizeEmail(emailNormalized)]
    );

    return result.rows[0] ? toUser(result.rows[0]) : null;
  }

  async updateStatus(id: string, status: EntityStatus) {
    const result = await db.query<UserRow>(
      `update users
       set status = $2, updated_at = now()
       where id = $1
       returning *`,
      [id, status]
    );

    if (!result.rows[0]) {
      throw new Error(`User not found: ${id}`);
    }

    return toUser(result.rows[0]);
  }
}
