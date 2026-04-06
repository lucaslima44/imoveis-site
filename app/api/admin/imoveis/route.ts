import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readProperties, createProperty } from "@/lib/properties-store";
import { Property } from "@/types";

export async function GET() {
  try {
    const properties = await readProperties();
    return NextResponse.json(properties);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<Omit<Property, "id">>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const required = [
    "title", "type", "price", "address",
    "neighborhood", "city", "state",
    "bedrooms", "bathrooms", "area", "description",
  ] as const;

  for (const f of required) {
    if (body[f] === undefined || body[f] === null || body[f] === "") {
      return NextResponse.json(
        { error: `Campo obrigatório ausente: ${f}` },
        { status: 422 }
      );
    }
  }

  if (body.type !== "apartamento" && body.type !== "casa") {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 422 });
  }

  try {
    const property = await createProperty({
      ...(body as Omit<Property, "id">),
      images: Array.isArray(body.images) ? body.images : [],
      parkingSpots: Number(body.parkingSpots ?? 0),
      featured: body.featured ?? false,
      status: body.status ?? "disponivel",
    });

    // Invalida o cache do frontend imediatamente
    revalidatePath("/");
    revalidatePath("/imoveis");

    return NextResponse.json(property, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
