import { db } from "../../db";
import type { PermissionCode } from "../../../shared/types/permissions";
import { toPermission, type Permission, type PermissionRow } from "./permission.entity";

export type PermissionRepository = {
  findByCode(code: PermissionCode): Promise<Permission | null>;
  findManyByCodes(codes: PermissionCode[]): Promise<Permission[]>;
  list(): Promise<Permission[]>;
};

export class PgPermissionRepository implements PermissionRepository {
  async findByCode(code: PermissionCode) {
    const result = await db.query<PermissionRow>(
      "select * from permissions where code = $1 limit 1",
      [code]
    );

    return result.rows[0] ? toPermission(result.rows[0]) : null;
  }

  async findManyByCodes(codes: PermissionCode[]) {
    if (codes.length === 0) {
      return [];
    }

    const result = await db.query<PermissionRow>(
      "select * from permissions where code = any($1::text[]) order by code",
      [codes]
    );

    return result.rows.map(toPermission);
  }

  async list() {
    const result = await db.query<PermissionRow>(
      "select * from permissions order by code"
    );

    return result.rows.map(toPermission);
  }
}
