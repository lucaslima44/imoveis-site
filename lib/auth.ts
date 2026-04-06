import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const EXPIRY = "8h";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? "";
  if (!secret || secret.length < 32) {
    // In production this will error; in build time we return a placeholder
    if (process.env.NODE_ENV === "production" && !secret) {
      throw new Error("JWT_SECRET ausente ou muito curto (mínimo 32 caracteres).");
    }
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: { username: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .setIssuer("va-lima-imoveis")
    .setAudience("admin")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: "va-lima-imoveis",
      audience: "admin",
    });
    return { username: payload.username as string };
  } catch {
    return null;
  }
}

export async function getSessionFromCookie(): Promise<{ username: string } | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
