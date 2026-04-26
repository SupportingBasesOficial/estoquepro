import type { AuditRecorder } from "../audit/audit-log.service";
import type { CreateSupplierInput, UpdateSupplierInput } from "./supplier.entity";
import type { SupplierRepository } from "./supplier.repository";

export class SupplierService {
  constructor(
    private readonly suppliers: SupplierRepository,
    private readonly audit: AuditRecorder
  ) {}

  async createSupplier(input: CreateSupplierInput, actorUserId: string | null) {
    this.assertName(input.name, "Supplier name is required");

    const supplier = await this.suppliers.create(input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "suppliers.create",
      entity: "suppliers",
      entityId: supplier.id,
      summary: `Supplier created: ${supplier.name}`,
      payload: { name: supplier.name, status: supplier.status }
    });

    return supplier;
  }

  async updateSupplier(
    id: string,
    input: UpdateSupplierInput,
    actorUserId: string | null
  ) {
    if (input.name !== undefined) {
      this.assertName(input.name, "Supplier name is required");
    }

    const supplier = await this.suppliers.update(id, input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "suppliers.update",
      entity: "suppliers",
      entityId: supplier.id,
      summary: `Supplier updated: ${supplier.name}`,
      payload: input
    });

    return supplier;
  }

  async deactivateSupplier(id: string, actorUserId: string | null) {
    const supplier = await this.suppliers.updateStatus(id, "inactive");

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "suppliers.deactivate",
      entity: "suppliers",
      entityId: supplier.id,
      summary: `Supplier deactivated: ${supplier.name}`,
      payload: { status: supplier.status }
    });

    return supplier;
  }

  private assertName(name: string, message: string) {
    if (!name.trim()) {
      throw new Error(message);
    }
  }
}
