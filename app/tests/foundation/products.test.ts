import { describe, expect, it } from "vitest";

import type { AuditRecorder } from "../../src/server/modules/audit/audit-log.service";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "../../src/server/modules/categories/category.entity";
import type { CategoryRepository } from "../../src/server/modules/categories/category.repository";
import type { CreateLocationInput, InternalLocation, UpdateLocationInput } from "../../src/server/modules/locations/location.entity";
import type { LocationRepository } from "../../src/server/modules/locations/location.repository";
import type { CreateProductInput, Product, UpdateProductInput } from "../../src/server/modules/products/product.entity";
import type { ProductRepository } from "../../src/server/modules/products/product.repository";
import { ProductService } from "../../src/server/modules/products/product.service";
import type { CreateSupplierInput, Supplier, UpdateSupplierInput } from "../../src/server/modules/suppliers/supplier.entity";
import type { SupplierRepository } from "../../src/server/modules/suppliers/supplier.repository";
import type { EntityStatus } from "../../src/shared/types/status";

class FakeAuditRecorder implements AuditRecorder {
  public records: unknown[] = [];

  async recordAdminLog(input: Parameters<AuditRecorder["recordAdminLog"]>[0]) {
    this.records.push(input);
  }
}

class FakeCategoryRepository implements CategoryRepository {
  constructor(private readonly category: Category | null = makeCategory()) {}

  async create(_input: CreateCategoryInput): Promise<Category> {
    throw new Error("Not used in this test");
  }

  async findById() {
    return this.category;
  }

  async listActive() {
    return this.category ? [this.category] : [];
  }

  async update(_id: string, _input: UpdateCategoryInput): Promise<Category> {
    throw new Error("Not used in this test");
  }

  async updateStatus(_id: string, _status: EntityStatus): Promise<Category> {
    throw new Error("Not used in this test");
  }
}

class FakeSupplierRepository implements SupplierRepository {
  constructor(private readonly supplier: Supplier | null = makeSupplier()) {}

  async create(_input: CreateSupplierInput): Promise<Supplier> {
    throw new Error("Not used in this test");
  }

  async findById() {
    return this.supplier;
  }

  async listActive() {
    return this.supplier ? [this.supplier] : [];
  }

  async update(_id: string, _input: UpdateSupplierInput): Promise<Supplier> {
    throw new Error("Not used in this test");
  }

  async updateStatus(_id: string, _status: EntityStatus): Promise<Supplier> {
    throw new Error("Not used in this test");
  }
}

class FakeLocationRepository implements LocationRepository {
  constructor(private readonly location: InternalLocation | null = makeLocation()) {}

  async create(_input: CreateLocationInput): Promise<InternalLocation> {
    throw new Error("Not used in this test");
  }

  async findById() {
    return this.location;
  }

  async listActive() {
    return this.location ? [this.location] : [];
  }

  async update(_id: string, _input: UpdateLocationInput): Promise<InternalLocation> {
    throw new Error("Not used in this test");
  }

  async updateStatus(_id: string, _status: EntityStatus): Promise<InternalLocation> {
    throw new Error("Not used in this test");
  }
}

class FakeProductRepository implements ProductRepository {
  public products = new Map<string, Product>();

  async create(input: CreateProductInput) {
    const product = makeProduct({
      id: `product-${this.products.size + 1}`,
      internalCode: input.internalCode,
      name: input.name,
      description: input.description ?? null,
      categoryId: input.categoryId,
      primarySupplierId: input.primarySupplierId,
      internalLocationId: input.internalLocationId ?? null,
      costPrice: String(input.costPrice),
      salePrice: String(input.salePrice),
      minimumStock: String(input.minimumStock)
    });
    this.products.set(product.id, product);
    return product;
  }

  async findById(id: string) {
    return this.products.get(id) ?? null;
  }

  async findByInternalCode(internalCode: string) {
    return (
      [...this.products.values()].find(
        (product) => product.internalCode === internalCode
      ) ?? null
    );
  }

  async listActive() {
    return [...this.products.values()].filter(
      (product) => product.status === "active"
    );
  }

