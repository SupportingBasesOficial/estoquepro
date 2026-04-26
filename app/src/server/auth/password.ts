import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_HASH_PREFIX = "scrypt";

export type PasswordHashOptions = {
  pepper?: string;
};

function applyPepper(password: string, pepper?: string) {
  return pepper ? `${password}${pepper}` : password;
}

export async function hashPassword(
  password: string,
  options: PasswordHashOptions = {}
) {
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(
    applyPepper(password, options.pepper),
    salt,
    PASSWORD_KEY_LENGTH
  )) as Buffer;

  return `${PASSWORD_HASH_PREFIX}:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  options: PasswordHashOptions = {}
) {
  const [prefix, salt, hash] = storedHash.split(":");

  if (prefix !== PASSWORD_HASH_PREFIX || !salt || !hash) {
    return false;
  }

  const storedKey = Buffer.from(hash, "hex");
  const derivedKey = (await scrypt(
    applyPepper(password, options.pepper),
    salt,
    storedKey.length
  )) as Buffer;

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
}
