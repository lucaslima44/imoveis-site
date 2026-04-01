import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Car, Maximize2, MapPin } from "lucide-react";
import { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/imoveis/${property.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-cream-50 card-shadow overflow-hidden hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Type Badge */}
        <span className="absolute top-4 left-4 bg-navy-900/90 backdrop-blur-sm text-cream-50 text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5">
          {property.type === "apartamento" ? "Apartamento" : "Casa"}
        </span>
        {/* Price */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent p-4">
          <p className="text-cream-50 font-display text-xl font-semibold">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-navy-900 font-semibold text-base leading-tight mb-3 line-clamp-2 group-hover:text-gold-600 transition-colors duration-200">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-navy-500 mb-4">
          <MapPin size={12} className="text-gold-500 shrink-0" />
          <span className="text-xs truncate">
            {property.neighborhood}, {property.city}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-cream-200">
          <StatItem icon={<BedDouble size={14} />} value={property.bedrooms} label="Quartos" />
          <StatItem icon={<Bath size={14} />} value={property.bathrooms} label="Banheiros" />
          <StatItem icon={<Car size={14} />} value={property.parkingSpots} label="Vagas" />
          <StatItem icon={<Maximize2 size={14} />} value={`${property.area}m²`} label="Área" />
        </div>
      </div>
    </Link>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-gold-500">{icon}</span>
      <span className="text-navy-900 font-body font-semibold text-sm">{value}</span>
      <span className="text-navy-500 font-body text-[10px] leading-tight">{label}</span>
    </div>
  );
}
