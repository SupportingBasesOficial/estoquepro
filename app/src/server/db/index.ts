import { Pool } from "pg";

import { env } from "@/server/config/env";

declare global {
  // eslint-disable-next-line no-var
  var estoqueProPgPool: Pool | undefined;
}

function createPool() {
  return new Pool({
    connectionString: env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });
}

export const db = globalThis.estoqueProPgPool ?? createPool();

if (env.NODE_ENV !== "production") {
  globalThis.estoqueProPgPool = db;
}

export async function assertDatabaseConnection() {
  const client = await db.connect();

  try {
    await client.query("select 1");
  } finally {
    client.release();
  }
}
