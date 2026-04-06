import { supabase, supabaseAdmin, TABLE, STORAGE_BUCKET } from "./supabase";
import { Property, dbRowToProperty, propertyToDbRow } from "@/types";

// ── READ ───────────────────────────────────────────────────────────────────

export async function readProperties(): Promise<Property[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .order("id", { ascending: false });

  if (error) throw new Error(`Supabase readProperties: ${error.message}`);
  return (data ?? []).map(dbRowToProperty);
}

export async function readAvailableProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "disponivel")
    .order("id", { ascending: false });

  if (error) throw new Error(`Supabase readAvailableProperties: ${error.message}`);
  return (data ?? []).map(dbRowToProperty);
}

export async function readFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "disponivel")
    .eq("featured", true)
    .order("id", { ascending: false });

  if (error) throw new Error(`Supabase readFeaturedProperties: ${error.message}`);
  return (data ?? []).map(dbRowToProperty);
}

export async function findById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data ? dbRowToProperty(data) : null;
}

export async function findByIdAdmin(id: string): Promise<Property | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data ? dbRowToProperty(data) : null;
}

// ── CREATE ─────────────────────────────────────────────────────────────────

export async function createProperty(
  data: Omit<Property, "id">
): Promise<Property> {
  const row = propertyToDbRow(data);

  const { data: inserted, error } = await supabaseAdmin
    .from(TABLE)
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(`Supabase createProperty: ${error.message}`);
  return dbRowToProperty(inserted);
}

// ── UPDATE ─────────────────────────────────────────────────────────────────

export async function updateProperty(
  id: string,
  patch: Partial<Omit<Property, "id">>
): Promise<Property | null> {
  const current = await findByIdAdmin(id);
  if (!current) return null;

  const merged = { ...current, ...patch };
  const row = propertyToDbRow(merged);

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Supabase updateProperty: ${error.message}`);
  return data ? dbRowToProperty(data) : null;
}

// ── DELETE ─────────────────────────────────────────────────────────────────

export async function deleteProperty(id: string): Promise<boolean> {
  // Remove fotos do Storage antes de deletar o registro
  try {
    const { data: files } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list(id);

    if (files && files.length > 0) {
      const paths = files.map((f) => `${id}/${f.name}`);
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove(paths);
    }
  } catch {
    // Ignora erros do Storage — continua e deleta o registro
  }

  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`Supabase deleteProperty: ${error.message}`);
  return true;
}

// ── PHOTOS ─────────────────────────────────────────────────────────────────

export async function uploadPhoto(
  propertyId: string,
  file: File
): Promise<{ url: string; property: Property }> {
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storagePath = `${propertyId}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(`Storage upload: ${uploadError.message}`);

  const { data: urlData } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath);

  const publicUrl = urlData.publicUrl;

  // Atualiza array de imagens no banco (coluna jsonb)
  const current = await findByIdAdmin(propertyId);
  if (!current) throw new Error("Imóvel não encontrado.");

  const updatedImages = [...current.images, publicUrl];
  const updated = await updateProperty(propertyId, { images: updatedImages });
  if (!updated) throw new Error("Falha ao atualizar imóvel.");

  return { url: publicUrl, property: updated };
}

export async function removePhoto(
  propertyId: string,
  imageUrl: string
): Promise<Property> {
  // Extrai o path do Storage a partir da URL pública
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const prefix = `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const storagePath = imageUrl.startsWith(prefix)
    ? imageUrl.slice(prefix.length)
    : null;

  if (storagePath) {
    try {
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([storagePath]);
    } catch {
      // Ignora erro se o arquivo já não existir
    }
  }

  const current = await findByIdAdmin(propertyId);
  if (!current) throw new Error("Imóvel não encontrado.");

  const updatedImages = current.images.filter((img) => img !== imageUrl);
  const updated = await updateProperty(propertyId, { images: updatedImages });
  if (!updated) throw new Error("Falha ao atualizar imóvel.");

  return updated;
}
