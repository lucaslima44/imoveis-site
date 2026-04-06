export interface Property {
  id: string;
  title: string;
  type: "apartamento" | "casa";
  price: number;
  contractType?: "venda" | "locacao" | "venda_locacao";
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  description: string;
  images: string[];
  featured?: boolean;
  status?: "disponivel" | "vendido" | "reservado";
}

// ── Supabase row → Property ────────────────────────────────────────────────
// Coluna "images" é jsonb — o Supabase já entrega como array JS, sem precisar de JSON.parse
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbRowToProperty(row: any): Property {
  // jsonb vem como array diretamente; fallback para [] se vier nulo
  let images: string[] = [];
  try {
    const raw = row.images;
    if (Array.isArray(raw)) {
      images = raw;
    } else if (typeof raw === "string") {
      images = JSON.parse(raw); // fallback caso venha como string
    }
  } catch {
    images = [];
  }

  return {
    id: String(row.id),
    title: row.title ?? "",
    type: row.type === "casa" ? "casa" : "apartamento",
    price: Number(row.price ?? 0),
    contractType: row.contract_type ?? undefined,
    address: row.address ?? "",
    neighborhood: row.neighborhood ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    bedrooms: Number(row.bedrooms ?? 0),
    bathrooms: Number(row.bathrooms ?? 0),
    parkingSpots: Number(row.parkingspots ?? 0),
    area: Number(row.area ?? 0),
    description: row.description ?? "",
    images,
    featured: row.featured === true,
    status: (row.status as Property["status"]) ?? "disponivel",
  };
}

// ── Property → Supabase row ────────────────────────────────────────────────
// Coluna "images" é jsonb — passa o array diretamente, sem JSON.stringify
export function propertyToDbRow(p: Omit<Property, "id">) {
  return {
    title: p.title,
    type: p.type,
    price: p.price,
    contract_type: p.contractType ?? null,
    address: p.address,
    neighborhood: p.neighborhood,
    city: p.city,
    state: p.state,
    bedrooms: Number(p.bedrooms ?? 0),
    bathrooms: Number(p.bathrooms ?? 0),
    parkingspots: Number(p.parkingSpots ?? 0),
    area: Number(p.area ?? 0),
    description: p.description,
    images: Array.isArray(p.images) ? p.images : [],  // jsonb: array direto
    featured: p.featured === true,
    status: p.status ?? "disponivel",
  };
}
