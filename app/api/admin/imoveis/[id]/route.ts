import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findByIdAdmin, updateProperty, deleteProperty } from "@/lib/properties-store";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const property = await findByIdAdmin(params.id);
  if (!property) return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  return NextResponse.json(property);
}

export async function PUT(req: NextRequest, { params }: Params) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  delete body.id;

  if (body.type && body.type !== "apartamento" && body.type !== "casa") {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 422 });
  }

  // Garante que featured é boolean
  if (body.featured !== undefined) {
    body.featured = body.featured === true || body.featured === "true";
  }

  try {
    const updated = await updateProperty(params.id, body as never);
    if (!updated) return NextResponse.json({ error: "Não encontrado." }, { status: 404 });

    // Invalida cache do frontend imediatamente
    revalidatePath("/");
    revalidatePath("/imoveis");
    revalidatePath(`/imoveis/${params.id}`);

    return NextResponse.json(updated);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await deleteProperty(params.id);

    // Invalida cache do frontend imediatamente
    revalidatePath("/");
    revalidatePath("/imoveis");
    revalidatePath(`/imoveis/${params.id}`);

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
