import { db } from "../../db";
import type { EntityStatus } from "../../../shared/types/status";
import {
  toProduct,
  type CreateProductInput,
  type Product,
  type ProductRow,
  type UpdateProductInput
} from "./product.entity";

export type ProductRepository = {
  create(input: CreateProductInput): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByInternalCode(internalCode: string): Promise<Product | null>;
  listActive(): Promise<Product[]>;
  update(id: string, input: UpdateProductInput): Promise<Product>;
  updateStatus(id: string, status: EntityStatus): Promise<Product>;
};

export class PgProductRepository implements ProductRepository {
  async create(input: CreateProductInput) {
    const result = await db.query<ProductRow>(
      `insert into products (
         internal_code,
         name,
         description,
         category_id,
         primary_supplier_id,
         internal_location_id,
         cost_price,
         sale_price,
         minimum_stock
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning *`,
      [
        input.internalCode,
        input.name,
        input.description ?? null,
        input.categoryId,
        input.primarySupplierId,
        input.internalLocationId ?? null,
        input.costPrice,
        input.salePrice,
        input.minimumStock
      ]
    );

    return toProduct(result.rows[0]);
  }

  async findById(id: string) {
    const result = await db.query<ProductRow>(
      "select * from products where id = $1 limit 1",
      [id]
    );

    return result.rows[0] ? toProduct(result.rows[0]) : null;
  }

  async findByInternalCode(internalCode: string) {
    const result = await db.query<ProductRow>(
      "select * from products where internal_code = $1 limit 1",
      [internalCode]
    );

    return result.rows[0] ? toProduct(result.rows[0]) : null;
  }

  async listActive() {
    const result = await db.query<ProductRow>(
      "select * from products where status = 'active' order by name"
    );

    return result.rows.map(toProduct);
  }

  async update(id: string, input: UpdateProductInput) {
    const result = await db.query<ProductRow>(
      `update products
       set
         internal_code = coalesce($2, internal_code),
         name = coalesce($3, name),
         description = coalesce($4, description),
         category_id = coalesce($5, category_id),
         primary_supplier_id = coalesce($6, primary_supplier_id),
         internal_location_id = coalesce($7, internal_location_id),
         cost_price = coalesce($8, cost_price),
         sale_price = coalesce($9, sale_price),
         minimum_stock = coalesce($10, minimum_stock),
         updated_at = now()
       where id = $1
       returning *`,
      [
        id,
        input.internalCode ?? null,
        input.name ?? null,
        input.description ?? null,
        input.categoryId ?? null,
        input.primarySupplierId ?? null,
        input.internalLocationId ?? null,
        input.costPrice ?? null,
        input.salePrice ?? null,
        input.minimumStock ?? null
      ]
    );

    if (!result.rows[0]) {
      throw new Error(`Product not found: ${id}`);
    }

    return toProduct(result.rows[0]);
  }

  async updateStatus(id: string, status: EntityStatus) {
    const result = await db.query<ProductRow>(
      `update products
       set status = $2, updated_at = now()
       where id = $1
       returning *`,
      [id, status]
    );

    if (!result.rows[0]) {
      throw new Error(`Product not found: ${id}`);
    }

    return toProduct(result.rows[0]);
  }
}
