import type { AuditRecorder } from "../audit/audit-log.service";
import type { CreateLocationInput, UpdateLocationInput } from "./location.entity";
import type { LocationRepository } from "./location.repository";

export class LocationService {
  constructor(
    private readonly locations: LocationRepository,
    private readonly audit: AuditRecorder
  ) {}

  async createLocation(input: CreateLocationInput, actorUserId: string | null) {
    this.assertName(input.name, "Location name is required");

    const location = await this.locations.create(input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "locations.create",
      entity: "internal_locations",
      entityId: location.id,
      summary: `Internal location created: ${location.name}`,
      payload: { name: location.name, status: location.status }
    });

    return location;
  }

  async updateLocation(
    id: string,
    input: UpdateLocationInput,
    actorUserId: string | null
  ) {
    if (input.name !== undefined) {
      this.assertName(input.name, "Location name is required");
    }

    const location = await this.locations.update(id, input);

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "locations.update",
      entity: "internal_locations",
      entityId: location.id,
      summary: `Internal location updated: ${location.name}`,
      payload: input
    });

    return location;
  }

  async deactivateLocation(id: string, actorUserId: string | null) {
    const location = await this.locations.updateStatus(id, "inactive");

    await this.audit.recordAdminLog({
      userId: actorUserId,
      action: "locations.deactivate",
      entity: "internal_locations",
      entityId: location.id,
      summary: `Internal location deactivated: ${location.name}`,
      payload: { status: location.status }
    });

    return location;
  }

  private assertName(name: string, message: string) {
    if (!name.trim()) {
      throw new Error(message);
    }
  }
}
