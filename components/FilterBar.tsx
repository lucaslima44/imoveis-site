"use client";

interface FilterBarProps {
  activeFilter: "todos" | "apartamento" | "casa";
  onFilter: (filter: "todos" | "apartamento" | "casa") => void;
  counts: { todos: number; apartamento: number; casa: number };
}

export default function FilterBar({ activeFilter, onFilter, counts }: FilterBarProps) {
  const filters = [
    { key: "todos" as const, label: "Todos", count: counts.todos },
    { key: "apartamento" as const, label: "Apartamentos", count: counts.apartamento },
    { key: "casa" as const, label: "Casas", count: counts.casa },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilter(f.key)}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
            activeFilter === f.key
              ? "bg-navy-900 text-cream-50"
              : "bg-cream-50 text-navy-700 border border-cream-300 hover:border-navy-900 hover:text-navy-900"
          }`}
        >
          {f.label}
          <span
            className={`text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center ${
              activeFilter === f.key
                ? "bg-gold-500 text-cream-50"
                : "bg-cream-200 text-navy-500"
            }`}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}
