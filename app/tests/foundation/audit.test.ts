import { describe, expect, it } from "vitest";

import type { CreateAdminLogInput } from "../../src/server/modules/audit/audit-log.entity";
import type { AuditLogRepository } from "../../src/server/modules/audit/audit-log.repository";
import { AuditLogService } from "../../src/server/modules/audit/audit-log.service";
import type { CreateCategoryInput, Category, UpdateCategoryInput } from "../../src/server/modules/categories/category.entity";
import type { CategoryRepository } from "../../src/server/modules/categories/category.repository";
import { CategoryService } from "../../src/server/modules/categories/category.service";
import type { CreateLocationInput, InternalLocation, UpdateLocationInput } from "../../src/server/modules/locations/location.entity";
import type { LocationRepository } from "../../src/server/modules/locations/location.repository";
import { LocationService } from "../../src/server/modules/locations/location.service";
import type { CreateSupplierInput, Supplier, UpdateSupplierInput } from "../../src/server/modules/suppliers/supplier.entity";
import type { SupplierRepository } from "../../src/server/modules/suppliers/supplier.repository";
import { SupplierService } from "../../src/server/modules/suppliers/supplier.service";
import type { EntityStatus } from "../../src/shared/types/status";

class FakeAuditLogRepository implements AuditLogRepository {
  public logs: CreateAdminLogInput[] = [];

  async create(input: CreateAdminLogInput) {
    this.logs.push(input);
    return {
      id: `log-${this.logs.length}`,
      userId: input.userId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      occurredAt: new Date("2026-01-01T00:00:00.000Z"),
      summary: input.summary ?? null,
      payload: input.payload ?? null
    };
  }

  async listByEntity() {
    return [];
  }

  async listByUser() {
    return [];
  }

  async listRecent() {
    return [];
  }
}

class FakeCategoryRepository implements CategoryRepository {
  private category = makeCategory();

  async create(input: CreateCategoryInput) {
    this.category = { ...this.category, ...input };
    return this.category;
  }

  async findById() {
    return this.category;
  }

  async listActive() {
    return [this.category];
  }

  async update(id: string, input: UpdateCategoryInput) {
    this.category = { ...this.category, id, ...input };
    return this.category;
  }

  async updateStatus(id: string, status: EntityStatus) {
    this.category = { ...this.category, id, status };
    return this.category;
  }
}

class FakeSupplierRepository implements SupplierRepository {
  private supplier = makeSupplier();

  async create(input: CreateSupplierInput) {
    this.supplier = { ...this.supplier, ...input };
    return this.supplier;
  }

  async findById() {
    return this.supplier;
  }

  async listActive() {
    return [this.supplier];
  }

  async update(id: string, input: UpdateSupplierInput) {
    this.supplier = { ...this.supplier, id, ...input };
    return this.supplier;
  }

  async updateStatus(id: string, status: EntityStatus) {
    this.supplier = { ...this.supplier, id, status };
    return this.supplier;
  }
}

class FakeLocationRepository implements LocationRepository {
  private location = makeLocation();

  async create(input: CreateLocationInput) {
    this.location = { ...this.location, ...input };
    return this.location;
  }

  async findById() {
    return this.location;
  }

  async listActive() {
    return [this.location];
  }

  async update(id: string, input: UpdateLocationInput) {
    this.location = { ...this.location, id, ...input };
    return this.location;
  }

  async updateStatus(id: string, status: EntityStatus) {
    this.location = { ...this.location, id, status };
    return this.location;
  }
}

function makeCategory(): Category {
  return {
    id: "category-1",
    name: "Categoria",
    description: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  };
}

function makeSupplier(): Supplier {
  return {
    id: "supplier-1",
    name: "Fornecedor",
    phone: null,
    email: null,
    contactName: null,
    document: null,
    notes: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  };
}

function makeLocation(): InternalLocation {
  return {
    id: "location-1",
    name: "Prateleira A",
    description: null,
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z")
  };
}

describe("foundation audit", () => {
  it("records arbitrary admin audit events", async () => {
    const repository = new FakeAuditLogRepository();
    const service = new AuditLogService(repository);

    await service.recordAdminLog({
      userId: "actor-1",
      action: "products.create",
      entity: "products",
      entityId: "product-1",
      summary: "Product created",
      payload: { internalCode: "SKU-001" }
    });

    expect(repository.logs).toEqual([
      {
        userId: "actor-1",
        action: "products.create",
        entity: "products",
        entityId: "product-1",
        summary: "Product created",
        payload: { internalCode: "SKU-001" }
      }
    ]);
  });

  it("generates audit for category create, update, and deactivate", async () => {
    const repository = new FakeAuditLogRepository();
    const audit = new AuditLogService(repository);
    const service = new CategoryService(new FakeCategoryRepository(), audit);

    const category = await service.createCategory({ name: "Categoria" }, "actor-1");
    await service.updateCategory(category.id, { name: "Categoria 2" }, "actor-1");
    await service.deactivateCategory(category.id, "actor-1");

    expect(repository.logs.map((log) => log.action)).toEqual([
      "categories.create",
      "categories.update",
      "categories.deactivate"
    ]);
  });

  it("generates audit for supplier create, update, and deactivate", async () => {
    const repository = new FakeAuditLogRepository();
    const audit = new AuditLogService(repository);
    const service = new SupplierService(new FakeSupplierRepository(), audit);

    const supplier = await service.createSupplier({ name: "Fornecedor" }, "actor-1");
    await service.updateSupplier(supplier.id, { name: "Fornecedor 2" }, "actor-1");
    await service.deactivateSupplier(supplier.id, "actor-1");

    expect(repository.logs.map((log) => log.action)).toEqual([
      "suppliers.create",
      "suppliers.update",
      "suppliers.deactivate"
    ]);
  });

  it("generates audit for location create, update, and deactivate", async () => {
    const repository = new FakeAuditLogRepository();
    const audit = new AuditLogService(repository);
    const service = new LocationService(new FakeLocationRepository(), audit);

    const location = await service.createLocation({ name: "Prateleira A" }, "actor-1");
    await service.updateLocation(location.id, { name: "Prateleira B" }, "actor-1");
    await service.deactivateLocation(location.id, "actor-1");

    expect(repository.logs.map((log) => log.action)).toEqual([
      "locations.create",
      "locations.update",
      "locations.deactivate"
    ]);
  });
});
