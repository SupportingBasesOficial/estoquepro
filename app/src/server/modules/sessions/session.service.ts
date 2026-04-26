import { addDays, isExpired, nowUtc } from "../../../shared/utils/dates";
import { createSessionToken, hashSessionToken } from "../../auth/session";
import type { SessionRepository } from "./session.repository";

export type SessionServiceOptions = {
  now?: () => Date;
  ttlDays?: number;
};

export class SessionService {
  private readonly now: () => Date;
  private readonly ttlDays: number;

  constructor(
    private readonly sessions: SessionRepository,
    options: SessionServiceOptions = {}
  ) {
    this.now = options.now ?? nowUtc;
    this.ttlDays = options.ttlDays ?? 7;
  }

  async createSession(userId: string) {
    const token = createSessionToken();
    const tokenHash = hashSessionToken(token);
    const expiresAt = addDays(this.now(), this.ttlDays);
    const session = await this.sessions.create({ userId, tokenHash, expiresAt });

    return { session, token };
  }

  async validateSessionToken(token: string) {
    const tokenHash = hashSessionToken(token);
    const session = await this.sessions.findByTokenHash(tokenHash);

    if (!session) {
      return null;
    }

    if (session.revokedAt) {
      return null;
    }

    if (isExpired(session.expiresAt, this.now())) {
      return null;
    }

    await this.sessions.touchLastUsed(session.id, this.now());
    return session;
  }

  async revokeSession(sessionId: string) {
    await this.sessions.revoke(sessionId, this.now());
  }
}
