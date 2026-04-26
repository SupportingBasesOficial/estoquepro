import { db } from "../../db";
import type { EntityStatus } from "../../../shared/types/status";
import {
  toCategory,
  type Category,
  type CategoryRow,
  type CreateCategoryInput,
  type UpdateCategoryInput
} from "./category.entity";

export type CategoryRepository = {
  create(input: CreateCategoryInput): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  listActive(): Promise<Category[]>;
  update(id: string, input: UpdateCategoryInput): Promise<Category>;
  updateStatus(id: string, status: EntityStatus): Promise<Category>;
};

export class PgCategoryRepository implements CategoryRepository {
  async create(input: CreateCategoryInput) {
    const result = await db.query<CategoryRow>(
      `insert into categories (name, description)
       values ($1, $2)
       returning *`,
      [input.name, input.description ?? null]
    );

    return toCategory(result.rows[0]);
  }

  async findById(id: string) {
    const result = await db.query<CategoryRow>(
      "select * from categories where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toCategory(result.rows[0]) : null;
  }

  async listActive() {
    const result = await db.query<CategoryRow>(
      "select * from categories where status = 'active' order by name"
    );

    return result.rows.map(toCategory);
  }

  async update(id: string, input: UpdateCategoryInput) {
    const result = await db.query<CategoryRow>(
      `update categories
       set
         name = coalesce($2, name),
         description = coalesce($3, description),
         updated_at = now()
       where id = $1
       returning *`,
      [id, input.name ?? null, input.description ?? null]
    );

    if (!result.rows[0]) {
      throw new Error(`Category not found: ${id}`);
    }

    return toCategory(result.rows[0]);
  }

  async updateStatus(id: string, status: EntityStatus) {
    const result = await db.query<CategoryRow>(
      `update categories
       set status = $2, updated_at = now()
       where id = $1
       returning *`,
      [id, status]
    );

    if (!result.rows[0]) {
      throw new Error(`Category not found: ${id}`);
    }

    return toCategory(result.rows[0]);
  }
}
