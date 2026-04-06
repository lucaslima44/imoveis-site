import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Cliente público — leituras no site (anon key)
export const supabase = createClient(url, anonKey);

// Cliente admin — operações do painel (service role key)
// NUNCA importe supabaseAdmin em "use client" components
export const supabaseAdmin = serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : createClient(url, anonKey);

export const TABLE = "properties";
export const STORAGE_BUCKET = "imoveis";
