export interface Property {
  id: string;
  title: string;
  type: "apartamento" | "casa";
  price: number;
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
