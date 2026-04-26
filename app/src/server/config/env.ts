import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_COOKIE_NAME: z.string().min(1).default("estoquepro_session"),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(7),
  PASSWORD_PEPPER: z.string().min(32).optional()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment configuration",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment configuration");
}

export const env = parsedEnv.data;
export type AppEnv = typeof env;
