import { describe, expect, it } from "vitest";

import { hashSessionToken } from "../../src/server/auth/session";
import type { Session } from "../../src/server/modules/sessions/session.entity";
import type {
  CreateSessionRecordInput,
  SessionRepository
} from "../../src/server/modules/sessions/session.repository";
import { SessionService } from "../../src/server/modules/sessions/session.service";

class FakeSessionRepository implements SessionRepository {
  private readonly sessionsByTokenHash = new Map<string, Session>();
  public touchedSessionIds: string[] = [];

  async create(input: CreateSessionRecordInput) {
    const session: Session = {
      id: `session-${this.sessionsByTokenHash.size + 1}`,
      userId: input.userId,
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt,
      revokedAt: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      lastUsedAt: null
    };

    this.sessionsByTokenHash.set(session.tokenHash, session);
    return session;
  }

  async findByTokenHash(tokenHash: string) {
    return this.sessionsByTokenHash.get(tokenHash) ?? null;
  }

  async revoke(sessionId: string, revokedAt: Date) {
    for (const session of this.sessionsByTokenHash.values()) {
      if (session.id === sessionId) {
        session.revokedAt = revokedAt;
      }
    }
  }

  async touchLastUsed(sessionId: string) {
    this.touchedSessionIds.push(sessionId);
  }

  setSession(token: string, session: Omit<Session, "tokenHash">) {
    this.sessionsByTokenHash.set(hashSessionToken(token), {
      ...session,
      tokenHash: hashSessionToken(token)
    });
  }
}

describe("foundation sessions", () => {
  const now = new Date("2026-04-26T12:00:00.000Z");

  it("authenticates an active session", async () => {
    const repository = new FakeSessionRepository();
    const service = new SessionService(repository, { now: () => now });
    repository.setSession("active-token", {
      id: "session-active",
      userId: "user-1",
      expiresAt: new Date("2026-04-27T12:00:00.000Z"),
      revokedAt: null,
      createdAt: now,
      lastUsedAt: null
    });

    const session = await service.validateSessionToken("active-token");

    expect(session?.id).toBe("session-active");
    expect(repository.touchedSessionIds).toEqual(["session-active"]);
  });

  it("does not authenticate an expired session", async () => {
    const repository = new FakeSessionRepository();
    const service = new SessionService(repository, { now: () => now });
    repository.setSession("expired-token", {
      id: "session-expired",
      userId: "user-1",
      expiresAt: new Date("2026-04-25T12:00:00.000Z"),
      revokedAt: null,
      createdAt: now,
      lastUsedAt: null
    });

    await expect(service.validateSessionToken("expired-token")).resolves.toBeNull();
  });

  it("does not authenticate a revoked session", async () => {
    const repository = new FakeSessionRepository();
    const service = new SessionService(repository, { now: () => now });
    repository.setSession("revoked-token", {
      id: "session-revoked",
      userId: "user-1",
      expiresAt: new Date("2026-04-27T12:00:00.000Z"),
      revokedAt: new Date("2026-04-26T10:00:00.000Z"),
      createdAt: now,
      lastUsedAt: null
    });

    await expect(service.validateSessionToken("revoked-token")).resolves.toBeNull();
  });
});
