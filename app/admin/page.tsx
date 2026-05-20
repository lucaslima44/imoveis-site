import Link from "next/link";
import { Building2, Home, PlusCircle, Star, ArrowRight } from "lucide-react";
import { readProperties } from "@/lib/properties-store";
import type { Metadata } from "next";
import ActionCard from "@/components/ActionCard";
import PageHeader from "@/components/PageHeader";

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
  const comercial = properties.filter((p) => p.type === "comercial").length;
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
      label: "Comercial",
      value: comercial,
      icon: Building2,
      color: "bg-emerald-500 text-cream-50",
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

  const TIPO_STYLE: Record<string, string> = {
    apartamento: "bg-blue-50 text-blue-600",
    casa: "bg-emerald-50 text-emerald-600",
    comercial: "bg-purple-50 text-purple-600",
  };

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
      <PageHeader
        title="Dashboard"
        description="Visão geral dos imóveis cadastrados."
      />

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
        <ActionCard
          href="/admin/imoveis/novo"
          icon={PlusCircle}
          title="Cadastrar Imóvel"
          description="Adicionar novo imóvel ao portfólio"
        />
        <ActionCard
          href="/admin/imoveis"
          icon={Building2}
          title="Gerenciar Imóveis"
          description="Editar, remover e gerenciar fotos"
        />
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
                    TIPO_STYLE[p.type ?? "apartamento"] ??
                    "bg-gray-50 text-gray-500"
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