  async update(id: string, input: UpdateProductInput) {
    const product = this.products.get(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = {
      ...product,
      internalCode: input.internalCode ?? product.internalCode,
      name: input.name ?? product.name,
      description: input.description ?? product.description,
      categoryId: input.categoryId ?? product.categoryId,
      primarySupplierId: input.primarySupplierId ?? product.primarySupplierId,
      internalLocationId: input.internalLocationId ?? product.internalLocationId,
      costPrice:
        input.costPrice === undefined ? product.costPrice : String(input.costPrice),
      salePrice:
        input.salePrice === undefined ? product.salePrice : String(input.salePrice),
      minimumStock:
        input.minimumStock === undefined
          ? product.minimumStock
          : String(input.minimumStock)
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async updateStatus(id: string, status: EntityStatus) {
    const product = this.products.get(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = { ...product, status };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  setProduct(product: Product) {
    this.products.set(product.id, product);
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

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "product-1",
    internalCode: "SKU-001",
    name: "Produto",
    description: null,
    categoryId: "category-1",
    primarySupplierId: "supplier-1",
    internalLocationId: null,
    costPrice: "10.00",
    salePrice: "20.00",
    minimumStock: "1.000",
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    ...overrides
  };
}

function makeCreateProductInput(
  overrides: Partial<CreateProductInput> = {}
): CreateProductInput {
  return {
    internalCode: "SKU-001",
    name: "Produto",
    categoryId: "category-1",
    primarySupplierId: "supplier-1",
    costPrice: "10.00",
    salePrice: "20.00",
    minimumStock: "1.000",
    ...overrides
  };
}

function makeService(options: {
  products?: FakeProductRepository;
  category?: Category | null;
  supplier?: Supplier | null;
  location?: InternalLocation | null;
  audit?: FakeAuditRecorder;
} = {}) {
  const products = options.products ?? new FakeProductRepository();
  const audit = options.audit ?? new FakeAuditRecorder();

  return {
    products,
    audit,
    service: new ProductService(
      products,
      new FakeCategoryRepository(options.category),
      new FakeSupplierRepository(options.supplier),
      new FakeLocationRepository(options.location),
      audit
    )
  };
}

describe("foundation products", () => {
  it("fails when internal code is duplicated", async () => {
    const products = new FakeProductRepository();
    products.setProduct(makeProduct({ internalCode: "SKU-001" }));
    const { service } = makeService({ products });

    await expect(
      service.createProduct(makeCreateProductInput(), "actor-1")
    ).rejects.toThrow("Product internal code already exists");
  });

  it("fails without category", async () => {
    const { service } = makeService({ category: null });

    await expect(
      service.createProduct(makeCreateProductInput(), "actor-1")
    ).rejects.toThrow("Product category is required");
  });

  it("fails without primary supplier", async () => {
    const { service } = makeService({ supplier: null });

    await expect(
      service.createProduct(makeCreateProductInput(), "actor-1")
    ).rejects.toThrow("Product primary supplier is required");
  });

  it("allows optional internal location", async () => {
    const { service } = makeService({ location: null });

    const product = await service.createProduct(
      makeCreateProductInput({ internalLocationId: null }),
      "actor-1"
    );

    expect(product.internalLocationId).toBeNull();
  });

  it("rejects negative cost, sale price, and minimum stock", async () => {
    const { service } = makeService();

    await expect(
      service.createProduct(makeCreateProductInput({ costPrice: "-1" }), "actor-1")
    ).rejects.toThrow("Product cost price must be non-negative");
    await expect(
      service.createProduct(makeCreateProductInput({ salePrice: "-1" }), "actor-1")
    ).rejects.toThrow("Product sale price must be non-negative");
    await expect(
      service.createProduct(
        makeCreateProductInput({ minimumStock: "-1" }),
        "actor-1"
      )
    ).rejects.toThrow("Product minimum stock must be non-negative");
  });

  it("generates audit on create, update, and deactivate", async () => {
    const { service, audit } = makeService();
    const product = await service.createProduct(makeCreateProductInput(), "actor-1");
    await service.updateProduct(product.id, { name: "Produto atualizado" }, "actor-1");
    await service.deactivateProduct(product.id, "actor-1");

    expect(audit.records).toMatchObject([
      { action: "products.create", entity: "products", entityId: product.id },
      { action: "products.update", entity: "products", entityId: product.id },
      { action: "products.deactivate", entity: "products", entityId: product.id }
    ]);
  });
});
