import { MetadataRoute } from "next";
import { readAvailableProperties } from "@/lib/properties-store";

const BASE_URL = "https://www.valimaimoveis.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/imoveis`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/quem-somos`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/localizacao`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const properties = await readAvailableProperties();
    const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
      url: `${BASE_URL}/imoveis/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
