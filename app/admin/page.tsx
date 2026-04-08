import Link from "next/link";
import { Building2, Home, PlusCircle, Star, ArrowRight } from "lucide-react";
import { readProperties } from "@/lib/properties-store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";
export const revalidate = 0; // Garante que a página sempre busque a versão mais recente do banco (sem F5)

export default async function AdminDashboard() {
  let properties: Awaited<ReturnType<typeof readProperties>> = [];
  try {
    properties = await readProperties();
  } catch {
    properties = [];
  }

  const total = properties.length;
  const apartamentos = properties.filter(
    (p) => p.type === "apartamento",
  ).length;
  const casas = properties.filter((p) => p.type === "casa").length;
  const destaques = properties.filter((p) => p.featured).length;

  const stats = [
    {
      label: "Total de Imóveis",
      value: total,
      icon: Building2,
      color: "bg-navy-900 text-cream-50",
    },
    {
      label: "Apartamentos",
      value: apartamentos,
      icon: Building2,
      color: "bg-gold-500 text-cream-50",
    },
    {
      label: "Casas",
      value: casas,
      icon: Home,
      color: "bg-navy-700 text-cream-50",
    },
    {
      label: "Em Destaque",
      value: destaques,
      icon: Star,
      color: "bg-gold-400 text-cream-50",
    },
  ];

  const recent = [...properties].slice(0, 5);

  const STATUS_STYLE: Record<string, string> = {
    disponivel: "bg-emerald-50 text-emerald-600",
    reservado: "bg-amber-50 text-amber-600",
    vendido: "bg-red-50 text-red-500",
  };

  const STATUS_LABEL: Record<string, string> = {
    disponivel: "Disponível",
    reservado: "Reservado",
    vendido: "Vendido",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-navy-900">
          Dashboard
        </h1>
        <p className="font-body text-gray-500 text-sm mt-1">
          Visão geral dos imóveis cadastrados.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className={`${s.color} p-5`}>
            <s.icon size={18} className="opacity-70 mb-3" />
            <p className="font-display text-3xl font-bold">{s.value}</p>
            <p className="font-body text-xs opacity-80 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link
          href="/admin/imoveis/novo"
          className="flex items-center gap-4 bg-white border border-gray-200 p-5 hover:border-gold-400 hover:shadow-sm transition-all duration-150 group"
        >
          <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
            <PlusCircle size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-navy-900">
              Cadastrar Imóvel
            </p>
            <p className="font-body text-xs text-gray-500 mt-0.5">
              Adicionar novo imóvel ao portfólio
            </p>
          </div>
          <ArrowRight
            size={16}
            className="ml-auto text-gray-300 group-hover:text-gold-400 transition-colors"
          />
        </Link>

        <Link
          href="/admin/imoveis"
          className="flex items-center gap-4 bg-white border border-gray-200 p-5 hover:border-gold-400 hover:shadow-sm transition-all duration-150 group"
        >
          <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-navy-900">
              Gerenciar Imóveis
            </p>
            <p className="font-body text-xs text-gray-500 mt-0.5">
              Editar, remover e gerenciar fotos
            </p>
          </div>
          <ArrowRight
            size={16}
            className="ml-auto text-gray-300 group-hover:text-gold-400 transition-colors"
          />
        </Link>
      </div>

      {/* Recentes */}
      <div className="bg-white border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-body text-sm font-semibold text-navy-900">
            Imóveis Recentes
          </h2>
          <Link
            href="/admin/imoveis"
            className="font-body text-xs text-gold-500 hover:text-gold-600 transition-colors"
          >
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recent.length === 0 ? (
            <p className="px-5 py-8 text-center text-gray-400 text-sm font-body">
              Nenhum imóvel cadastrado ainda.
            </p>
          ) : (
            recent.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                {/* Thumbnail */}
                <div
                  className="w-10 h-10 shrink-0 bg-cover bg-center bg-gray-100"
                  style={{
                    backgroundImage: p.images[0]
                      ? `url(${p.images[0]})`
                      : undefined,
                  }}
                >
                  {!p.images[0] && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-sm font-medium text-navy-900 truncate">
                      {p.title}
                    </p>
                    {/* ⭐ Badge de destaque */}
                    {String(p.featured) === "true" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-300 text-amber-700 bg-amber-50 uppercase w-max">
                        ⭐ DESTAQUE
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-gray-400 mt-0.5">
                    {p.neighborhood}, {p.city}
                  </p>
                </div>

                {/* Tipo */}
                <span
                  className={`shrink-0 text-[10px] font-medium px-2 py-1 font-body uppercase tracking-wide ${
                    p.type === "apartamento"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {p.type}
                </span>

                {/* Status */}
                <span
                  className={`shrink-0 text-[10px] font-medium px-2 py-1 font-body uppercase tracking-wide ${
                    STATUS_STYLE[p.status ?? "disponivel"] ??
                    "bg-gray-50 text-gray-500"
                  }`}
                >
                  {STATUS_LABEL[p.status ?? "disponivel"] ?? p.status}
                </span>

                {/* Editar */}
                <Link
                  href={`/admin/imoveis/${p.id}/editar`}
                  className="shrink-0 text-xs font-body text-gold-500 hover:text-gold-600 transition-colors"
                >
                  Editar
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
