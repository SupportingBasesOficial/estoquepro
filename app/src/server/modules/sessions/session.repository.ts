import { db } from "../../db";
import { toSession, type Session, type SessionRow } from "./session.entity";

export type CreateSessionRecordInput = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export type SessionRepository = {
  create(input: CreateSessionRecordInput): Promise<Session>;
  findByTokenHash(tokenHash: string): Promise<Session | null>;
  revoke(sessionId: string, revokedAt: Date): Promise<void>;
  touchLastUsed(sessionId: string, lastUsedAt: Date): Promise<void>;
};

export class PgSessionRepository implements SessionRepository {
  async create(input: CreateSessionRecordInput) {
    const result = await db.query<SessionRow>(
      `insert into sessions (user_id, token_hash, expires_at)
       values ($1, $2, $3)
       returning *`,
      [input.userId, input.tokenHash, input.expiresAt]
    );

    return toSession(result.rows[0]);
  }

  async findByTokenHash(tokenHash: string) {
    const result = await db.query<SessionRow>(
      "select * from sessions where token_hash = $1 limit 1",
      [tokenHash]
    );

    return result.rows[0] ? toSession(result.rows[0]) : null;
  }

  async revoke(sessionId: string, revokedAt: Date) {
    await db.query("update sessions set revoked_at = $2 where id = $1", [
      sessionId,
      revokedAt
    ]);
  }

  async touchLastUsed(sessionId: string, lastUsedAt: Date) {
    await db.query("update sessions set last_used_at = $2 where id = $1", [
      sessionId,
      lastUsedAt
    ]);
  }
}
