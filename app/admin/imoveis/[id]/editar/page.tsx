import { notFound } from "next/navigation";
import { findByIdAdmin } from "@/lib/properties-store";
import PropertyForm from "../../PropertyForm";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await findByIdAdmin(params.id);
  return { title: p ? `Editar — ${p.title}` : "Não encontrado" };
}

export default async function EditarImovelPage({ params }: Props) {
  const property = await findByIdAdmin(params.id);
  if (!property) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-navy-900">
          Editar Imóvel
        </h1>
        <p className="font-body text-gray-500 text-sm mt-1 line-clamp-1">
          {property.title}
        </p>
      </div>
      <PropertyForm mode="edit" initialData={property} />
    </div>
  );
}
