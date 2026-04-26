import type { EntityStatus } from "../../../shared/types/status";

export type Product = {
  id: string;
  internalCode: string;
  name: string;
  description: string | null;
  categoryId: string;
  primarySupplierId: string;
  internalLocationId: string | null;
  costPrice: string;
  salePrice: string;
  minimumStock: string;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductRow = {
  id: string;
  internal_code: string;
  name: string;
  description: string | null;
  category_id: string;
  primary_supplier_id: string;
  internal_location_id: string | null;
  cost_price: string;
  sale_price: string;
  minimum_stock: string;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateProductInput = {
  internalCode: string;
  name: string;
  description?: string | null;
  categoryId: string;
  primarySupplierId: string;
  internalLocationId?: string | null;
  costPrice: string | number;
  salePrice: string | number;
  minimumStock: string | number;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    internalCode: row.internal_code,
    name: row.name,
    description: row.description,
    categoryId: row.category_id,
    primarySupplierId: row.primary_supplier_id,
    internalLocationId: row.internal_location_id,
    costPrice: row.cost_price,
    salePrice: row.sale_price,
    minimumStock: row.minimum_stock,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
