import { readAvailableProperties } from "@/lib/properties-store";
import ImoveisClient from "./ImoveisClient";
import type { Metadata } from "next";

// Sempre busca dados frescos do Supabase — sem cache estático
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Imóveis Disponíveis",
  description:
    "Veja todos os imóveis disponíveis da VA. Lima Imóveis no Capão Redondo e Parque Fernanda.",
};

export default async function ImoveisPage() {
  let properties = [];
  try {
    properties = await readAvailableProperties();
  } catch {
    properties = [];
  }

  return (
    <>
      <div className="bg-navy-900 pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            Portfólio completo
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-cream-50 leading-tight mb-4">
            Nossos Imóveis
          </h1>
          <p className="font-body text-cream-300 text-base max-w-lg">
            Capão Redondo, Parque Fernanda e Zona Sul de SP — apenas imóveis
            disponíveis.
          </p>
        </div>
      </div>
      <ImoveisClient initialProperties={properties} />
    </>
  );
}
