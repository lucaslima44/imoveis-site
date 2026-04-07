import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth"; // Verifique se essa função existe no seu lib/auth
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// 1. Configuração do cliente Admin do Supabase (ignora RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

// 2. Proteção contra brute-force (Rate Limit simples)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count++;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  // A. Identificação do IP para Rate Limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 15 minutos." },
      { status: 429 }
    );
  }

  // B. Validação do Body
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json({ error: "Credenciais ausentes." }, { status: 400 });
  }

  // C. Busca do usuário no Supabase
  // Buscamos na tabela 'usuarios_admin' que você criou
  const { data: admin, error } = await supabaseAdmin
    .from('usuarios_admin')
    .select('*')
    .eq('usuario', username.slice(0, 64)) // Truncando por segurança
    .single();

  // D. Verificação de credenciais (Anti-timing attack: sempre fazemos o check se o usuário existe)
  let passwordOk = false;
  if (admin && !error) {
    passwordOk = await bcrypt.compare(password.slice(0, 256), admin.senha_hash);
  }

  if (!admin || !passwordOk) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  // E. Sucesso: Limpa tentativas e gera o Token
  attempts.delete(ip);

  // Gera o JWT usando sua função do lib/auth
  const token = await signToken({ username: admin.usuario });

  const response = NextResponse.json({ ok: true });

  // F. Define o Cookie de Sessão
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Deixei como '/' para garantir que o middleware ou outras rotas acessem
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return response;
}