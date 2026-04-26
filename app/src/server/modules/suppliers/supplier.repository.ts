import { db } from "../../db";
import type { EntityStatus } from "../../../shared/types/status";
import {
  toSupplier,
  type CreateSupplierInput,
  type Supplier,
  type SupplierRow,
  type UpdateSupplierInput
} from "./supplier.entity";

export type SupplierRepository = {
  create(input: CreateSupplierInput): Promise<Supplier>;
  findById(id: string): Promise<Supplier | null>;
  listActive(): Promise<Supplier[]>;
  update(id: string, input: UpdateSupplierInput): Promise<Supplier>;
  updateStatus(id: string, status: EntityStatus): Promise<Supplier>;
};

export class PgSupplierRepository implements SupplierRepository {
  async create(input: CreateSupplierInput) {
    const result = await db.query<SupplierRow>(
      `insert into suppliers (name, phone, email, contact_name, document, notes)
       values ($1, $2, $3, $4, $5, $6)
       returning *`,
      [
        input.name,
        input.phone ?? null,
        input.email ?? null,
        input.contactName ?? null,
        input.document ?? null,
        input.notes ?? null
      ]
    );

    return toSupplier(result.rows[0]);
  }

  async findById(id: string) {
    const result = await db.query<SupplierRow>(
      "select * from suppliers where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toSupplier(result.rows[0]) : null;
  }

  async listActive() {
    const result = await db.query<SupplierRow>(
      "select * from suppliers where status = 'active' order by name"
    );

    return result.rows.map(toSupplier);
  }

  async update(id: string, input: UpdateSupplierInput) {
    const result = await db.query<SupplierRow>(
      `update suppliers
       set
         name = coalesce($2, name),
         phone = coalesce($3, phone),
         email = coalesce($4, email),
         contact_name = coalesce($5, contact_name),
         document = coalesce($6, document),
         notes = coalesce($7, notes),
         updated_at = now()
       where id = $1
       returning *`,
      [
        id,
        input.name ?? null,
        input.phone ?? null,
        input.email ?? null,
        input.contactName ?? null,
        input.document ?? null,
        input.notes ?? null
      ]
    );

    if (!result.rows[0]) {
      throw new Error(`Supplier not found: ${id}`);
    }

    return toSupplier(result.rows[0]);
  }

  async updateStatus(id: string, status: EntityStatus) {
    const result = await db.query<SupplierRow>(
      `update suppliers
       set status = $2, updated_at = now()
       where id = $1
       returning *`,
      [id, status]
    );

    if (!result.rows[0]) {
      throw new Error(`Supplier not found: ${id}`);
    }

    return toSupplier(result.rows[0]);
  }
}
