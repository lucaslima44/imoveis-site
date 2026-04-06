import type { Metadata } from "next";
import PropertyForm from "../PropertyForm";

export const metadata: Metadata = { title: "Novo Imóvel" };

export default function NovoImovelPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-navy-900">
          Novo Imóvel
        </h1>
        <p className="font-body text-gray-500 text-sm mt-1">
          Preencha os dados para cadastrar um novo imóvel no portfólio.
        </p>
      </div>
      <PropertyForm mode="create" />
    </div>
  );
}
