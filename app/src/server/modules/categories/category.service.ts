import type { AuditRecorder } from "../audit/audit-log.service";
import type { CreateCategoryInput, UpdateCategoryInput } from "./category.entity";
import type { CategoryRepository } from "./category.repository";

export class CategoryService {
  constructor(
    private readonly categories: CategoryRepository,
    private readonly audit: AuditRecorder
  ) {}

  async createCategory(input: CreateCategoryInput, actorUserId: string | null) {
    this.assertName(input.name, "Category name is required");

    const category = await this.categories.create(input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "categories.create",
      entity: "categories",
      entityId: category.id,
      summary: `Category created: ${category.name}`,
      payload: { name: category.name, status: category.status }
    });

    return category;
  }

  async updateCategory(
    id: string,
    input: UpdateCategoryInput,
    actorUserId: string | null
  ) {
    if (input.name !== undefined) {
      this.assertName(input.name, "Category name is required");
    }

    const category = await this.categories.update(id, input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "categories.update",
      entity: "categories",
      entityId: category.id,
      summary: `Category updated: ${category.name}`,
      payload: input
    });

    return category;
  }

  async deactivateCategory(id: string, actorUserId: string | null) {
    const category = await this.categories.updateStatus(id, "inactive");

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "categories.deactivate",
      entity: "categories",
      entityId: category.id,
      summary: `Category deactivated: ${category.name}`,
      payload: { status: category.status }
    });

    return category;
  }

  private assertName(name: string, message: string) {
    if (!name.trim()) {
      throw new Error(message);
    }
  }
}
