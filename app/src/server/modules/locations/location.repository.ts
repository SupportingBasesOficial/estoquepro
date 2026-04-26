import { db } from "../../db";
import type { EntityStatus } from "../../../shared/types/status";
import {
  toInternalLocation,
  type CreateLocationInput,
  type InternalLocation,
  type InternalLocationRow,
  type UpdateLocationInput
} from "./location.entity";

export type LocationRepository = {
  create(input: CreateLocationInput): Promise<InternalLocation>;
  findById(id: string): Promise<InternalLocation | null>;
  listActive(): Promise<InternalLocation[]>;
  update(id: string, input: UpdateLocationInput): Promise<InternalLocation>;
  updateStatus(id: string, status: EntityStatus): Promise<InternalLocation>;
};

export class PgLocationRepository implements LocationRepository {
  async create(input: CreateLocationInput) {
    const result = await db.query<InternalLocationRow>(
      `insert into internal_locations (name, description)
       values ($1, $2)
       returning *`,
      [input.name, input.description ?? null]
    );

    return toInternalLocation(result.rows[0]);
  }

  async findById(id: string) {
    const result = await db.query<InternalLocationRow>(
      "select * from internal_locations where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toInternalLocation(result.rows[0]) : null;
  }

  async listActive() {
    const result = await db.query<InternalLocationRow>(
      "select * from internal_locations where status = 'active' order by name"
    );

    return result.rows.map(toInternalLocation);
  }

  async update(id: string, input: UpdateLocationInput) {
    const result = await db.query<InternalLocationRow>(
      `update internal_locations
       set
         name = coalesce($2, name),
         description = coalesce($3, description),
         updated_at = now()
       where id = $1
       returning *`,
      [id, input.name ?? null, input.description ?? null]
    );

    if (!result.rows[0]) {
      throw new Error(`Internal location not found: ${id}`);
    }

    return toInternalLocation(result.rows[0]);
  }

  async updateStatus(id: string, status: EntityStatus) {
    const result = await db.query<InternalLocationRow>(
      `update internal_locations
       set status = $2, updated_at = now()
       where id = $1
       returning *`,
      [id, status]
    );

    if (!result.rows[0]) {
      throw new Error(`Internal location not found: ${id}`);
    }

    return toInternalLocation(result.rows[0]);
  }
}
