import type { AuditRecorder } from "../audit/audit-log.service";
import type { CategoryRepository } from "../categories/category.repository";
import type { LocationRepository } from "../locations/location.repository";
import type { SupplierRepository } from "../suppliers/supplier.repository";
import type { CreateProductInput, UpdateProductInput } from "./product.entity";
import type { ProductRepository } from "./product.repository";

export class ProductService {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly suppliers: SupplierRepository,
    private readonly locations: LocationRepository,
    private readonly audit: AuditRecorder
  ) {}

  async createProduct(input: CreateProductInput, actorUserId: string | null) {
    await this.validateRequiredProductInput(input);
    await this.ensureInternalCodeAvailable(input.internalCode);

    const product = await this.products.create(input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "products.create",
      entity: "products",
      entityId: product.id,
      summary: `Product created: ${product.internalCode}`,
      payload: {
        internalCode: product.internalCode,
        name: product.name,
        status: product.status
      }
    });

    return product;
  }

  async updateProduct(
    id: string,
    input: UpdateProductInput,
    actorUserId: string | null
  ) {
    await this.validateOptionalProductInput(input);

    if (input.internalCode !== undefined) {
      await this.ensureInternalCodeAvailable(input.internalCode, id);
    }

    const product = await this.products.update(id, input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "products.update",
      entity: "products",
      entityId: product.id,
      summary: `Product updated: ${product.internalCode}`,
      payload: input
    });

    return product;
  }

  async deactivateProduct(id: string, actorUserId: string | null) {
    const product = await this.products.updateStatus(id, "inactive");

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "products.deactivate",
      entity: "products",
      entityId: product.id,
      summary: `Product deactivated: ${product.internalCode}`,
      payload: { status: product.status }
    });

    return product;
  }

  async ensureInternalCodeAvailable(internalCode: string, currentProductId?: string) {
    this.assertNonEmpty(internalCode, "Product internal code is required");

    const existingProduct = await this.products.findByInternalCode(internalCode);

    if (existingProduct && existingProduct.id !== currentProductId) {
      throw new Error("Product internal code already exists");
    }
  }

  private async validateRequiredProductInput(input: CreateProductInput) {
    this.assertNonEmpty(input.internalCode, "Product internal code is required");
    this.assertNonEmpty(input.name, "Product name is required");
    this.assertNonEmpty(input.categoryId, "Product category is required");
    this.assertNonEmpty(
      input.primarySupplierId,
      "Product primary supplier is required"
    );
    this.assertNonNegative(input.costPrice, "Product cost price must be non-negative");
    this.assertNonNegative(input.salePrice, "Product sale price must be non-negative");
    this.assertNonNegative(
      input.minimumStock,
      "Product minimum stock must be non-negative"
    );

    await this.ensureCategoryExists(input.categoryId);
    await this.ensureSupplierExists(input.primarySupplierId);

    if (input.internalLocationId) {
      await this.ensureLocationExists(input.internalLocationId);
    }
  }

  private async validateOptionalProductInput(input: UpdateProductInput) {
    if (input.internalCode !== undefined) {
      this.assertNonEmpty(input.internalCode, "Product internal code is required");
    }

    if (input.name !== undefined) {
      this.assertNonEmpty(input.name, "Product name is required");
    }

    if (input.categoryId !== undefined) {
      this.assertNonEmpty(input.categoryId, "Product category is required");
      await this.ensureCategoryExists(input.categoryId);
    }

    if (input.primarySupplierId !== undefined) {
      this.assertNonEmpty(
        input.primarySupplierId,
        "Product primary supplier is required"
      );
      await this.ensureSupplierExists(input.primarySupplierId);
    }

    if (input.internalLocationId) {
      await this.ensureLocationExists(input.internalLocationId);
    }

    if (input.costPrice !== undefined) {
      this.assertNonNegative(input.costPrice, "Product cost price must be non-negative");
    }

    if (input.salePrice !== undefined) {
      this.assertNonNegative(input.salePrice, "Product sale price must be non-negative");
    }

    if (input.minimumStock !== undefined) {
      this.assertNonNegative(
        input.minimumStock,
        "Product minimum stock must be non-negative"
      );
    }
  }

  private async ensureCategoryExists(categoryId: string) {
    const category = await this.categories.findById(categoryId);

    if (!category || category.status !== "active") {
      throw new Error("Product category is required");
    }
  }

  private async ensureSupplierExists(supplierId: string) {
    const supplier = await this.suppliers.findById(supplierId);

    if (!supplier || supplier.status !== "active") {
      throw new Error("Product primary supplier is required");
    }
  }

  private async ensureLocationExists(locationId: string) {
    const location = await this.locations.findById(locationId);

    if (!location || location.status !== "active") {
      throw new Error("Product internal location does not exist");
    }
  }

  private assertNonEmpty(value: string, message: string) {
    if (!value.trim()) {
      throw new Error(message);
    }
  }

  private assertNonNegative(value: string | number, message: string) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      throw new Error(message);
    }
  }
}
