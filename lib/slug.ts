/**
 * Gera um slug SEO-friendly a partir do título + ID do imóvel.
 * Ex: "Apartamento na Estrada de Itapecerica" + "42" → "apartamento_na_estrada_de_itapecerica_42"
 */
export function generateSlug(title: string, id: string): string {
  const slugTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s]/g, "")    // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "_");           // espaços → underscore
  return `${slugTitle}_${id}`;
}

/**
 * Extrai o ID numérico do final do slug.
 * Ex: "apartamento_na_estrada_42" → "42"
 */
export function extractIdFromSlug(slug: string): string {
  const parts = slug.split("_");
  return parts[parts.length - 1];
}
