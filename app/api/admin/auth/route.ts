import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";

// Proteção contra brute-force: rate limit simples em memória (reinicia ao reiniciar o servidor)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count++;
  if (record.count > MAX_ATTEMPTS) return true;
  return false;
}

export async function POST(req: NextRequest) {
  // Obtém IP real (considera proxy/Vercel)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 15 minutos." },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { username, password } = body;

  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Credenciais ausentes." }, { status: 400 });
  }

  // Trunca para evitar ataques de payload gigante
  const safeUsername = username.slice(0, 64);
  const safePassword = password.slice(0, 256);

  const expectedUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !passwordHash) {
    console.error("[Admin Auth] ADMIN_USERNAME ou ADMIN_PASSWORD_HASH não configurados no .env");
    return NextResponse.json({ error: "Servidor não configurado." }, { status: 500 });
  }

  const usernameOk = safeUsername === expectedUsername;
  const passwordOk = await verifyPassword(safePassword, passwordHash);

  // Mesmo tempo de resposta para usuário errado ou senha errada (anti-timing attack)
  if (!usernameOk || !passwordOk) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  // Zera tentativas após login bem-sucedido
  attempts.delete(ip);

  const token = await signToken({ username: safeUsername });

  const response = NextResponse.json({ ok: true });

  // Define cookie httpOnly diretamente na resposta
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
