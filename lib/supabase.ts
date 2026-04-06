import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !anonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios.");
}

// ── Cliente público — leituras no site (anon key) ─────────────────────────
export const supabase = createClient(url, anonKey);

// ── Cliente admin — operações do painel (service role key) ────────────────
// ⚠️  NUNCA importe supabaseAdmin em componentes client-side ("use client")
export const supabaseAdmin = serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : supabase; // fallback para anon se service key não configurada

// Nome da tabela no Supabase — ajuste se necessário
export const TABLE = "properties";

// Nome do bucket de Storage para fotos dos imóveis
// Crie o bucket "imoveis" no Supabase Dashboard → Storage → New bucket
// Marque como "Public bucket" para que as URLs sejam acessíveis
export const STORAGE_BUCKET = "imoveis";
