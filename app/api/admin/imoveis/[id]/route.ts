import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findByIdAdmin, updateProperty, deleteProperty } from "@/lib/properties-store";
import { Property } from "@/types";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const property = await findByIdAdmin(params.id);
  if (!property) return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  return NextResponse.json(property);
}

export async function PUT(req: NextRequest, { params }: Params) {
  let body: Partial<Omit<Property, "id">>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (body.type && body.type !== "apartamento" && body.type !== "casa") {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 422 });
  }

  if (body.featured !== undefined) {
    body.featured = body.featured === true;
  }

  try {
    const updated = await updateProperty(params.id, body);
    if (!updated) return NextResponse.json({ error: "Não encontrado." }, { status: 404 });

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

    revalidatePath("/");
    revalidatePath("/imoveis");
    revalidatePath(`/imoveis/${params.id}`);

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
