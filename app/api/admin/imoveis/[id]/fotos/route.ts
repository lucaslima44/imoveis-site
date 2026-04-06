import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { uploadPhoto, removePhoto } from "@/lib/properties-store";

interface Params { params: { id: string } }

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(req: NextRequest, { params }: Params) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "FormData inválido." }, { status: 400 });
  }

  const file = formData.get("foto") as File | null;
  if (!file) return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: "Use JPG, PNG, WEBP ou AVIF." }, { status: 422 });
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: "Máximo 8 MB." }, { status: 422 });

  try {
    const result = await uploadPhoto(params.id, file);
    revalidatePath(`/imoveis/${params.id}`);
    return NextResponse.json(result, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string")
    return NextResponse.json({ error: "URL ausente." }, { status: 400 });

  try {
    const updated = await removePhoto(params.id, url);
    revalidatePath(`/imoveis/${params.id}`);
    return NextResponse.json({ ok: true, property: updated });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
