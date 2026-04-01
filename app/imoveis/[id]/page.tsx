import { notFound } from "next/navigation";
import Link from "next/link";
import { BedDouble, Bath, Car, Maximize2, MapPin, ArrowLeft, Phone } from "lucide-react";
import { getById, properties } from "@/data/properties";
import ImageGallery from "@/components/ImageGallery";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = getById(params.id);
  if (!property) return { title: "Imóvel não encontrado" };
  return { title: property.title, description: property.description.slice(0, 160) };
}

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

const WHATSAPP_NUMBER = "5511999999999";

export default function PropertyPage({ params }: Props) {
  const property = getById(params.id);
  if (!property) notFound();

  const whatsappMsg = `Olá! Tenho interesse no imóvel: ${property.title} (${property.address}). Pode me enviar mais informações?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  const specs = [
    { icon: BedDouble, label: "Quartos", value: property.bedrooms },
    { icon: Bath, label: "Banheiros", value: property.bathrooms },
    { icon: Car, label: "Vagas de Garagem", value: property.parkingSpots },
    { icon: Maximize2, label: "Área Total", value: `${property.area} m²` },
  ];

  return (
    <div className="bg-cream-100 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <Link href="/imoveis" className="inline-flex items-center gap-2 text-navy-500 text-sm font-body hover:text-gold-500 transition-colors duration-200 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para imóveis
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="mb-10">
          <ImageGallery images={property.images} title={property.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="inline-block bg-cream-200 text-navy-700 text-[10px] font-medium tracking-[0.2em] uppercase px-3 py-1.5 mb-4">
              {property.type === "apartamento" ? "Apartamento" : "Casa"}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 leading-tight mb-4">
              {property.title}
            </h1>
            <div className="flex items-start gap-2 mb-8">
              <MapPin size={16} className="text-gold-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-navy-700 text-sm leading-relaxed">{property.address}</p>
                <p className="font-body text-navy-500 text-sm">{property.neighborhood} — {property.city}, {property.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {specs.map((spec, i) => (
                <div key={i} className="bg-cream-50 p-5 flex flex-col items-center text-center gap-2 shadow-[0_2px_20px_rgba(15,30,43,0.08)]">
                  <spec.icon size={20} className="text-gold-500" />
                  <span className="font-display text-xl font-semibold text-navy-900">{spec.value}</span>
                  <span className="font-body text-navy-500 text-xs">{spec.label}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4">Sobre o Imóvel</h2>
              <div className="w-12 h-0.5 bg-gold-500 mb-6" />
              <p className="font-body text-navy-600 leading-relaxed text-[15px]">{property.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-cream-50 shadow-[0_2px_20px_rgba(15,30,43,0.08)] p-7 sticky top-32">
              <p className="font-body text-navy-500 text-xs tracking-[0.15em] uppercase mb-1">Valor</p>
              <p className="font-display text-3xl font-semibold text-navy-900 mb-6">{formatPrice(property.price)}</p>
              <div className="h-px bg-cream-200 mb-6" />
              <ul className="space-y-3 mb-8">
                {[["Tipo", property.type], ["Área", `${property.area} m²`], ["Quartos", property.bedrooms], ["Banheiros", property.bathrooms], ["Vagas", property.parkingSpots]].map(([label, val]) => (
                  <li key={String(label)} className="flex justify-between items-center text-sm font-body border-b border-cream-200 pb-3 last:border-0 last:pb-0">
                    <span className="text-navy-500">{label}</span>
                    <span className="text-navy-900 font-medium capitalize">{String(val)}</span>
                  </li>
                ))}
              </ul>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 font-body font-medium tracking-[0.1em] uppercase text-sm text-cream-50 hover:opacity-90 transition-opacity mb-3"
                style={{ backgroundColor: "#25D366" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
              </a>
              <a href="tel:+5511999999999"
                className="flex items-center justify-center gap-2 w-full border border-navy-900 text-navy-900 py-4 font-body font-medium tracking-[0.1em] uppercase text-sm hover:bg-navy-900 hover:text-cream-50 transition-all duration-300">
                <Phone size={16} />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
