import type { EntityStatus } from "../../../shared/types/status";

export type Supplier = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  contactName: string | null;
  document: string | null;
  notes: string | null;
  status: EntityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type SupplierRow = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  contact_name: string | null;
  document: string | null;
  notes: string | null;
  status: EntityStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateSupplierInput = {
  name: string;
  phone?: string | null;
  email?: string | null;
  contactName?: string | null;
  document?: string | null;
  notes?: string | null;
};

export type UpdateSupplierInput = Partial<CreateSupplierInput>;

export function toSupplier(row: SupplierRow): Supplier {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    contactName: row.contact_name,
    document: row.document,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
