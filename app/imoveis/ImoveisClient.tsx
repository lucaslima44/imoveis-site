"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";

type FilterType = "todos" | "apartamento" | "casa";

export default function ImoveisClient({ initialProperties }: { initialProperties: Property[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = initialProperties.filter((p) => {
    const matchesType = activeFilter === "todos" || p.type === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const counts = {
    todos: initialProperties.length,
    apartamento: initialProperties.filter((p) => p.type === "apartamento").length,
    casa: initialProperties.filter((p) => p.type === "casa").length,
  };

  return (
    <>
      {/* Filters */}
      <div className="bg-cream-50 border-b border-cream-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FilterBar activeFilter={activeFilter} onFilter={setActiveFilter} counts={counts} />
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" />
            <input
              type="text"
              placeholder="Buscar por bairro, cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm font-body bg-cream-100 border border-cream-300 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:border-navy-900 transition-colors w-64"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {filtered.length > 0 ? (
          <>
            <p className="font-body text-navy-500 text-sm mb-8">
              {filtered.length} imóvel{filtered.length !== 1 ? "is" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (<PropertyCard key={property.id} property={property} />))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-cream-200 flex items-center justify-center mx-auto mb-5"><Search size={24} className="text-navy-400" /></div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">Nenhum imóvel encontrado</h3>
            <p className="font-body text-navy-500 text-sm mb-6">Tente ajustar os filtros ou a busca.</p>
            <button onClick={() => { setActiveFilter("todos"); setSearchQuery(""); }} className="btn-outline text-xs">Limpar filtros</button>
          </div>
        )}
      </div>
    </>
  );
}
