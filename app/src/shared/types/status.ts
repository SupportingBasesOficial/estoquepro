export const ENTITY_STATUSES = ["active", "inactive"] as const;

export type EntityStatus = (typeof ENTITY_STATUSES)[number];

export function isEntityStatus(value: string): value is EntityStatus {
  return ENTITY_STATUSES.includes(value as EntityStatus);
}

export function assertEntityStatus(value: string): EntityStatus {
  if (!isEntityStatus(value)) {
    throw new Error(`Invalid status: ${value}`);
  }

  return value;
}
