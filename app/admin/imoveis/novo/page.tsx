import type { Metadata } from "next";
import PropertyForm from "../PropertyForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Novo Imóvel" };

export default function NovoImovelPage() {
  return (
    <div>
      <PageHeader
        title="Novo Imóvel"
        description="Preencha os dados para cadastrar um novo imóvel no portfólio."
      />
      <PropertyForm mode="create" />
    </div>
  );
}
